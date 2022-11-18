/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class LoyaltyProgramWithFtContractInterface {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createFungibleTokenPool(name, symbol, totalSupply) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'new_fungible_token_pool',
      args: { owner_id: this.wallet.accountId,  name, symbol, total_supply: totalSupply },
    })
  }

  async isContractInitialized() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'is_initialized' })
  }

  async getFungibleTokenMetadata() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'ft_metadata' })
  }

  async getTotalSupply() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'ft_total_supply' })
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
