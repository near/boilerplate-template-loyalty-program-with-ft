import SignInButton from '../../Sign/SignInButton';
import WelcomeSection from '../../WelcomeSection';
import { wallet } from '../../../utils/wallet-selector';

const Welcome = ({ isSignedIn, programExists, ftMetadata }) => (
  <WelcomeSection>
    <>
      Loyalty Program <b>Administration Panel</b>
    </>
    {programExists ? ftMetadata.token_name : 'No loyalty program is active'}
    <>
      {!isSignedIn && <div>Sign in to create a new program or see the one you have already created</div>}
      {isSignedIn && !programExists && <div>Fill in the form to create a loyalty program</div>}
    </>
    {!isSignedIn && <SignInButton variant="button" onClick={() => wallet.signIn()} />}
  </WelcomeSection>
);

export default Welcome;
