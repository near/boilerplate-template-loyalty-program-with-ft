import { useEffect, useState } from 'react';

import Header from './Header';
import { getMerchantAddress } from '../../utils/utils';
import Welcome from './Welcome/Welcome';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import PageBackground from '../PageBackground';
import Loader from '../Loader';
import { backend } from '../../utils/backend';
import { factory } from '../../utils/near-ft-factory';

const MarchantPage = () => {
  const [mainLoader, setMainLoader] = useState(true);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [programExists, setProgramExists] = useState(false);
  const [ftMetadata, setFtMetadata] = useState({});
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    factory.getAllPrograms().then((res) => {
      setProgramsList(res);
    });
  }, []);

  useEffect(() => {
    const checkSignIn = async () => {
      await backend.startUp();
      const isProgramActive = !!backend.checkIsProgramActive();
      setIsSignedIn(isProgramActive);
      setMainLoader(false);
    };

    checkSignIn();
  }, []);

  // Get blockchain state once on component load
  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    const checkProgramExists = async () => {
      const merchantAddress = getMerchantAddress();
      await factory.checkProgramExists(merchantAddress).then((programExists) => {
        setProgramExists(programExists);
      });
      setMainLoader(false);
    };

    setMainLoader(true);
    checkProgramExists();
  }, [isSignedIn]);

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
  }, [programExists]);

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
      {mainLoader && <Loader />}
      {mainLoader || (
        <>
          <Welcome isSignedIn={isSignedIn} programExists={programExists} ftMetadata={ftMetadata} />

          {isSignedIn && (
            <SignedIn programExists={programExists} ftMetadata={ftMetadata} createLoyaltyToken={createLoyaltyToken} />
          )}
          {isSignedIn || <SignedOut programsList={programsList} />}
        </>
      )}
    </PageBackground>
  );
};

export default MarchantPage;
