import { useState } from "react";
import styles from "./marketplace.module.scss";
import ReactDOM from "react-dom";
import { useMarketplaces } from "../../hooks/useMarketplaces";
import MarketplaceList from "./MarketplaceList";
import Backdrop from "../UI/backdrop/Backdrop";
import Modal from "../UI/modal/Modal";
import NewMarketplace from "./NewMarketplace";

function MarketplacePage() {
  const [showModal, setShowModal] = useState(false);
  const { marketplaces, isLoading, prependNewMarketplace } = useMarketplaces();

  function handleSuccess(newMarketplace: any) {
    prependNewMarketplace(newMarketplace);
    setShowModal(false);
  }

  return (
    <div className={styles.marketplaces}>
      <button
        className={styles["new-marketplace__show-btn"]}
        onClick={() => {
          setShowModal(true);
        }}
      >
        + ADD MARKETPLACE
      </button>
      <MarketplaceList
        marketplaces={marketplaces}
        isLoading={isLoading}
        openAddMarketplaceModal={() => setShowModal(true)}
      />
      <button
        className={styles["new-marketplace__show-btn"]}
        onClick={() => {
          setShowModal(true);
        }}
      >
        + ADD MARKETPLACE
      </button>
      {showModal &&
        ReactDOM.createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")!,
        )}
      {showModal &&
        ReactDOM.createPortal(
          <Modal>
            <NewMarketplace
              onCancel={() => setShowModal(false)}
              onSuccess={handleSuccess}
            />
          </Modal>,
          document.getElementById("overlay-root")!,
        )}
    </div>
  );
}

export default MarketplacePage;
