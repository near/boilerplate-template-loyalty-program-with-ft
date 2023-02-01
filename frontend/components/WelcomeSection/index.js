const WelcomeSection = ({ children }) => (
  <div className="text-center text-xl font-light text-gray-600">
    <p className="mt-6 leading-8">{children[0]}</p>
    <h1 className="mt-4 text-6xl font-bold tracking-tight text-gray-900">{children[1]}</h1>
    <span className="mt-8">{children[2]}</span>
    {<div className="mt-6 flex items-center justify-center gap-x-6">{children[3]}</div>}
  </div>
);

export default WelcomeSection;
