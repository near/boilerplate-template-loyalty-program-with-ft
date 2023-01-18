/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
export class FT {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getFungibleTokenMetadata() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'ft_metadata' });
  }

  async getTotalSupply() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'ft_total_supply' });
  }
}
