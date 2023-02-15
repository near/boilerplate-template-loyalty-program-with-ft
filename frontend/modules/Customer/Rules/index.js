const Rules = ({ ftMetadata, product }) => (
  <div className=" leading-4 mt-2 overflow-hidden text-left shadow-2xl ring-1 ring-gray-900/5 rounded-lg">
    <div className="px-6 py-4 bg-indigo-500 text-white">
      <h1 className="text-xl">
        <span className="text-indigo-300 font-light">Loyalty Program </span>
        <span className="font-medium">Rules</span>
      </h1>
    </div>
    <hr />
    <div className="px-6 bg-white text-sm">
      <ul className="list-decimal list-inside my-4">
        <li className="text-gray-600">
          This Loyalty Program is using <span className="font-bold text-black">{ftMetadata.token_symbol} Token</span>.
        </li>
        <li className="mt-2 text-gray-600">
          You will receive{' '}
          <span className="font-bold text-black">
            {product.tokensPerUnit} {ftMetadata.token_symbol} Tokens
          </span>{' '}
          after the purchase.
        </li>
        <li className="mt-2 text-gray-600">
          <span className="font-bold text-black">
            {product.tokenCost} {ftMetadata.token_symbol} Tokens{' '}
          </span>
          can be exchanged for one free coffee.
        </li>
      </ul>
    </div>
  </div>
);

export default Rules;
