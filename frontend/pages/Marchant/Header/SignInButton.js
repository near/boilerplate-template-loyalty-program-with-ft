const SignInButton = ({ modal }) => {
  return (
    <button className="btn btn-primary" onClick={() => modal?.show()}>
      Sign in with NEAR
    </button>
  );
};

export default SignInButton;
