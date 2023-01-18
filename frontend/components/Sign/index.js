import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';

const Sign = ({ isSignedIn, wallet }) => {
  return (
    <>
      {isSignedIn ? (
        <SignOutButton className="btn btn-primary" accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      ) : (
        <SignInButton wallet={wallet} />
      )}
    </>
  );
};

export default Sign;
