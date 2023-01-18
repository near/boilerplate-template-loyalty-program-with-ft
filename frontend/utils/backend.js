import { getManagerContract } from './utils';

const { keyStores, connect, Contract } = require('near-api-js');

const MAX_TGAS = '300000000000000';
const TOTAL_DEPOSIT = '100000000000000000000000';

export class Backend {
  constructor({ networkId }) {
    this.keyStore = new keyStores.BrowserLocalStorageKeyStore();
    this.networkId = networkId;
  }

  async createAndTransfer(publicKey, prefix) {
    if (!(await this.getKeyPair())) {
      throw new Error('You need to pass a function call access key to the backend first.');
    }

    const keyPair = await this.getKeyPair();
    const inMemoryKeyStore = new keyStores.InMemoryKeyStore();
    inMemoryKeyStore.setKey(this.networkId, this.getAccountName(), keyPair);

    const connectionConfig = {
      networkId: this.networkId,
      keyStore: inMemoryKeyStore,
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };

    this.nearConnection = await connect(connectionConfig);

    const account = await this.nearConnection.account(this.getAccountName());

    const managerContract = new Contract(account, getManagerContract(), {
      viewMethods: [],
      changeMethods: ['create_and_transfer'],
    });

    return await managerContract.create_and_transfer(
      {
        prefix: prefix,
        public_key: publicKey,
      },
      MAX_TGAS,
      TOTAL_DEPOSIT,
    );
  }

  async setKeyPairForManager(keyPair) {
    await this.keyStore.setKey(this.networkId, this.getAccountName(), keyPair);
  }

  async getKeyPair() {
    return await this.keyStore.getKey(this.networkId, this.getAccountName());
  }

  getAccountName() {
    return getManagerContract();
  }
}
