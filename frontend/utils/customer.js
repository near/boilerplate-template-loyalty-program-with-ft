import { getCustomerPrefix, getManagerContract, getFtContract } from './utils';
import { backend } from './backend';
const { utils, keyStores, connect, Contract } = require('near-api-js');
const FT_TGAS = '3000000000000';
const TOKENS_FOR_COFFEE = '30';
const FT_TRANSFER_MIN_DEPOSIT = '1';
const NETWORK_ID = 'testnet';

class Customer {
  constructor() {
    this.networkId = NETWORK_ID;
    if (typeof window !== 'undefined') {
      this.keyStore = new keyStores.BrowserLocalStorageKeyStore();
    }
    this.backend = backend;
  }

  async purchaseCoffeeWithCC() {
    const prefix = getCustomerPrefix();

    if (!(await this.getKeyPair())) {
      await this.createKeyPair();
    }

    const keyPair = await this.getKeyPair();

    return this.backend.createAndTransfer(keyPair.getPublicKey().toString(), prefix);
  }

  async purchaseCoffeeWithTokens() {
    if (!(await this.getKeyPair())) {
      throw Error('You need to buy coffee with CC first');
    }

    const ftContract = await this.getFtContract();

    return await ftContract.ft_transfer(
      {
        receiver_id: this.getManagerContractId(),
        amount: TOKENS_FOR_COFFEE,
      },
      FT_TGAS,
      FT_TRANSFER_MIN_DEPOSIT,
    );
  }

  async getBalance() {
    if (!(await this.getKeyPair())) {
      return 0;
    }
    const ftContract = await this.getFtContract();

    return await ftContract.ft_balance_of({
      account_id: this.getAccountName(),
    });
  }

  async getFtContract() {
    const keyPair = await this.getKeyPair();
    const inMemoryKeyStore = new keyStores.InMemoryKeyStore();
    inMemoryKeyStore.setKey(this.networkId, this.getAccountName(), keyPair);

    const connectionConfig = {
      networkId: 'testnet',
      keyStore: inMemoryKeyStore,
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };
    this.nearConnection = await connect(connectionConfig);

    const account = await this.nearConnection.account(this.getAccountName());
    return new Contract(
      account, // the account object that is connecting
      this.getFtContractId(),
      {
        viewMethods: ['ft_balance_of'], // view methods do not change state but usually return a value
        changeMethods: ['ft_transfer'], // change methods modify state
      },
    );
  }

  async createKeyPair() {
    const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();
    await this.keyStore.setKey(this.networkId, this.getAccountName(), keyPair);
  }

  async getKeyPair() {
    return await this.keyStore.getKey(this.networkId, this.getAccountName());
  }

  getAccountName() {
    const prefix = getCustomerPrefix();
    return `${prefix}.${this.getManagerContractId()}`;
  }

  getManagerContractId() {
    return getManagerContract();
  }

  getFtContractId() {
    return getFtContract();
  }
}

export const customer = new Customer();
