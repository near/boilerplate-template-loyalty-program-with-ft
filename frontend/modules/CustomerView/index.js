import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerPrefix } from '../../utils/utils';
import Header from './Header';
import ProgramIsActive from './ProgramIsActive';
import ProgramNotActive from './ProgramNotActive';
import Welcome from './Welcome';

const CustomerView = ({ factory, wallet, customer }) => {
  const { merchantAddress } = useParams();

  const [programExists, setProgramExists] = useState(false);
  const [ftMetadata, setFtMetadata] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [customerBalance, setCustomerBalance] = useState();
  const [customerUuid, setCustomerUuid] = useState('');

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

  useEffect(() => {
    const checkSignIn = async () => {
      const isSignedIn = await wallet.startUp();

      setIsSignedIn(isSignedIn);
    };

    checkSignIn();
  }, [wallet]);

  useEffect(() => {
    if (!isSignedIn || !merchantAddress) {
      return;
    }

    setCustomerUuid(getCustomerPrefix());
    factory.checkProgramExists(merchantAddress).then((programExists) => {
      setProgramExists(programExists);
    });
    // .finally(() => setUiPleaseWait(false));
  }, [factory, isSignedIn, merchantAddress]);

  useEffect(() => {
    if (!programExists) {
      return;
    }

    //   // setUiPleaseWait(true);
    factory
      .getProgram(merchantAddress)
      .then((metadata) => {
        setFtMetadata(metadata.ft);
      })
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b)))
      .catch(alert);
  }, [customer, factory, merchantAddress, programExists]);

  const product = {
    name: 'Large Coffe',
    fiatCost: '1$',
    tokenCost: 30,
    tokensPerUnit: 10,
  };

  const canCollect = customerBalance >= product.tokenCost;

  const programIsActive = !!ftMetadata.account_id;

  return (
    <>
      <Header />
      <Welcome ftMetadata={ftMetadata} product={product} programIsActive={programIsActive} />
      {programIsActive && (
        <ProgramIsActive
          ftMetadata={ftMetadata}
          product={product}
          customerUuid={customerUuid}
          customerBalance={customerBalance}
          purchaseWithCC={purchaseWithCC}
          canCollect={canCollect}
          purchaseWithTokens={purchaseWithTokens}
        />
      )}
      {programIsActive || <ProgramNotActive merchantAddress={merchantAddress} />}
    </>
  );
};

export default CustomerView;
