const RewardProgramDetails = ({ ftMetadata }) => {
  return (
    <>
      <p> Here is your program data</p>
      <div className="">
        <p>
          Account: <b>{ftMetadata.account_id}</b>
        </p>
        <p>
          Name: <b>{ftMetadata.token_name}</b>
        </p>
        <p>
          Symbol: <b>{ftMetadata.token_symbol}</b>
        </p>
        <p>
          Total Supply: <b>{ftMetadata.token_total_supply}</b>
        </p>
      </div>
      <hr />
    </>
  );
};

export default RewardProgramDetails;
