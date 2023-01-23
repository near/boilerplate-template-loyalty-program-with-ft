const AccountDetails = ({ customerUuid, ftMetadata, customerBalance }) => {
  return (
    <>
      <p>
        It's your first time at this LP, you don't have an account yet.
        <br />
        Your account will be created after first purchase
      </p>
      <hr />
      <p>
        Your loyalty program ID is: <b>{customerUuid}</b>
      </p>
      <p>
        Your {ftMetadata.token_symbol} token balance is: {customerBalance}
        {/*  */}
      </p>
    </>
  );
};

export default AccountDetails;
