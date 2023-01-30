const HeaderSection = ({ children }) => (
  <div className="px-6 pt-6 lg:px-8">
    <nav className="flex items-center justify-between h-12" aria-label="Global">
      <div className="flex flex-col">
        <a
          href="/"
          className="rounded-md bg-purple-400 px-3.5 py-1.5 text-base leading-7 text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Back to main Page
        </a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">{children}</div>
    </nav>
  </div>
);

export default HeaderSection;
