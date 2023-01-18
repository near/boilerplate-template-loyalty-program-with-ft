const RewardProgramDetails = ({ ftMetadata }) => {
  return (
    <>
      <p> Here is your program data</p>

      <div className="ftDetailsWrapper">
        Account: <div className="ftDetails">{ftMetadata.account_id}</div>
        Name: <div className="ftDetails">{ftMetadata.token_name}</div>
        Symbol: <div className="ftDetails">{ftMetadata.token_symbol}</div>
        Total Supply: <div className="ftDetails">{ftMetadata.token_total_supply}</div>
      </div>
      <hr />
    </>
  );
};

export default RewardProgramDetails;
