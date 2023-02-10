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
          <p className="mt-6 text-gray-600">Welcome to the customer app! It's your first time using this loyalty program, you don't have an account yet.</p>
          <p className="mt-2 text-gray-600">After the first purchase:</p>
          <p className="mt-2 text-gray-600">
            - a new account will be created for you (and you don't have to do anything)
            <br />
            - it will be your personal account - you hold all the keys and only you have access to it
            <br />
            - it will be a subaccount of the manager contract - see the contracts/manager-contract to see how this happens under the hood
            <br />
            - This account will be a full Near account. You can perform operations on the blockchain like getting and spending your tokens,
              deploying contracts and more.
            <br />
          </p>
        </>
      )}
      {!!customerBalance && (
        <>
          <p className="mt-6 text-gray-600">Your User ID for {ftMetadata.token_name} Loyalty Program:</p>
          <p className="text-gray-900 text-2xl font-bold">{customerUuid}</p>
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
