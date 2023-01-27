const BuyWithTokens = ({ canCollect, purchaseWithTokens, product, ftMetadata }) => (
  <div className=" ">
    <div className="relative overflow-hidden z-0 relative h-full relative bg-white pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-2xl">
      {!canCollect && <div className="z-10 absolute w-full h-full bg-gray-100 opacity-50"></div>}

      <div className="relative hover:bg-indigo-50">
        <div className="px-10 py-10 pb-12 flex-column">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-500">Use {ftMetadata.token_symbol} Tokens to buy</p>

          <p className="mt-10 mb-4">
            <span className="text-5xl font-bold">
              {product.tokenCost} {ftMetadata.token_symbol}
            </span>
            <span className="text-xl text-gray-500"> / one</span>
          </p>

          <button
            onClick={purchaseWithTokens}
            className="w-full rounded-md bg-indigo-500 px-10 py-3 text-xl leading-10 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="text-indigo-300">Buy with</span>
            <span className="font-bold"> {ftMetadata.token_symbol} Token</span>
          </button>
        </div>
        <hr />
        <div className="px-10 flex-column">
          <p className="text-xs text-gray-500 mt-10">
            <ul className="list-disc pl-6">
              <li>
                opis dodac, ze po kliknieciu, konto uzytkownika jest autoryzowane (w jaki sposob) a klucze i tokeny sa
                odejmowane z jego konta
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default BuyWithTokens;
