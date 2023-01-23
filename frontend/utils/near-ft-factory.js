/* Interface to talk with the contract factory */
import { getManagerContract } from './utils';

const { utils, providers } = require('near-api-js');

const MAX_TGAS = '300000000000000';
const DEPOSIT = '4989140000000000000000000';
const NO_DEPOSIT = '0';

export class Factory {
  constructor({ contractId, walletToUse, backend }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
    this.backend = backend;
    this.provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org');
  }

  async createFungibleToken(name, symbol, totalSupply) {
    let keyPair = await this.createKeyPair();
    await this.backend.setKeyPairForManager(keyPair);

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
    await this.wallet
      .callMethod({
        contractId: this.getManagerContractId(),
        method: 'set_access_key',
        args: {
          public_key: keyPair.getPublicKey().toString(),
          allowance: '20000000000000000000000000',
        },
        deposit: NO_DEPOSIT,
        gas: MAX_TGAS,
      })
      .then();
  }

  async createKeyPair() {
    return utils.key_pair.KeyPairEd25519.fromRandom();
  }

  async checkProgramExists(account_id) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'user_has_program',
      args: { account_id },
    });
  }

  async getProgram(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_program', args: { account_id } });
  }

  async getAllPrograms() {
    const rawResult = await this.provider.query({
      request_type: 'call_function',
      account_id: this.contractId,
      method_name: 'get_all_programs',
      args_base64: 'e30=',
      finality: 'optimistic',
    });

    const res = JSON.parse(Buffer.from(rawResult.result));
    let programs = [];
    res.forEach((p) => {
      programs = [...programs, { accountId: p[0], contracts: p[1] }];
    });
    return programs;
  }

  getManagerContractId() {
    return getManagerContract();
  }
}
