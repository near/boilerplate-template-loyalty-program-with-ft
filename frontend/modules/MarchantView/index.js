import RewardProgramDetails from './RewardProgramDetails';
import RewardProgramForm from './RewardProgramForm';
import Sign from '../../components/Sign';

const MarchantView = ({
  uiPleaseWait,
  isSignedIn,
  programExists,
  ftMetadata,
  setSymbol,
  setName,
  setTotalSupply,
  createLoyaltyToken,
  errorMessage,
  wallet,
}) => {
  return (
    <div className={uiPleaseWait ? 'please-wait' : 'container'}>
      <h1>Merchant view</h1>
      <div className="change">
        {isSignedIn && programExists && <RewardProgramDetails ftMetadata={ftMetadata} />}
        {isSignedIn && !programExists && <p> There is no reward program, create one! </p>}

        {isSignedIn && !programExists && (
          <RewardProgramForm
            setName={setName}
            setSymbol={setSymbol}
            setTotalSupply={setTotalSupply}
            createLoyaltyToken={createLoyaltyToken}
            errorMessage={errorMessage}
          />
        )}

        <Sign isSignedIn={isSignedIn} wallet={wallet} />
      </div>
    </div>
  );
};

export default MarchantView;
