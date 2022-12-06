/* Interface to talk with the contract factory */
const MAX_TGAS = '300000000000000';
const DEPOSIT = '2220000000000000000000000';
const FT_CONTRACT_NAME = "ft";

export class Factory {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createFungibleToken(name, symbol, totalSupply) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_factory_subaccount_and_deploy',
      args: {
        token_name: name,
        token_symbol: symbol,
        token_total_supply: totalSupply,
      },
      deposit: DEPOSIT,
      gas: MAX_TGAS,
    })
  }

  async checkProgramExists(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_has_program', args: { account_id } })
  }

  async getProgram(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_program', args: { account_id } })
  }
}
