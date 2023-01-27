import { useEffect, useState } from 'react';
import { getCustomerPrefix } from '../../../utils/utils';
import Header from './Header';
import ProgramIsActive from './ProgramIsActive';
import ProgramNotActive from './ProgramNotActive';
import Welcome from './Welcome';
import { useRouter } from 'next/router';

import { Backend } from '../../../utils/backend';
import { Customer } from '../../../utils/customer';

// NEAR
import { Factory } from '../../../utils/near-ft-factory';
import PageBackground from '../../../components/PageBackground';

const FACTORY_ADDRESS = process.env.CONTRACT_NAME;
const NETWORK_ID = 'testnet';

let backend;
let factory;
let customer;

const CustomerView = () => {
  const router = useRouter();
  const merchantAddress = router.query.program;

  const [programExists, setProgramExists] = useState(false);
  const [ftMetadata, setFtMetadata] = useState({});
  const [isProgramActive, setIsProgramActive] = useState(false);
  const [customerBalance, setCustomerBalance] = useState();
  const [customerUuid, setCustomerUuid] = useState('');
  const [programsList, setProgramsList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    backend = new Backend({ networkId: NETWORK_ID });
    factory = new Factory({ contractId: FACTORY_ADDRESS, backend });
    customer = new Customer({ networkId: NETWORK_ID, backend });
  }, []);

  useEffect(() => {
    const checkSignIn = async () => {
      await backend.startUp();
      const isProgramActive = !!backend.checkIsProgramActive();

      setLoader(false);
      setIsProgramActive(isProgramActive);
    };

    checkSignIn();
  }, []);

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
    if (!isProgramActive || !merchantAddress) {
      return;
    }

    setCustomerUuid(getCustomerPrefix());
    factory.checkProgramExists(merchantAddress).then((programExists) => {
      setProgramExists(programExists);
    });
  }, [isProgramActive, merchantAddress]);

  useEffect(() => {
    factory.getAllPrograms().then((res) => {
      setProgramsList(res);
    });
  }, [isProgramActive]);

  useEffect(() => {
    if (!programExists) {
      return;
    }

    factory
      .getProgram(merchantAddress)
      .then((metadata) => {
        setFtMetadata(metadata.ft);
      })
      .then(() => customer.getBalance().then((b) => setCustomerBalance(b)))
      .catch(alert);
  }, [merchantAddress, programExists]);

  const product = {
    name: 'Large Coffe',
    fiatCost: '$9.99',
    tokenCost: 30,
    tokensPerUnit: 10,
  };

  const canCollect = customerBalance >= product.tokenCost;
  const programIsActive = !!ftMetadata.account_id;

  return (
    !loader && (
      <PageBackground variant="customer" header={<Header />}>
        <Welcome ftMetadata={ftMetadata} programIsActive={programIsActive} merchantAddress={merchantAddress} />
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
        {programIsActive || <ProgramNotActive programsList={programsList} />}
      </PageBackground>
    )
  );
};

export default CustomerView;
