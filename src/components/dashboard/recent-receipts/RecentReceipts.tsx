import { Link } from "react-router-dom";
import { IconFileLines } from "../../icons/FileLines";
import Receipt from "../../receipt/Receipt";
import styles from "./recentReceipts.module.scss";
import { PATHS } from "../../../utils/constants";
import Button from "../../UI/button/Button";
import { useTranslation } from "react-i18next";

interface Props {
  receipts: any[];
  isLoading: boolean;
  onDelete: (_receiptId: number) => void;
}

function RecentReceipts({ isLoading, receipts, onDelete }: Props) {
  const { t } = useTranslation();
  const textRecentReceipts = t("recentReceipts");
  const textSeeMore = t("seeMore");
  const textAddNew = t("addNew");
  const textNoReceipts = t("noReceipts");

  return (
    <div className={styles.dashboardRecent}>
      <h2>{textRecentReceipts}</h2>
      <div>
        {isLoading && <p data-testid="loading">Loading...</p>}
        {!isLoading &&
          receipts.length > 0 &&
          receipts.map((receipt) => {
            return (
              <Receipt onDelete={onDelete} key={receipt.id} {...receipt} />
            );
          })}
        {!isLoading && receipts.length === 0 && (
          <div className={styles.dashboardNoRecentResults}>
            <IconFileLines />
            <span>{textNoReceipts}</span>{" "}
          </div>
        )}
        <div className={styles.dashboardRecentControls}>
          <Link key="seeMore" to={PATHS.VIEW_RECEIPTS}>
            <Button actionType="info" type="button">
              {textSeeMore}
            </Button>
          </Link>
          <Link key="addReceipt" to={PATHS.NEW_RECEIPTS}>
            <Button actionType="success" type="button">
              {textAddNew}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecentReceipts;
