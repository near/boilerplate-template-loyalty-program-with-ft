use near_sdk::json_types::U128;
use near_sdk::serde::Serialize;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, Promise, PromiseError, PublicKey};
use near_sdk::env::STORAGE_PRICE_PER_BYTE;

use crate::{Contract, ContractExt, NO_DEPOSIT, TGAS, FT_CONTRACT, ProgramInfo, FTMetadata};

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct FungibleTokenInitArgs {
    owner_id: AccountId,
    name: String,
    symbol: String,
    total_supply: U128,
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_factory_subaccount_and_deploy(
        &mut self,
        token_name: String,
        token_symbol: String,
        token_total_supply: U128,
        public_key: Option<PublicKey>,
    ) -> Promise {
        // TODO: Add check for existence
        // TODO: Ask money for storage deposit

        // Better handle this
        let user = env::predecessor_account_id();
        let username= user.as_str().split('.').next().unwrap();

        // Assert the sub-account is valid
        let current_account = env::current_account_id().to_string();
        log!(format!("{username}.{current_account}"));
        let subaccount: AccountId = format!("{username}.{current_account}").parse().unwrap();

        // Assert enough money is attached to create the account and deploy the contract
        let attached = env::attached_deposit();

        let contract_bytes = FT_CONTRACT.len() as u128;
        let minimum_needed = STORAGE_PRICE_PER_BYTE * contract_bytes;
        assert!(
            attached >= minimum_needed,
            "Attach at least {minimum_needed} yⓃ"
        );

        let init_args = near_sdk::serde_json::to_vec(&FungibleTokenInitArgs {
            owner_id: user,
            name: token_name.clone(),
            symbol: token_symbol.clone(),
            total_supply: token_total_supply,
        }).unwrap();

        let mut promise = Promise::new(subaccount.clone())
            .create_account()
            .transfer(attached)
            .deploy_contract(FT_CONTRACT.to_vec())
            .function_call(
                "new_default_meta".to_owned(),
                init_args,
                NO_DEPOSIT,
                TGAS * 20,
            );

        // Add full access key is the user passes one
        if let Some(pk) = public_key {
            promise = promise.add_full_access_key(pk);
        }

        // Add callback
        promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(TGAS * 5)
                .create_factory_subaccount_and_deploy_callback(
                    subaccount,
                    env::predecessor_account_id(),
                    token_name,
                    token_symbol,
                    token_total_supply,
                    attached,
                ),
        )
    }

    #[private]
    pub fn create_factory_subaccount_and_deploy_callback(
        &mut self,
        account: AccountId,
        user: AccountId,
        token_name: String,
        token_symbol: String,
        token_total_supply: U128,
        attached: Balance,
        #[callback_result] create_deploy_result: Result<(), PromiseError>,
    ) -> bool {
        if create_deploy_result.is_err(){
            log!(format!(
                "Error creating {account}, returning {attached}yⓃ to {user}"
            ));
            Promise::new(user).transfer(attached);
            return false;
        }
        
        log!(format!("Correctly created and deployed to {account}"));

        let metadata = FTMetadata{account_id: account.clone(), token_name, token_total_supply: token_total_supply, token_symbol};
        self.programs.insert(&user, &ProgramInfo { ft: metadata, manager: account });

        true
    }
}
