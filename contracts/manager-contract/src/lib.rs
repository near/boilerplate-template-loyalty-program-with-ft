use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::serde::Serialize;
use near_sdk::serde_json::json;
use near_sdk::{env, log, Gas, near_bindgen, AccountId, Balance, Promise, PromiseError, PublicKey, PanicOnDefault};
use near_sdk::json_types::U128;


const MIN_STORAGE: Balance = 10_000_000_000_000_000_000_000; //0.01Ⓝ
const TOKENS_FOR_COFFEE: U128 = U128(10);
const TGAS: Gas = Gas(10u64.pow(12));


#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct FungibleTokenTransferArgs {
    receiver_id: AccountId,
    amount: U128,
    memo: Option<String>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
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
        return Self {
            subaccounts: UnorderedSet::new(b"s"),
            ft_contract: ft_contract,
        };
    }

    fn create_account(&self, customer_account: AccountId, public_key: PublicKey) -> Promise{
        Promise::new(customer_account)
        .create_account()
        .transfer(MIN_STORAGE)
        .add_full_access_key(public_key)
    }
    
    #[payable]
    #[private]
    pub fn create_and_transfer(&mut self, prefix: String, public_key: PublicKey) -> Promise {
        let customer_account = self.get_account_id_for_prefix(&prefix);
        let transfer = self.transfer_tokens(customer_account.clone());

        let contains = self.subaccounts.contains(&prefix);
        // check if account exists
        if !contains {
            let create = self.create_account(customer_account.clone(), public_key);
            self.subaccounts.insert(&prefix);

            // chain promises
            let deposit_args = json!({ "account_id": customer_account.clone() })
                .to_string()
                .into_bytes()
                .to_vec();
            let register = Promise::new(self.ft_contract.clone())
                .function_call(
                    "storage_deposit".to_string(),
                    deposit_args,
                    1000000000000000000000000,
                    TGAS * 100,
                );

            let create_register_and_transfer = create.then(register).then(transfer);
            // add callback
            return create_register_and_transfer
             .then(
                    Self::ext(env::current_account_id())
                    .with_static_gas(TGAS * 5)
                    .create_register_and_transfer_callback(
                        customer_account.clone(),
                    ),  
                );
                
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
                1,
                TGAS * 20,
            );
        promise
    }


    #[private]
    pub fn create_register_and_transfer_callback(
        &mut self,
        customer: AccountId,
        #[callback_result] register_account_result: Result<(), PromiseError>,
    ) -> bool {
        if register_account_result.is_err(){
            log!(format!(
                "Error registering account {customer} "
            ));
            return false;
        }
        
        log!(format!("Correctly registered account {customer}"));

        true
    }

    fn get_account_id_for_prefix(&self, prefix: &str) -> AccountId {
        let res: String = prefix.to_owned() + "." + env::current_account_id().as_str();
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
    #[should_panic(expected = "The contract is not initialized")]
    fn test_default() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let _contract = Contract::default();
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
        let contract = Contract::initialize(AccountId::from_str("ft.contract").unwrap());
        assert_eq!(contract.get_account_id_for_prefix("customer").to_string(), "customer.".to_owned() + &env::current_account_id().to_string());
    }
}