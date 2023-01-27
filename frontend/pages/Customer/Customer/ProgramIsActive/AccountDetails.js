import ListOfTx from './ListOfTx';

const AccountDetails = ({ customerUuid, ftMetadata, customerBalance }) => (
  <div className="col-span-2">
    <div className="pt-2 leading-4">
      <h1 className="text-4xl font-bold leading-relaxed">Your account details</h1>
    </div>
    <hr />
    <div className="text-base">
      {!!customerBalance || (
        <>
          <p className="mt-6 text-gray-600">It's your first time at this LP, you don't have an account yet.</p>
          <p className="mt-2 text-gray-600">After first purchase:</p>
          <p className="mt-2 text-gray-600">
            - Your account will be created
            <br />
            - bedzie to w pelni aktywne konto Near - dzieki temu wszystkie twoje zakupy i zebrane tokeny beda
            przechowywane na blockchain
            <br />
          </p>
        </>
      )}
      {!!customerBalance && (
        <>
          <p className="mt-6 text-gray-600">Your User ID for {ftMetadata.token_name} Loyalty Program:</p>
          <p className="text-gray-900 text-2xl font-bold">{customerUuid} - dac pelna nazwe konta</p>
          <p className="mt-6 text-gray-600">Your {ftMetadata.token_symbol} token balance is:</p>
          <p className="text-gray-900 text-2xl font-bold">
            {customerBalance} {ftMetadata.token_symbol}
          </p>
          <ListOfTx />
        </>
      )}
    </div>
  </div>
);

export default AccountDetails;
