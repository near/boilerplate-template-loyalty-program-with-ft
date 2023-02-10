import LoyaltyPrograms from '../../LoyaltyPrograms';

const SignedOut = ({ programsList, wallet }) => (
  <div className="mt-10">
    <LoyaltyPrograms programsList={programsList} details={true} />
  </div>
);

export default SignedOut;
