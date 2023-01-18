const RewardProgramForm = ({ setName, setSymbol, setTotalSupply, createLoyaltyToken, errorMessage }) => {
  return (
    <>
      <label htmlFor="name"> Loyalty Token </label>
      <input required id="name" placeholder="Name (e.g. Loyalty Token)" onChange={(e) => setName(e.target.value)} />
      <input required id="symbol" placeholder="Symbol (e.g. LT)" onChange={(e) => setSymbol(e.target.value)} />
      <input
        required
        id="totalSupply"
        placeholder="Total Supply (e.g. 1000)"
        onChange={(e) => setTotalSupply(e.target.value)}
      />
      <button className="btn btn-primary" onClick={createLoyaltyToken}>
        <span>Create Loyalty Token</span>
        <div className="loader"></div>
      </button>
      <hr />
      <div className="error">{errorMessage}</div>
    </>
  );
};

export default RewardProgramForm;
