const LoyaltyPrograms = ({ programsList, wallet }) => (
  <div className="mt-2 leading-4 mt-2 overflow-hidden text-left shadow-2xl ring-1 ring-gray-900/5 rounded-2xl">
    <div className=" bg-white text-base">
      {programsList?.map((program, i) => (
        <div key={i} className={`${i % 2 && 'bg-gray-100'} px-4 py-5 `}>
          <div className="flex mb-2">
            <div className="text-3xl font-bold">
              {program.contracts.ft.token_name} -
              {wallet.accountId === program.accountId ? (
                <span className="text-green-500 font-light"> Active</span>
              ) : (
                <span className="text-red-500 font-light"> Not Active</span>
              )}
            </div>
            {wallet.accountId === program.accountId && (
              <div className="mt-2 ml-4">
                <a
                  href={`/customer/${program.accountId}`}
                  className="rounded-md bg-indigo-500 px-3.5 py-3 text-base leading-7 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Open Loyalty Program App
                </a>
              </div>
            )}
          </div>
          <hr />
          <p className="text-gray-500 text-xs mt-2">
            accountId: <span className="text-sm font-bold text-gray-700">{program.accountId}</span>
          </p>

          <p className="text-gray-500 text-xs">
            contract accountId:{' '}
            <span className="text-sm font-bold text-gray-700">{program.contracts.ft.account_id}</span>
          </p>
          <p className="text-gray-500 text-xs">
            token name: <span className="text-sm font-bold text-gray-700">{program.contracts.ft.token_name}</span>
          </p>
          <p className="text-gray-500 text-xs">
            token symbol: <span className="text-sm font-bold text-gray-700">{program.contracts.ft.token_symbol}</span>
          </p>
          <p className="text-gray-500 text-xs">
            total supply:{' '}
            <span className="text-sm font-bold text-gray-700">{program.contracts.ft.token_total_supply}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default LoyaltyPrograms;
