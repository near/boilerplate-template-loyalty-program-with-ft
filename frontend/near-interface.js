/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class LoyaltyProgramWithFtContractInterface {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createFungibleTokenPool(name, symbol, totalSupply) {
    console.log("CONTRACTID: " + this.contractId);
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'new_fungible_token_pool',
      args: { owner_id: this.wallet.accountId,  name, symbol, total_supply: totalSupply },
    })
  }

  // async getGreeting() {
  //   return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_greeting' });
  // }

  // async setGreeting(greeting) {
  //   return await this.wallet.callMethod({
  //     contractId: this.contractId,
  //     method: 'set_greeting',
  //     args: { message: greeting },
  //   });
  // }

}
