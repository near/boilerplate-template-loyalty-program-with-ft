import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, helloNEAR, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    helloNEAR
      .getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);


  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;
    helloNEAR
      .setGreeting(greetingInput.value)
      .then(async () => {
        return helloNEAR.getGreeting();
      })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function createLoayltyToken(e) {
    e.preventDefault();
    console.log("Loyalty Token Created!");
  }

  return (
    <>
      {isSignedIn &&
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      }
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          Merchant view
        </h1>
        <form onSubmit={createLoayltyToken} className="change">
          <input autoComplete="off" id="name" placeholder="Name" />
          <input autoComplete="off" id="symbol" placeholder="Symbol" />
          <button className="walletButton" disabled={isSignedIn} onClick={() => wallet.signIn()}>{isSignedIn ? wallet.accountId : "Sign in with Near wallet"}</button>
          <input type="number" autoComplete="off" placeholder="Total supply" id="totalSupply" />
          <button>
            <span>Create Loyalty Token</span>
            <div className="loader"></div>
          </button>
        </form>
      </main>
    </>
  );
}
