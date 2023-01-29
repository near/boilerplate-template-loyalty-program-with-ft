/* Interface to talk with the contract factory */
import { getManagerContract } from './utils';
import { wallet } from './wallet-selector';

const { utils, providers } = require('near-api-js');

const MAX_TGAS = '300000000000000';
const DEPOSIT = '4989140000000000000000000';
const NO_DEPOSIT = '0';

export class Factory {
  constructor({ contractId, backend }) {
    this.contractId = contractId;
    this.backend = backend;
    this.provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org');
  }

  async createFungibleToken(name, symbol, totalSupply) {
    // tutaj jest problem, bo `setKeyPairForManager` jest wywolywane tylko przy tworzeniu tokena
    //  - wiec jak sie zaloguje na konto, ktore juz ma token (wiec sie go nie tworzy) to nie da sie kupic kawy bo `createAndTransfer` wyrzuca blad, bo nie ma keyPair
    //  - to `this.backend.setKeyPairForManager` musi byc wywolywane przy kazdym zalogowaniu
    let keyPair = await this.createKeyPair();
    await this.backend.setKeyPairForManager(keyPair);

    return await wallet.callMethod({
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

  async createKeyPair() {
    return utils.key_pair.KeyPairEd25519.fromRandom();
  }

  async checkProgramExists(account_id) {
    return await wallet.viewMethod({
      contractId: this.contractId,
      method: 'user_has_program',
      args: { account_id },
    });
  }

  async getProgram(account_id) {
    return await wallet.viewMethod({ contractId: this.contractId, method: 'user_program', args: { account_id } });
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
