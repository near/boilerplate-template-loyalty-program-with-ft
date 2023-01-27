const BuyWithTokens = ({ canCollect, purchaseWithTokens, product, ftMetadata }) => {
  return (
    <>
      <button disabled={!canCollect} className="btn btn-primary" onClick={purchaseWithTokens}>
        <span>
          Collect for free, use {product.tokenCost} {ftMetadata.token_symbol} Tokens
        </span>
        <div className="loader"></div>
      </button>
      <br />
      <span style={{ fontSize: '12px' }}>
        dodac taki disclamer, ze po kliknieciu, konto uzytkownika jest autoryzowane poprzez ... klucze i tokeny sa
        odejmowane z jego konta
      </span>
    </>
  );
};

export default BuyWithTokens;
