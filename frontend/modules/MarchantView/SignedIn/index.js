import RewardProgramDetails from '../SignedOut/RewardProgramDetails';
import RewardProgramForm from '../SignedOut/RewardProgramForm';

const SignedIn = ({ programExists, ftMetadata, createLoyaltyToken }) => {
  return (
    <div>
      {programExists && <RewardProgramDetails ftMetadata={ftMetadata} />}
      {!programExists && <RewardProgramForm createLoyaltyToken={createLoyaltyToken} />}
    </div>
  );
};

export default SignedIn;
