const CustomerView = ({ uiPleaseWait, customerUuid, customerBalance, purchaseWithCC, purchaseWithTokens }) => {
  return (
    <div className={uiPleaseWait ? 'please-wait' : 'container'}>
      <h1>Customer view</h1>

      <div className="change">
        <div>Your ID number: {customerUuid}</div>
        <div>Your tokens balance: {customerBalance}</div>
        <span className="ftDetails"> 1 Large Coffee </span>
        <span className="ftDetails"> 3$ </span>
        <span className="ftDetails"> 30 Tokens </span>
        <hr />
        <button className="btn btn-primary" onClick={purchaseWithCC}>
          <span>Purchase with CC</span>
          <div className="loader"></div>
        </button>
        <button className="btn btn-primary" onClick={purchaseWithTokens}>
          <span>Purchase with Tokens</span>
          <div className="loader"></div>
        </button>
      </div>
    </div>
  );
};

export default CustomerView;
