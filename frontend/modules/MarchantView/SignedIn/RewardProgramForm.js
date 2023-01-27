import { useState } from 'react';

const RewardProgramForm = ({ createLoyaltyToken }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const validation = {
    name: (value) => !value && 'All fields must be filled',
    symbol: (value) => !value && 'All fields must be filled',
    totalSupply: (value) => value <= 0 && 'Total supply should be > 0',
  };

  const formValidation = () => {
    const error = validation.name(name) || validation.symbol(symbol) || validation.totalSupply(totalSupply);
    setErrorMessage(error);
    return !error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValidation()) {
      return;
    }

    createLoyaltyToken({ name, symbol, totalSupply });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p> There is no reward program, create one! </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', rowGap: '12px' }}>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            placeholder="Name (e.g. Loyalty Token)"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="name">Symbol </label>
          <input
            id="symbol"
            placeholder="Symbol (e.g. LT)"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
          />
          <label htmlFor="name">Total Supply </label>
          <input
            id="totalSupply"
            placeholder="Total Supply (e.g. 1000)"
            onChange={(e) => setTotalSupply(e.target.value)}
            value={totalSupply}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'end', margin: '12px 0 0' }}>
          <button type="submit" className="btn btn-primary">
            <span>Create Loyalty Token</span>
            <div className="loader"></div>
          </button>
        </div>
        <hr />
        <div className="error">{errorMessage}</div>
      </form>
    </>
  );
};

export default RewardProgramForm;
