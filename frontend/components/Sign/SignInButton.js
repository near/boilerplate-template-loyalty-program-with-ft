const SignInButton = ({ onClick, variant = 'link' }) => (
  <>
    {variant === 'button' && (
      <button
        onClick={onClick}
        className="rounded-md bg-indigo-400 px-8 py-3 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign In with NEAR <span aria-hidden="true">&rarr;</span>
      </button>
    )}
    {variant === 'link' && (
      <button onClick={onClick} className="text-sm font-semibold leading-6 text-gray-900">
        Sign in with NEAR <span aria-hidden="true">&rarr;</span>
      </button>
    )}
  </>
);

export default SignInButton;
