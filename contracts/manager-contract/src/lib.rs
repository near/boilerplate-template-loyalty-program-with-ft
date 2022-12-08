/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::serde::Serialize;
use near_sdk::serde_json::json;
use near_sdk::{env, log, Gas, near_bindgen, AccountId, Balance, Promise, PromiseError, PublicKey};
use near_sdk::json_types::U128;


const MIN_STORAGE: Balance = 1_100_000_000_000_000_000_000_000; //1.1Ⓝ
const TOKENS_FOR_COFFEE: U128 = U128(10);
const TGAS: Gas = Gas(10u64.pow(12));
const NO_DEPOSIT: Balance = 0;
const MIN_GAS_FOR_STORAGE_DEPOSIT:Gas = Gas(100);


#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct FungibleTokenTransferArgs {
    receiver_id: AccountId,
    amount: U128,
    memo: Option<String>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub subaccounts: UnorderedSet<String>, //storing prefixes is enough
    pub ft_contract: AccountId,
}

#[near_bindgen]
impl Contract {

    #[init]
    pub fn initialize(
        ft_contract: AccountId,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        return Self {
            subaccounts: UnorderedSet::new(b"s"),
            ft_contract: ft_contract,
        };
    }

    fn create_account(&self, prefix: String, public_key: PublicKey) -> Promise{
        let account_id = prefix + "." + env::current_account_id().as_str();
        Promise::new(account_id.parse().unwrap())
        .create_account()
        .transfer(MIN_STORAGE)
        .add_full_access_key(public_key)
    }
    
    #[private]
    pub fn pay_for_coffee_with_card(&mut self, prefix: String, public_key: PublicKey) -> Promise {
        
        let transfer = self.transfer_tokens(self.get_account_id_for_prefix(&prefix));

        let contains = !self.subaccounts.contains(&prefix);
        // check if account exists
        if !contains {
            let create = self.create_account(prefix.clone(), public_key);
            self.subaccounts.insert(&prefix);
            // let register = regoister the account in ft contract
            // chain promises
            let deposit_args = json!({ "account_id": self.get_account_id_for_prefix(&prefix) })
                .to_string()
                .into_bytes()
                .to_vec();
            let register = Promise::new(self.ft_contract.clone())
            .function_call(
                "storage_deposit".to_string(),
                deposit_args,
                1,
                MIN_GAS_FOR_STORAGE_DEPOSIT,
            );

            let create_and_register = create.and(register); //ADD register
            return create_and_register.then(transfer);
        } else {
            transfer
        }
    }

    fn transfer_tokens(&self, to: AccountId) -> Promise {
        let ft_transfer_args = near_sdk::serde_json::to_vec(&FungibleTokenTransferArgs {
            receiver_id: to.clone(),
            amount: TOKENS_FOR_COFFEE,
            memo: None
        }).unwrap();

        let promise = Promise::new(self.ft_contract.clone())
            .function_call(
                "ft_transfer".to_owned(),
                ft_transfer_args,
                NO_DEPOSIT,
                TGAS * 20,
            );

        // Add callback
        promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(TGAS * 5)
                .transfer_tokens_callback(
                    to,
                ),
        )
    }

    #[private]
    pub fn transfer_tokens_callback(
        &mut self,
        customer: AccountId,
        #[callback_result] transfer_tokens_result: Result<(), PromiseError>,
    ) -> bool {
        if transfer_tokens_result.is_err(){
            log!(format!(
                "Error transferring tokens to {customer}"
            ));
            return false;
        }
        
        log!(format!("Correctly transferred tokens to {customer}"));

        true
    }

    fn get_account_id_for_prefix(&self, prefix: &str) -> AccountId {
        let res: String = prefix.to_owned() + "." + env::predecessor_account_id().as_str();
        return res.parse().unwrap();
    }

}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use std::str::FromStr;

    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env};

    use super::*;

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = Contract::initialize(AccountId::from_str("ft.contract").unwrap());
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.subaccounts.is_empty(), true);
        assert_eq!(contract.ft_contract, AccountId::from_str("ft.contract").unwrap());
    }

    #[test]
    fn test_get_account_id_for_prefix() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = Contract::initialize(AccountId::from_str("ft.contract").unwrap());
        testing_env!(context
                    .storage_usage(env::storage_usage())
                    .predecessor_account_id(accounts(1))
                    .build());

        assert_eq!(contract.get_account_id_for_prefix("customer").to_string(), "customer.".to_owned() + &accounts(1).to_string());
    }
}