import AccountDetails from './AccountDetails';
import BuyWithCC from './BuyWithCC';
import BuyWithTokens from './BuyWithTokens';
import ListOfTx from './ListOfTx';

const ProgramIsActive = ({
  ftMetadata,
  product,
  customerUuid,
  customerBalance,
  purchaseWithCC,
  canCollect,
  purchaseWithTokens,
}) => {
  return (
    <>
      <hr />

      <AccountDetails customerUuid={customerUuid} ftMetadata={ftMetadata} customerBalance={customerBalance} />

      <hr />

      <BuyWithCC purchaseWithCC={purchaseWithCC} product={product} />

      <hr />

      <BuyWithTokens
        canCollect={canCollect}
        purchaseWithTokens={purchaseWithTokens}
        product={product}
        ftMetadata={ftMetadata}
      />
      <ListOfTx />
    </>
  );
};

export default ProgramIsActive;
