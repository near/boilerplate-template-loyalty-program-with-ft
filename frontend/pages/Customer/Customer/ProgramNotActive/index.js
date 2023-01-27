import LoyaltyPrograms from '../../../../components/LoyaltyPrograms';

const ProgramNotActive = ({ programsList }) => {
  return (
    <>
      <LoyaltyPrograms programsList={programsList} details={false} />
    </>
  );
};

export default ProgramNotActive;
