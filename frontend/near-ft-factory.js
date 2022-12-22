/* Interface to talk with the contract factory */
const { utils } = require("near-api-js");

const MAX_TGAS = '300000000000000';
const DEPOSIT = '4989140000000000000000000';
const NO_DEPOSIT = '0';

export class Factory {
  constructor({ contractId, walletToUse, backend, managerContractId }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
    this.backend = backend;
    this.managerContractId = managerContractId;
  }

  async createFungibleToken(name, symbol, totalSupply) {
    let keyPair = await this.createKeyPair();
    await this.backend.setKeyPairForManager(keyPair).catch(alert);

    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_factory_subaccount_and_deploy',
      args: {
        token_name: name,
        token_symbol: symbol,
        token_total_supply: totalSupply,
        public_key: keyPair.getPublicKey().toString(),
      },
      deposit: DEPOSIT,
      gas: MAX_TGAS,
    });
  }

  async setAccessKey() {
    let keyPair = await this.createKeyPair();
    await this.wallet.callMethod({
      contractId: this.managerContractId,
      method: 'set_access_key',
      args: {
        public_key: keyPair.getPublicKey().toString(),
        allowance: "20000000000000000000000000",
      },
      deposit: NO_DEPOSIT,
      gas: MAX_TGAS,
    }).then(
      
    )
  }

  async createKeyPair() {
    return utils.key_pair.KeyPairEd25519.fromRandom();
  }

  async checkProgramExists(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_has_program', args: { account_id } })
  }

  async getProgram(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_program', args: { account_id } })
  }
}
