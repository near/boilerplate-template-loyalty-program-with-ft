// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Backend } from './backend';
import { Customer } from './customer';

// NEAR
import { Factory } from './near-ft-factory';
import { Wallet } from './near-wallet';

const FACTORY_ADDRESS = process.env.CONTRACT_NAME;
const NETWORK_ID = "testnet";
// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ });

// Abstract the logic of interacting with the contract to simplify your flow
const backend = new Backend({ networkId: NETWORK_ID });
const factory = new Factory({ contractId: FACTORY_ADDRESS, walletToUse: wallet, backend });
const customer = new Customer({ networkId: NETWORK_ID, backend });


// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <App isSignedIn={isSignedIn} factory={factory} wallet={wallet} customer={customer}/>
  );
};
