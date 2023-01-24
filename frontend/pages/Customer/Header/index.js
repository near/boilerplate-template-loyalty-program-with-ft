import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div>
            <Link to="/">Open Merchant Admin Panel</Link>
            <br />
            <span style={{ fontSize: '10px' }}>* this option is not visible for Customers</span>
          </div>
        </div>
      </div>
      <hr />
      <hr />
    </>
  );
};

export default Header;
