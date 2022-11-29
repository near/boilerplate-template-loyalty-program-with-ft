use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, Balance, Gas};

mod deploy;

const NEAR_PER_STORAGE: Balance = 10_000_000_000_000_000_000; //1e19yⓃ
const FT_CONTRACT: &[u8] = include_bytes!("../../fungible-token/res/fungible_token.wasm");
const TGAS: Gas = Gas(10u64.pow(12));
const NO_DEPOSIT: Balance = 0;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub are_contracts_initialized: bool,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            are_contracts_initialized: false,
        }
    }
}
