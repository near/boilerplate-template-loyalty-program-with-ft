import RewardProgramDetails from './RewardProgramDetails';
import RewardProgramForm from './RewardProgramForm';

const SignedIn = ({ programExists, ftMetadata, createLoyaltyToken }) => (
  <>
    {programExists && <RewardProgramDetails ftMetadata={ftMetadata} />}
    {programExists || <RewardProgramForm createLoyaltyToken={createLoyaltyToken} />}
  </>
);

export default SignedIn;
