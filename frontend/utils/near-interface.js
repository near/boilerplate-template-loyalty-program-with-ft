/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
const MAX_TGAS = '300000000000000';
const FT_DEPOSIT = '197907910000000000000000000';
const FT_CONTRACT_NAME = 'ft';

export class LoyaltyProgramWithFtContractInterface {
  constructor({ contractId, walletToUse }) {
    this.baseContractId = contractId;
    this.ftContractId = FT_CONTRACT_NAME + '.' + this.baseContractId;
    this.wallet = walletToUse;
  }

  async createFungibleTokenPool(name, symbol, totalSupply) {
    return await this.wallet.callMethod({
      contractId: this.baseContractId,
      method: 'create_factory_subaccount_and_deploy',
      args: {
        name: FT_CONTRACT_NAME,
        ft_owner_id: this.wallet.accountId,
        token_name: name,
        token_symbol: symbol,
        token_total_supply: totalSupply,
      },
      deposit: FT_DEPOSIT,
      gas: MAX_TGAS,
    });
  }

  async getFungibleTokenMetadata() {
    return await this.wallet.viewMethod({ contractId: this.ftContractId, method: 'ft_metadata' });
  }

  async getTotalSupply() {
    return await this.wallet.viewMethod({ contractId: this.ftContractId, method: 'ft_total_supply' });
  }
}
