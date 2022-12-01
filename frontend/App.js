import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignOutButton } from './ui-components';
import { FT } from './near-ft-token';

export default function App({ isSignedIn, factory, wallet, MERCHANT_ADDRESS }) {
  const [programExists, setProgramExists] = React.useState(false);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const [ftContract, setFT] = React.useState("");
  const [name, setName] = React.useState("Reward Token");
  const [symbol, setSymbol] = React.useState("RT");
  const [totalSupply, setTotalSupply] = React.useState("1000");
  const [errorMessage, setErrorMessage] = React.useState("-");

  // Get blockchain state once on component load
  React.useEffect(() => {
    async function start() {
      const programExists = await factory.checkProgramExists(MERCHANT_ADDRESS)
      setProgramExists(programExists)

      if (programExists) {
        const { ft } = await factory.getProgram(MERCHANT_ADDRESS)
        const ftInterface = new FT({ contractId: ft, walletToUse: wallet })

        const metadata = await ftInterface.getFungibleTokenMetadata()

        setName(metadata.name);
        setSymbol(metadata.symbol);

        const totalSupply = await ftInterface.getTotalSupply()
        setTotalSupply(totalSupply)
      }
      setUiPleaseWait(false);
    }
    start()
  }, []);

  function createLoyaltyToken(e) {
    e.preventDefault();

    if (totalSupply <= 0) {
      setErrorMessage("Total supply should be > 0");
      return;
    }
    if (!isSignedIn) {
      setErrorMessage("Sign in to a Near wallet before creating a loyalty token");
      return;
    }

    setUiPleaseWait(true);

    factory
      .createFungibleToken(symbol, totalSupply)
      .then(() => {
        setProgramExists(true);
      })
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      })
  }

  function login(e) {
    e.preventDefault();
    wallet.signIn()
  }
  const disabled = (!isSignedIn || programExists)

  return (
    <>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          Merchant view
        </h1>
        <form className="change">
          {!programExists &&
            <>
            <p> There is no reward program, create one! </p>
            </>
          }
          {(programExists || isSignedIn) &&
            <>
              <label htmlFor="name" > Loyalty Token </label>
              <input required id="name" defaultValue={name} disabled={disabled} onChange={() => { }} />
              <input required id="symbol" defaultValue={symbol} disabled={disabled} onChange={() => { }} />
              <input required id="totalSupply" defaultValue={totalSupply} disabled={disabled} onChange={() => { }} />
              <hr />
            </>
          }
          {!disabled &&
            <>
              <button onClick={createLoyaltyToken}>
                <span>Create Loyalty Token</span>
                <div className="loader"></div>
              </button>
            </>
          }
          {isSignedIn ?
            <SignOutButton className="walletButton" visible={isSignedIn} accountId={wallet.accountId} onClick={() => wallet.signOut()} />
            :
            <button className="walletButton" onClick={login}>{isSignedIn ? wallet.accountId : "Sign in with Near wallet"}</button>
          }
        </form>
      </main>

      <div className="error">{errorMessage}</div>
    </>
  );
}

