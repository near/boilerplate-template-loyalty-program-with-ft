import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import '../assets/global.css';
import CustomerView from '../modules/CustomerView';
import MarchantView from '../modules/MarchantView';

import { getCustomerPrefix, getMerchantAddress } from '../utils/utils';

const App = ({ factory, wallet, customer }) => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [programExists, setProgramExists] = React.useState(false);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [customerUuid, setCustomerUuid] = React.useState('');
  const [customerBalance, setCustomerBalance] = React.useState();

  const [ftMetadata, setFtMetadata] = React.useState({});

  const [name, setName] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [totalSupply, setTotalSupply] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    const checkSignIn = async () => {
      const isSignedIn = await wallet.startUp();

      setIsSignedIn(isSignedIn);
    };

    checkSignIn();
  }, [wallet]);

  // Get blockchain state once on component load
  React.useEffect(() => {
    if (!isSignedIn) {
      setUiPleaseWait(false);
      return;
    }
    const merchantAddress = getMerchantAddress();
    setCustomerUuid(getCustomerPrefix());
    setUiPleaseWait(true);
    factory
      .checkProgramExists(merchantAddress)
      .then((programExists) => {
        setProgramExists(programExists);
      })
      .finally(() => setUiPleaseWait(false));
  }, [factory, isSignedIn]);

  React.useEffect(() => {
    if (programExists) {
      setUiPleaseWait(true);
      const merchantAddress = getMerchantAddress();
      factory
        .getProgram(merchantAddress)
        .then((metadata) => {
          setFtMetadata(metadata.ft);
        })
        .then(() => customer.getBalance().then((b) => setCustomerBalance(b)))
        .catch(alert)
        .finally(() => setUiPleaseWait(false));
    }
  }, [programExists, customer, factory]);

  function purchaseWithCC(e) {
    customer
      .purchaseCoffeeWithCC()
      .then(() => alert('Coffee bought with Credit Card'))
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b)))
      .catch(alert)
      .catch(alert);
  }

  async function purchaseWithTokens(e) {
    customer
      .purchaseCoffeeWithTokens()
      .then(() => alert('Coffee bought with tokens'))
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b)))
      .catch(alert)
      .catch(alert);
  }

  function createLoyaltyToken(e) {
    if (totalSupply <= 0) {
      setErrorMessage('Total supply should be > 0');
      return;
    }

    if (!isSignedIn) {
      setErrorMessage('Sign in to a Near wallet before creating a loyalty token');
      return;
    }

    if (!name || !symbol) {
      setErrorMessage('All fields must be filled');
      return;
    }

    setUiPleaseWait(true);

    factory
      .createFungibleToken(name, symbol, totalSupply)
      .then(() => {
        const merchantAddress = getMerchantAddress();
        factory.checkProgramExists(merchantAddress).then((programExists) => setProgramExists(programExists));
      })
      .then(() => {
        factory.setAccessKey();
      })
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <Router>
      <div className="main">
        {/* <Header> */}
        <Link to="/customer">Customer View</Link> - <Link to="/">Marchant View</Link>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MarchantView
                uiPleaseWait={uiPleaseWait}
                isSignedIn={isSignedIn}
                programExists={programExists}
                ftMetadata={ftMetadata}
                setSymbol={setSymbol}
                setName={setName}
                setTotalSupply={setTotalSupply}
                createLoyaltyToken={createLoyaltyToken}
                errorMessage={errorMessage}
                wallet={wallet}
              />
            }
          ></Route>
          <Route
            path="/customer/"
            element={
              <CustomerView
                uiPleaseWait={uiPleaseWait}
                customerUuid={customerUuid}
                customerBalance={customerBalance}
                purchaseWithCC={purchaseWithCC}
                purchaseWithTokens={purchaseWithTokens}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
