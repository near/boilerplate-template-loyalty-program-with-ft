const RewardProgramDetails = ({ ftMetadata }) => (
  <>
    <div>
      <div className="pt-2 leading-4">
        <h1 className="text-3xl font-bold leading-relaxed">Basic info</h1>
      </div>
      <hr />
      <p className="mt-6 text-sm leading-6 text-gray-600">
        Congratulations! You just created a loyalty program! The factory contract deployed a pair of contracts assigned to 
        your account: manager contract and FT contract. The FT contract was initialized with the fungible token metadata 
        that you provided in the previous step. Go to 'contracts' directory to learn more.
        <br />
        <br />
        This project is just a template and some things are simplified. The web2 backend is simulated on the frontend (see: frontend/backend.js).
        As long as you are logged in, the backend remains in the active state and customers can use your loyalty program.
        <br />
        <br />
        Click 'Open customer app' to see how a customer can interact with your loyalty program. This is a separate service
        that communicates both with the backend and the FT contract to get and spend some tokens that you just created.
        <br />
        <br />
        Clicking on 'Open customer app' generates a link with merchant account id. That's how you account id is passed to
        the customer app. The factory contract stores information about all loyalty programs deployed by merchants. This 
        information is fetched by the customer app.
        <br />
        <br />
        If you log in, the customer app will be deactivated. Log in again to activate the backend for the customer app.
        <br />
      </p>
    </div>
    <div className="mt-10 leading-4 mt-2 overflow-hidden text-left shadow-2xl ring-1 ring-gray-900/5 rounded-2xl">
      <div className="px-6 py-4 bg-indigo-500 text-white">
        <h1 className="text-2xl">
          <span className="text-indigo-300 font-light">Loyalty Program </span>
          <span className="font-medium">Details</span>
        </h1>
        <p className="text-sm text-indigo-100">This is your loyalty program data fetched from the blockchain:</p>
      </div>
      <div className=" bg-white text-base">
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10">
          <dt className="font-medium text-gray-500">FT Account</dt>
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
