const SignOutButton = ({ accountId, onClick }) => (
  <button onClick={onClick} className="text-sm font-semibold leading-6 text-gray-900">
    <span aria-hidden="true">&larr;</span> Sign Out {accountId}
  </button>
);

export default SignOutButton;
