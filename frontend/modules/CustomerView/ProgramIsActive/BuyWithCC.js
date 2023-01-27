const BuyWithCC = ({ purchaseWithCC, product }) => {
  return (
    <>
      Buy Coffe:
      <br />
      <button className="btn btn-primary" onClick={purchaseWithCC}>
        <span>
          Buy 1 {product.name} for {product.fiatCost}
        </span>
        <div className="loader"></div>
      </button>
      <br />
      <span style={{ fontSize: '12px' }}>
        dodac taki disclamer, ze po tym jak user to kliknie, to jest wysylany request do backendu, tam robimy
        przekierowanie do platnosci, a po otrzymaniu potwierdzenia platnosci backend przelewa Tokeny na konto klienta
      </span>
    </>
  );
};

export default BuyWithCC;
