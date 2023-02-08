use near_sdk::env::STORAGE_PRICE_PER_BYTE;
use near_sdk::json_types::U128;
use near_sdk::serde::Serialize;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, Promise, PromiseError, PublicKey, ONE_NEAR};

use crate::{
    Contract, ContractExt, FTMetadata, ProgramInfo, FT_CONTRACT, MANAGER_CONTRACT, NO_DEPOSIT, TGAS,
};

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct FungibleTokenInitArgs {
    owner_id: AccountId,
    name: String,
    symbol: String,
    total_supply: U128,
}

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct ManagerContractInitArgs {
    ft_contract: AccountId,
}

const EXTRA_BYTES: u128 = 10000;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_factory_subaccount_and_deploy(
        &mut self,
        token_name: String,
        token_symbol: String,
        token_total_supply: U128,
        public_key: Option<PublicKey>,
        random_id: String
    ) -> Promise {
        // TODO: Add check for existence
        // TODO: Ask money for storage deposit

        // Assert the sub-account is valid
        let current_account = env::current_account_id().to_string();
        let ft_subaccount: AccountId = format!("{random_id}-ft.{current_account}").parse().unwrap();
        let manager_subaccount: AccountId = format!("{random_id}-manager.{current_account}")
            .parse()
            .unwrap();

        // Assert enough money is attached to create the account and deploy the contract
        let attached = env::attached_deposit();

        let ft_minimum = (EXTRA_BYTES + FT_CONTRACT.len() as u128) * STORAGE_PRICE_PER_BYTE;

        let manager_minimum =
            (EXTRA_BYTES + MANAGER_CONTRACT.len() as u128 + 64 * 256) * STORAGE_PRICE_PER_BYTE + ONE_NEAR;

        let minimum_attachment = ft_minimum + manager_minimum;

        assert!(
            attached >= minimum_attachment,
            "Attach at least {minimum_attachment} yⓃ"
        );

        let ft_init_args = near_sdk::serde_json::to_vec(&FungibleTokenInitArgs {
            owner_id: manager_subaccount.clone(),
            name: token_name.clone(),
            symbol: token_symbol.clone(),
            total_supply: token_total_supply,
        })
        .unwrap();

        let mut ft_promise = Promise::new(ft_subaccount.clone())
            .create_account()
            .transfer(ft_minimum)
            .deploy_contract(FT_CONTRACT.to_vec())
            .function_call(
                "new_default_meta".to_owned(),
                ft_init_args,
                NO_DEPOSIT,
                TGAS * 20,
            );

        let manager_init_args = near_sdk::serde_json::to_vec(&ManagerContractInitArgs {
            ft_contract: ft_subaccount.clone(),
        })
        .unwrap();

        let mut manager_promise = Promise::new(manager_subaccount.clone())
            .create_account()
            .transfer(manager_minimum)
            .deploy_contract(MANAGER_CONTRACT.to_vec())
            .function_call(
                "initialize".to_owned(),
                manager_init_args,
                NO_DEPOSIT,
                TGAS * 20,
            );

        // Add full access key if the user passes one
        if let Some(pk) = public_key {
            ft_promise = ft_promise.add_full_access_key(pk.clone());
            manager_promise = manager_promise.add_full_access_key(pk);
        }

        // Add callback
        ft_promise.and(manager_promise).then(
            Self::ext(env::current_account_id())
                .with_static_gas(TGAS * 5)
                .create_factory_subaccount_and_deploy_callback(
                    ft_subaccount.clone(),
                    manager_subaccount.clone(),
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
        ft_account: AccountId,
        manager_account: AccountId,
        user: AccountId,
        token_name: String,
        token_symbol: String,
        token_total_supply: U128,
        attached: Balance,
        #[callback_result] create_deploy_result: Result<(), PromiseError>,
    ) -> bool {
        if create_deploy_result.is_err() {
            log!(format!(
                "Error creating {ft_account}, returning {attached}yⓃ to {user}"
            ));
            Promise::new(user).transfer(attached);
            return false;
        }

        log!(format!(
            "Correctly created and deployed to {ft_account} and {manager_account}"
        ));

        let metadata = FTMetadata {
            account_id: ft_account.clone(),
            token_name,
            token_total_supply: token_total_supply,
            token_symbol,
        };
        self.programs.insert(
            &user,
            &ProgramInfo {
                ft: metadata,
                manager: manager_account,
            },
        );

        true
    }
}
