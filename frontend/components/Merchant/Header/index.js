// import { Link } from 'react-router-dom';
import HeaderSection from '../../HeaderSection';
import Sign from '../../Sign';
import { getMerchantAddress } from '../../../utils/utils';

const Header = ({ isSignedIn, programExists }) => {
  return (
    <HeaderSection>
      {programExists && (
        <div className="mr-4">
          <a
            href={`/customer?program=${getMerchantAddress()}`}
            className="rounded-md bg-indigo-500 px-3.5 py-3 text-base leading-7 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Open Customer App
          </a>
        </div>
      )}
      <Sign isSignedIn={isSignedIn} />
    </HeaderSection>
  );
};

export default Header;
