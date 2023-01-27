import LoyaltyPrograms from './LoyaltyPrograms';

const ProgramNotActive = ({ merchantAddress }) => {
  return (
    <>
      {merchantAddress && <div>taki program nie istnieje, wybierz z listy</div>}
      <hr />
      <LoyaltyPrograms />
    </>
  );
};

export default ProgramNotActive;
