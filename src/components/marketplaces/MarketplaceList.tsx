import React, { useMemo } from "react";
import MarketplaceItem from "./MarketplaceItem";
import styles from "./marketplaceList.module.scss";

interface Props {
  openAddMarketplaceModal: () => void;
  marketplaces: any[];
  isLoading: boolean;
}

function MarketplaceList({
  isLoading,
  marketplaces,
  openAddMarketplaceModal,
}: Props) {
  const display = useMemo(() => {
    if (marketplaces && marketplaces.length > 0) {
      return (
        <table className={styles["marketplace-list__table"]}>
          <thead>
            <th>Name</th>
            <th>Address</th>
            <th></th>
          </thead>
          <tbody>
            {marketplaces.map((marketplace: any) => (
              <MarketplaceItem key={marketplace.id} marketplace={marketplace} />
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        No Marketplaces found. You can add one{" "}
        <button onClick={openAddMarketplaceModal}>
          <i>here</i>
        </button>
      </div>
    );
  }, [marketplaces]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && display}
    </div>
  );
}

export default MarketplaceList;
