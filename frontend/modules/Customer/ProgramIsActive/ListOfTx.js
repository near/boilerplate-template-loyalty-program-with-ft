import Link from 'next/link';

const ListOfTx = ({ customerAccountId }) => (
  <div className="mt-6">
    <Link
      href={'https://explorer.testnet.near.org/accounts/' + customerAccountId}
      target="_blank"
      rel="noreferrer"
      className="text-lg font-semibold leading-6 text-indigo-600 hover:text-indigo-400"
    >
      Open Explorer to see list of purchases <span aria-hidden="true">&rarr;</span>
    </Link>
  </div>
);

export default ListOfTx;
