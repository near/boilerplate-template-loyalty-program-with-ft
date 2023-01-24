const SignOutButton = ({ accountId, signOut }) => {
  return (
    <button className="btn btn-primary" onClick={signOut}>
      Sign out {accountId}
    </button>
  );
};

export default SignOutButton;
