import Rules from '../Rules';
import AccountDetails from './AccountDetails';
import BuyWithCC from './BuyWithCC';
import BuyWithTokens from './BuyWithTokens';

const ProgramIsActive = ({
  ftMetadata,
  product,
  customerUuid,
  customerBalance,
  purchaseWithCC,
  canCollect,
  purchaseWithTokens,
  buyWithCCLoader,
  buyWithTokensLoader,
}) => (
  <>
    <div className="grid grid-cols-3 gap-10 mt-10">
      <AccountDetails customerUuid={customerUuid} ftMetadata={ftMetadata} customerBalance={customerBalance} />
      <Rules ftMetadata={ftMetadata} product={product} />
    </div>

    <div className="grid grid-cols-2 gap-10 mt-10" style={{ height: '34rem' }}>
      <BuyWithCC purchaseWithCC={purchaseWithCC} product={product} buyWithCCLoader={buyWithCCLoader} />
      <BuyWithTokens
        canCollect={canCollect}
        purchaseWithTokens={purchaseWithTokens}
        product={product}
        ftMetadata={ftMetadata}
        buyWithTokensLoader={buyWithTokensLoader}
      />
    </div>
  </>
);

export default ProgramIsActive;
