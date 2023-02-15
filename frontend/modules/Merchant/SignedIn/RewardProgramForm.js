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
      <form className="mt-20" onSubmit={handleSubmit}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Name (e.g. Loyalty Token)
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="email-address"
              type="text"
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              placeholder="Name (e.g. Loyalty Token)"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Symbol (e.g. LT)
            </label>
            <input
              onChange={(e) => setSymbol(e.target.value)}
              value={symbol}
              id="email-address"
              type="text"
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              placeholder="Symbol (e.g. LT)"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Total Supply (e.g. 1000)
            </label>
            <input
              onChange={(e) => setTotalSupply(e.target.value)}
              value={totalSupply}
              id="email-address"
              type="text"
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              placeholder="Total Supply (e.g. 1000)"
            />
          </div>
        </div>
        <div className="text-red-400 mt-2 mb-2 h-6">{errorMessage}</div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Create Loyalty Token
          </button>
        </div>
      </form>
    </>
  );
};

export default RewardProgramForm;
