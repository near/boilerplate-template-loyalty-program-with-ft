import { useEffect, useState } from 'react';

import Header from './Header';
import { getMerchantAddress } from '../../utils/utils';
import Welcome from './Welcome/Welcome';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';

const MarchantView = ({ factory, wallet, customer }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [programExists, setProgramExists] = useState(false);
  const [ftMetadata, setFtMetadata] = useState({});

  useEffect(() => {
    const checkSignIn = async () => {
      const isSignedIn = await wallet.startUp();

      setIsSignedIn(isSignedIn);
    };

    checkSignIn();
  }, [wallet]);

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
    <div>
      <Header isSignedIn={isSignedIn} programExists={programExists} ftMetadata={ftMetadata} wallet={wallet} />
      <Welcome isSignedIn={isSignedIn} programExists={programExists} ftMetadata={ftMetadata} />
      {isSignedIn && (
        <SignedIn programExists={programExists} ftMetadata={ftMetadata} createLoyaltyToken={createLoyaltyToken} />
      )}
      {isSignedIn || <SignedOut />}
    </div>
  );
};

export default MarchantView;
