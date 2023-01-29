import WelcomeSection from '../../../../components/WelcomeSection';

const Welcome = ({ ftMetadata, programIsActive, merchantAddress }) => {
  return (
    <WelcomeSection>
      {merchantAddress && 'Loyalty Program'}
      {merchantAddress && (programIsActive ? ftMetadata.token_name : `You don't have a loyalty program yet`)}
      {programIsActive || 'Choose the loyalty program from the list:'}
    </WelcomeSection>
  );
};

export default Welcome;
