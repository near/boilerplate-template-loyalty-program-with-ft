import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';
import { wallet } from '../../utils/wallet-selector';

const Sign = ({ isSignedIn }) => (
  <>
    {isSignedIn && (
      <SignOutButton className="btn btn-primary" accountId={wallet.accountId} onClick={() => wallet.signOut()} />
    )}
    {isSignedIn || <SignInButton variant="link" onClick={() => wallet.signIn()} />}
  </>
);

export default Sign;
