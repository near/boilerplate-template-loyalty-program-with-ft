/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_contract_standards::fungible_token::metadata::{
    FungibleTokenMetadata, FungibleTokenMetadataProvider, FT_METADATA_SPEC,
};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::U128;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, PanicOnDefault, PromiseOrValue};

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    // tokens assigned to anonymous account, not claimed by a user yet
    pub anonymous_tokens: LookupMap<PublicKey, U128>,
}

#[near_bindgen]
impl Contract {
    // #[init]
    // pub fn new_fungible_token_pool(owner_id: AccountId, name: String, symbol: String, total_supply: U128) -> Self {
    //     Self::new(
    //         owner_id,
    //         total_supply,
    //         FungibleTokenMetadata {
    //             spec: FT_METADATA_SPEC.to_string(),
    //             name: name,
    //             symbol: symbol,
    //             icon: None,
    //             reference: None,
    //             reference_hash: None,
    //             decimals: 24,
    //         },
    //     )
    // }

    
    pub fn pay_for_coffee_with_card() {
        // simulate paying with card
        // assign tokens to map
        // * see if map already contains tokens
        // * if yes than add to record
        // * if no add a new record
    }

    pub fn pay_for_coffee_with_tokens() {

    }

    pub fn claim_tokens() {

    }
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            anonymous_tokens: LookupMap::new(),
        }
    }
}