// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// NEAR
import { LoyaltyProgramWithFtContractInterface } from './near-interface';
import { Wallet } from './near-wallet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const contract = new LoyaltyProgramWithFtContractInterface({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  const root = createRoot(document.getElementById('root'));
  root.render(
    <App isSignedIn={isSignedIn} contract={contract} wallet={wallet} />,
    document.getElementById('root'),
  );
};
