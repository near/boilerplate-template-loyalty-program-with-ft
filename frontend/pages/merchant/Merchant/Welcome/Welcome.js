import SignInButton from '../../../../components/Sign/SignInButton';
import WelcomeSection from '../../../../components/WelcomeSection';
import { wallet } from '../../../../utils/wallet-selector';

const Welcome = ({ isSignedIn, programExists, ftMetadata }) => (
  <WelcomeSection>
    <>
      Loyalty Program <b>Administration Panel</b>
    </>
    {programExists ? ftMetadata.token_name : 'no loyalty program working...'}
    <>
      {!isSignedIn && <div>...sign in to open and run your Loyalty Program</div>}
      {isSignedIn && !programExists && <div>...use form below to create new Loyalty Program</div>}
    </>
    {!isSignedIn && <SignInButton variant="button" onClick={() => wallet.signIn()} />}
  </WelcomeSection>
);

export default Welcome;
