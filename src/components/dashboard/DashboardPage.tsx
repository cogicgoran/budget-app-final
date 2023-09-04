import { useAuthState } from "react-firebase-hooks/auth";
import Backdrop from "../UI/backdrop/Backdrop";
import Modal from "../UI/modal/Modal";
import MonthSummary from "./monthly-summary/MonthSummary";
import RecentReceipts from "./recent-receipts/RecentReceipts";
import { firebaseAuthService } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useRecentReceipts } from "../../hooks/useRecentReceipts";
import { useAtom } from "jotai";
import { viewReceiptAtom } from "../../store/atoms";
import DashboardCategories from "./categories/DashboardCategories";
import ViewReceipt from "../view-receipts/ViewReceipt";

function DashboardPage() {
  const { receipts, categories, isLoading, removeReceipt } =
    useRecentReceipts();
  const [viewReceiptId, setViewReceiptId] = useAtom(viewReceiptAtom);

  return (
    <>
      <div>
        <RecentReceipts
          receipts={receipts}
          isLoading={isLoading}
          onDelete={removeReceipt}
        />
        <MonthSummary />
        <DashboardCategories categories={categories} isLoading={isLoading} />
        {viewReceiptId !== undefined && (
          <Backdrop
            onCancel={() => {
              setViewReceiptId(undefined);
            }}
          />
        )}
        {viewReceiptId !== undefined && (
          <Modal>
            <ViewReceipt onDelete={removeReceipt} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default DashboardPage;
