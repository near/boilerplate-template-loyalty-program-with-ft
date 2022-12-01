import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignOutButton } from './ui-components';
import { FT } from './near-ft-token';

export default function App({ isSignedIn, factory, wallet, MERCHANT_ADDRESS }) {
  const [programExists, setProgramExists] = React.useState(false);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const [ftMetadata, setFTMeta] = React.useState({});
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [totalSupply, setTotalSupply] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Get blockchain state once on component load
  React.useEffect(() => {
    async function start() {
      const programExists = await factory.checkProgramExists(MERCHANT_ADDRESS)
      setProgramExists(programExists)

      if (programExists) {
        const { ft } = await factory.getProgram(MERCHANT_ADDRESS)
        setFTMeta(ft);
      }

      setUiPleaseWait(false);
    }
    start()
  }, []);

  function createLoyaltyToken(e) {
    if (Number(totalSupply) <= 0) {
      return setErrorMessage("Total supply should be > 0");
    }

    setUiPleaseWait(true);

    factory.createFungibleToken(name, symbol, totalSupply)
  }

  return (
    <>
      <div className={uiPleaseWait ? 'please-wait' : '', 'container'}>
        <h1>
          Merchant view
        </h1>
        <div className="change">
          { isSignedIn && programExists &&
            <>
              <p> Here is your program data</p>

              <div className="ftDetailsWrapper">
                Account: <div className='ftDetails'>{ftMetadata.account_id}</div>
                Name: <div className='ftDetails'>{ftMetadata.token_name}</div>
                Symbol: <div className='ftDetails'>{ftMetadata.token_symbol}</div>
                Total Supply: <div className='ftDetails'>{ftMetadata.token_total_supply}</div>
              </div>
              <hr />
            </>
          }
          { isSignedIn && !programExists &&
            <>
              <p> There is no reward program, create one! </p>

              <label htmlFor="name" > Loyalty Token </label>
              <input required id="name" placeholder="Name (e.g. Loyalty Token)" onChange={(e) => setName(e.target.value)}/>
              <input required id="symbol"  placeholder="Symbol (e.g. LT)" onChange={(e) => setSymbol(e.target.value)} />
              <input required id="totalSupply" placeholder="Total Supply (e.g. 1000)" onChange={(e) => setTotalSupply(e.target.value)}/>
              <button className='btn btn-primary' onClick={createLoyaltyToken}>
                <span>Create Loyalty Token</span>
                <div className="loader"></div>
              </button>
              <hr />
            </>
          }
          {isSignedIn ?
            <SignOutButton className="btn btn-primary" accountId={wallet.accountId} onClick={() => wallet.signOut()} />
            :
            <button className="btn btn-primary" onClick={()=>{wallet.signIn()}}>Sign in with NEAR</button>
          }
        </div>
      </div>

      <div className="error">{errorMessage}</div>
    </>
  );
}

