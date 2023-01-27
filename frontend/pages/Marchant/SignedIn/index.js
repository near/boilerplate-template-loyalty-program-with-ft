import RewardProgramDetails from './RewardProgramDetails';
import RewardProgramForm from './RewardProgramForm';

const SignedIn = ({ programExists, ftMetadata, createLoyaltyToken }) => {
  return (
    <div>
      {programExists && <RewardProgramDetails ftMetadata={ftMetadata} />}
      {!programExists && <RewardProgramForm createLoyaltyToken={createLoyaltyToken} />}
    </div>
  );
};

export default SignedIn;
