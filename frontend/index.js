// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages';
import { Backend } from './utils/backend';
import { Customer } from './utils/customer';

// NEAR
import { Factory } from './utils/near-ft-factory';
import { Wallet } from './utils/near-wallet';

const FACTORY_ADDRESS = process.env.CONTRACT_NAME;
const NETWORK_ID = 'testnet';
// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({});

// Abstract the logic of interacting with the contract to simplify your flow
const backend = new Backend({ networkId: NETWORK_ID });
const factory = new Factory({ contractId: FACTORY_ADDRESS, walletToUse: wallet, backend });
const customer = new Customer({ networkId: NETWORK_ID, backend });

const root = createRoot(document.getElementById('root'));
root.render(<App factory={factory} wallet={wallet} customer={customer} />);
