import Link from 'next/link';

const App = () => (
  <div className="grid grid-cols-2 mt-20">
    <div className="text-center">
      <Link href="/merchant" className="text-8xl">
        <span className="font-thin text-4xl">open</span>
        <br />
        <span className="hover:text-indigo-500">Merchant</span>
        <br />
        <span className="font-thin text-4xl">Panel</span>
      </Link>
    </div>
    <div className="text-center">
      <Link href="/customer" className="text-8xl">
        <span className="font-thin text-4xl">open</span>
        <br />
        <span className="hover:text-indigo-500">Client</span>
        <br />
        <span className="font-thin text-4xl">Page</span>
      </Link>
    </div>
  </div>
);

export default App;
