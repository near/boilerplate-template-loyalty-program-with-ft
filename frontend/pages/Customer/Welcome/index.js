const Welcome = ({ ftMetadata, product, programIsActive }) => {
  return (
    <>
      {programIsActive && (
        <>
          <div style={{ textAlign: 'center' }}>
            Welcome to
            <br />
            <h2>
              <b>{ftMetadata.token_name}</b>
            </h2>
            <h4>Loyalty Program</h4>
            <br />
            <span style={{ fontSize: '12px' }}>
              This Loyalty Program is using <b>{ftMetadata.token_symbol}</b> Token.
              <br />
              You will receive <b>{product.tokensPerUnit}</b> <b>{ftMetadata.token_symbol}</b> tokens after the
              purchase.
              <br />
              <b>
                {product.tokenCost} {ftMetadata.token_symbol}
              </b>{' '}
              Tokens can be exchanged for one free coffee.
            </span>
          </div>
          <br />
          <hr />
          <hr />
        </>
      )}
      {programIsActive || <div>The loyalty Program does not exist</div>}
    </>
  );
};

export default Welcome;
