import MarchantPage from './Merchant/index';
import { Backend } from '../../utils/backend';
import { Customer } from '../../utils/customer';

// NEAR
import { Factory } from '../../utils/near-ft-factory';
import { useEffect, useState } from 'react';

const FACTORY_ADDRESS = process.env.CONTRACT_NAME;
const NETWORK_ID = 'testnet';

let backend;
let factory;
let customer;

export default function Merchant() {
  const [loader, setLoader] = useState(true);

  // TODO: te dwa hooki do przerobienia
  useEffect(() => {
    backend = new Backend({ networkId: NETWORK_ID });
    factory = new Factory({ contractId: FACTORY_ADDRESS, backend });
    customer = new Customer({ networkId: NETWORK_ID, backend });
  }, []);

  useEffect(() => {
    setLoader(!backend);
  }, []);

  return loader ? 'loader' : <MarchantPage factory={factory} customer={customer} backend={backend} />;
}
