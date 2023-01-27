const BuyWithCC = ({ purchaseWithCC, product }) => (
  <div className="hover:bg-indigo-50 h-full relative bg-white pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-2xl">
    <div className="px-10 py-10 pb-12 flex-column">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-sm text-gray-500">Use Credit Card to buy</p>

      <p className="mt-10 mb-4">
        <span className="text-5xl font-bold">{product.fiatCost}</span>
        <span className="text-xl text-gray-500"> / one</span>
      </p>

      <button
        onClick={purchaseWithCC}
        className="w-full rounded-md bg-indigo-500 px-10 py-3 text-xl leading-10 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span className="text-indigo-300">Buy with</span>
        <span className="font-bold"> Credit Card</span>
      </button>
    </div>
    <hr />
    <div className="px-10 flex-column">
      <p className="text-xs text-gray-500 mt-10">
        <ul className="list-disc pl-6">
          <li>this will simulate purchase via Credit Card</li>
          <li>
            opis ze po tym jak user to kliknie, to jest wysylany request do backendu, tam robimy udawane przekierowanie
            do platnosci, a po otrzymaniu potwierdzenia platnosci backend przelewa Tokeny na konto klienta
          </li>
        </ul>
      </p>
    </div>
  </div>
);

export default BuyWithCC;
