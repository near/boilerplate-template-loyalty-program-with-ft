import { useEffect, useState } from 'react';

import Header from './Header';
import { getMerchantAddress } from '../../../utils/utils';
import Welcome from './Welcome/Welcome';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import PageBackground from '../../../components/PageBackground';

import { backend } from '../../../utils/backend';
import { factory } from '../../../utils/near-ft-factory';

const MarchantPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [programExists, setProgramExists] = useState(false);
  const [ftMetadata, setFtMetadata] = useState({});
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    factory.getAllPrograms().then((res) => {
      setProgramsList(res);
    });
  }, [factory]);

  useEffect(() => {
    const checkSignIn = async () => {
      console.log('a1x');
      await backend.startUp();
      const isProgramActive = !!backend.checkIsProgramActive();
      setIsSignedIn(isProgramActive);
    };

    checkSignIn();
  }, []);

  // Get blockchain state once on component load
  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    const merchantAddress = getMerchantAddress();
    factory.checkProgramExists(merchantAddress).then((programExists) => {
      setProgramExists(programExists);
    });
  }, [factory, isSignedIn]);

  useEffect(() => {
    if (programExists) {
      const merchantAddress = getMerchantAddress();
      factory
        .getProgram(merchantAddress)
        .then((metadata) => {
          setFtMetadata(metadata.ft);
        })
        .catch(alert);
    }
  }, [programExists, customer, factory]);

  function createLoyaltyToken({ name, symbol, totalSupply }) {
    factory
      .createFungibleToken(name, symbol, totalSupply)
      .then(() => {
        const merchantAddress = getMerchantAddress();
        factory.checkProgramExists(merchantAddress).then((programExists) => setProgramExists(programExists));
      })
      .then(() => {
        factory.setAccessKey();
      })
      .catch(alert);
  }

  return (
    <PageBackground variant="merchant" header={<Header isSignedIn={isSignedIn} programExists={programExists} />}>
      <Welcome isSignedIn={isSignedIn} programExists={programExists} ftMetadata={ftMetadata} />

      {isSignedIn && (
        <SignedIn programExists={programExists} ftMetadata={ftMetadata} createLoyaltyToken={createLoyaltyToken} />
      )}
      {isSignedIn || <SignedOut programsList={programsList} />}
    </PageBackground>
  );
};

export default MarchantPage;
