import { Link } from 'react-router-dom';
import Sign from '../../../components/Sign';
import { getMerchantAddress } from '../../../utils/utils';

const Header = ({ isSignedIn, programExists, ftMetadata, wallet }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {programExists && (
          <Link to={`/customer/${getMerchantAddress()}`}>
            Open Customer App for <b>{ftMetadata.token_name}</b> Loyalty Program
          </Link>
        )}
      </div>
      <div style={{ justifyContent: 'flex-end' }}>
        {/* TODO: przy wylogowywaniu, usunac caly local storage? */}
        <Sign isSignedIn={isSignedIn} wallet={wallet} />
      </div>
    </div>
  );
};

export default Header;
