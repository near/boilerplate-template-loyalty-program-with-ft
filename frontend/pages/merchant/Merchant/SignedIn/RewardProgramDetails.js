const RewardProgramDetails = ({ ftMetadata }) => (
  <>
    <div>
      <div className="pt-2 leading-4">
        <h1 className="text-3xl font-bold leading-relaxed">Basic info</h1>
      </div>
      <hr />
      <p className="mt-6 text-sm leading-6 text-gray-600">
        - opisac co sie w tym momencie stalo od strony blockchain: ze utworzony zostal loyalty program z uzyciem
        kontraktow itp
        <br />
        - ze puki jest zalogowany, to symulujemy w ten sposob to ze backend jest aktywny czyli loyalty program jest
        aktywny i dziala
        <br />
        - ze jak kliknie "Open customer app" to zostanie przeniesiony do widoku klienta, ktory jest oddzielnym serwisem
        - dziala niezaleznie od backendu, komunikuje sie z backendem zeby kupic za CC albo Tokeny
        <br />
        - po kliknieciu "Open customer app" zostanie uruchomiony link, zawierajacy w sobie identyfikator loyalty program
        - z pomoca tego linka, Customer moga kupowac
        <br />
        - ze moze sie tez wylogowac, wtedy program zostaje zamkniety, przestaje dzialac
        <br />- poprzez login i logout symulujemy Aktywacje oraz Zamkniecie programu lojalnosciowego
      </p>
    </div>
    <div className="mt-10 leading-4 mt-2 overflow-hidden text-left shadow-2xl ring-1 ring-gray-900/5 rounded-2xl">
      <div className="px-6 py-4 bg-indigo-500 text-white">
        <h1 className="text-2xl">
          <span className="text-indigo-300 font-light">Loyalty Program </span>
          <span className="font-medium">Details</span>
        </h1>
        <p className="text-sm text-indigo-100">to sa dane twojego programu lojalnosciowego pobrane z blockchain</p>
      </div>
      <div className=" bg-white text-base">
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
          <dt className="font-medium text-gray-500">Account</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{ftMetadata.account_id}</dd>
        </div>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
          <dt className="font-medium text-gray-500">Name</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{ftMetadata.token_name}</dd>
        </div>
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
          <dt className="font-medium text-gray-500">Symbol</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{ftMetadata.token_symbol}</dd>
        </div>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
          <dt className="font-medium text-gray-500">Total Supply</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{ftMetadata.token_total_supply}</dd>
        </div>
      </div>
    </div>
  </>
);

export default RewardProgramDetails;
