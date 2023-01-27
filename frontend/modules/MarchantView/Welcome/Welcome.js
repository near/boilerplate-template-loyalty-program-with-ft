const Welcome = ({ isSignedIn, programExists, ftMetadata }) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Welcome to <b>Administration Panel</b>
        {programExists && (
          <>
            <br />
            <h2>
              <b>{ftMetadata.token_name}</b>
            </h2>
            <h4>Loyalty Program</h4>
            <hr />
            <hr />
            dodac info, ze to sa dane twojego programu, jak klikniesz "open..." to zostaniesz przeniesiony do widoku
            klienta, ten link mozesz przekazac swoim klientom zeby mogli dokonywac zakupow
            <br />
            <br />
            ze moze sie tez wylogowac, wtedy program zostaje zamkniety
            <br />
            <br />
            poprzez login i logout symulujemy Aktywacje oraz Zamkniecie programu lojalnosciowego
          </>
        )}
        {!isSignedIn && (
          <>
            <br />
            <br />
            no loyalty program working
            <br />
            <i>Sign in to open and run your Loyalty Program</i>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default Welcome;
