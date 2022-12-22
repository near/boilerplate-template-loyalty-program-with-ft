import React from 'react';

import './assets/global.css';

import { SignOutButton, Toggle } from './ui-components';
import { getCustomerPrefix } from './utils';

export default function App({ isSignedIn, factory, wallet, customer, MERCHANT_ADDRESS, MERCHANT }) {
  const [programExists, setProgramExists] = React.useState(false);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [customerView, setCustomerView] = React.useState(false);
  const [customerUuid, setCustomerUuid] = React.useState("");
  const [customerBalance, setCustomerBalance] = React.useState();

  const [ftMetadata, setFtMetadata] = React.useState({});

  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [totalSupply, setTotalSupply] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Get blockchain state once on component load
  React.useEffect(() => {
    setCustomerUuid(getCustomerPrefix(MERCHANT));
    setUiPleaseWait(true);
    factory.checkProgramExists(MERCHANT_ADDRESS)
      .then(programExists =>{
        setProgramExists(programExists);
      })
      .finally(() => setUiPleaseWait(false));
  }, []);

  React.useEffect(() => {
    if (programExists) { 
      setUiPleaseWait(true);
      factory.getProgram(MERCHANT_ADDRESS)
        .then(metadata => {
          setFtMetadata(metadata.ft);
        })
        .then(() => customer.getBalance().then((b) => setCustomerBalance(b))).catch(alert)
        .finally(() => setUiPleaseWait(false));
    }
  }, [programExists]);


  function purchaseWithCC(e) {
    customer.purchaseCoffeeWithCC()
      .then(() => alert("Coffee bought with Credit Card"))
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b))).catch(alert)
      .catch(alert);
  }

  async function purchaseWithTokens(e) {
    customer.purchaseCoffeeWithTokens()
      .then(() => alert("Coffee bought with tokens"))
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b))).catch(alert)
      .catch(alert);
  }

  function createLoyaltyToken(e) {
    if (totalSupply <= 0) {
      setErrorMessage("Total supply should be > 0");
      return;
    }
    
    if (!isSignedIn) {
      setErrorMessage("Sign in to a Near wallet before creating a loyalty token");
      return;
    }

    if (!name || !symbol) {
      setErrorMessage("All fields must be filled");
      return;
    }

    setUiPleaseWait(true);

    factory.createFungibleToken(name, symbol, totalSupply)
      .then(() => {
        factory.checkProgramExists(MERCHANT_ADDRESS)
        .then((programExists) => setProgramExists(programExists));
      })
      .then(() => {
        factory.setAccessKey();
      })
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function switchView() {
    setCustomerView(!customerView);
  }

  return (
    <div className='main'>
      {programExists &&
        <form>
          <Toggle
            text={customerView ? "Customer" : "Merchant"}
            onChange={switchView}
            checked={customerView}
          />
        </form>
      }
      {customerView ? 
        <div className={uiPleaseWait ? 'please-wait' : 'container'}>
          <h1>
            Customer view
          </h1>
          
          <div className="change">
            <div>Your ID number: {customerUuid}</div>
            <div>Your tokens balance: {customerBalance}</div>
            <span className="ftDetails"> 1 Large Coffee </span>
            <span className="ftDetails"> 3$ </span>
            <span className="ftDetails"> 30 Tokens </span>
            <hr/>
            <button className='btn btn-primary' onClick={purchaseWithCC}>
              <span>Purchase with CC</span>
              <div className="loader"></div>
            </button>
            <button className='btn btn-primary' onClick={purchaseWithTokens}>
              <span>Purchase with Tokens</span>
              <div className="loader"></div>
            </button>
          </div>
        </div>
      : (
      <div className={uiPleaseWait ? 'please-wait' : 'container'}>
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
              <div className="error">{errorMessage}</div>
            </>
          }
          {isSignedIn ?
            <SignOutButton className="btn btn-primary" accountId={wallet.accountId} onClick={() => wallet.signOut()} />
            :
            <button className="btn btn-primary" onClick={() => wallet.signIn()}>Sign in with NEAR</button>
          }
        </div>
      
      </div>
      )}

      

    </div>
  );
}

