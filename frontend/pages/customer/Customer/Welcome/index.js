import WelcomeSection from '../../../../components/WelcomeSection';

const Welcome = ({ ftMetadata, programIsActive, merchantAddress }) => {
  return (
    <WelcomeSection>
      {merchantAddress && 'Loyalty Program'}
      {merchantAddress && (programIsActive ? ftMetadata.token_name : 'no loyalty program working...')}
      {programIsActive || '...use the list below to choose Loyalty Program'}
    </WelcomeSection>
  );
};

export default Welcome;
