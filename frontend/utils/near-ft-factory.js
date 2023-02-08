/* Interface to talk with the contract factory */
import { customAlphabet } from 'nanoid';

import { getManagerContract, setRandomIdForMerchant } from './utils';
import { wallet } from './wallet-selector';
import { backend } from './backend';

const { utils, providers } = require('near-api-js');

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8);

const MAX_TGAS = '300000000000000';
const DEPOSIT = '4989140000000000000000000';
const FACTORY_ADDRESS = process.env.CONTRACT_NAME;

class Factory {
  constructor() {
    this.contractId = FACTORY_ADDRESS;
    this.backend = backend;
    this.provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org');
  }

  async createFungibleToken(name, symbol, totalSupply) {
    let keyPair = await this.createKeyPair();
    let randomId = nanoid();
    setRandomIdForMerchant(randomId);
    await this.backend.setKeyPairForManager(keyPair);

    return await wallet.callMethod({
      contractId: this.contractId,
      method: 'create_factory_subaccount_and_deploy',
      args: {
        token_name: name,
        token_symbol: symbol,
        token_total_supply: totalSupply,
        public_key: keyPair.getPublicKey().toString(),
        random_id: randomId
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

export const factory = new Factory();
