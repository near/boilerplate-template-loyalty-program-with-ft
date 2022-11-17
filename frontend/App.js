import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignOutButton } from './ui-components';

export default function App({ isSignedIn, contract, wallet }) {
  // const [valueFromBlockchain, setValueFromBlockchain] = React.useState();
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [totalSupply, setTotalSupply] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Get blockchian state once on component load
  React.useEffect(() => {
    contract
      .isContractInitialized()
      .then(setIsInitialized)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  function createLoayltyToken(e) {
    e.preventDefault();

    if (totalSupply <= 0) {
      setErrorMessage("Total supply should be > 0");
      return;
    }
    if (!isSignedIn) {
      setErrorMessage("Sign in to a Near wallet before creating a loyalty token");
      return;
    }

    console.log("Loyalty Token Created!");
    console.log("Name: " + name);
    console.log("Symbol: " + symbol);
    console.log("Total supply: " + totalSupply);

    setUiPleaseWait(true);

    contract
    .createFungibleTokenPool(name, symbol, totalSupply)
    .then(() => {
      setIsInitialized(true);
    })
    .catch(alert)
    .finally(() => {
      setUiPleaseWait(false);
    })
  }

  return (
    
    <>
    {isInitialized ?
      <>
        <main className={uiPleaseWait ? 'please-wait' : 'ftDetailsWrapper'}>
          <h1>
            Merchant view
          </h1>
          <div className='row'>
            <div>Loyalty coin name</div>
            <div>Logged-in wallet</div>
          </div>
          <div className="ftDetailsWrapper">
            <div className='ftDetails'>Name</div>
            <div className='ftDetails'>Symbol</div>
            <div className='ftDetails'>Total supply</div>
          </div>
        </main>
      </>
      :
      <>
        {isSignedIn &&
          <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
        }
        <main className={uiPleaseWait ? 'please-wait' : ''}>
          <h1>
            Merchant view
          </h1>
          <form onSubmit={createLoayltyToken} className="change">
            <input required autoComplete="off" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input required autoComplete="off" id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol" />
            <button className="walletButton" disabled={isSignedIn} onClick={() => wallet.signIn()}>{isSignedIn ? wallet.accountId : "Sign in with Near wallet"}</button>
            <input required type="number" autoComplete="off" id="totalSupply" value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} placeholder="Total supply"/>
            <button>
              <span>Create Loyalty Token</span>
              <div className="loader"></div>
            </button>
          </form>
          <div className="error">{errorMessage}</div>
        </main>
      </>
    }
    </>
  );
}
