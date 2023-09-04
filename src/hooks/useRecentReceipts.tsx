import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRecentReceipts } from "../utils/api/receipt";

export type DashboardReceipt = ReturnType<
  typeof mapToDashboardReceipts
>[number];

function mapToDashboardReceipts(receipts: any[]) {
  return receipts.map((receipt) => ({
    id: receipt.id,
    date: receipt.date,
    price: receipt.total,
    currency: receipt.currency.code,
    shopName: receipt.marketplace.address,
    mostSpentCategory: receipt.mostSpentCategory,
  }));
}

export function useRecentReceipts() {
  const [receipts, setReceipts] = useState<DashboardReceipt[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function removeReceipt(receiptId: number) {
    setReceipts((receipts) =>
      receipts.filter((receipt) => receipt.id !== receiptId),
    );
  }

  useEffect(() => {
    getReceipts();
  }, []);

  async function getReceipts() {
    setIsLoading(true);
    try {
      const receiptsData = await getRecentReceipts();
      const receiptsFormatted = mapToDashboardReceipts(
        receiptsData.recentReceipts,
      );
      setCategories(receiptsData.recentCategories);
      setReceipts(receiptsFormatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get recent receipts");
    } finally {
      setIsLoading(false);
    }
  }

  return { removeReceipt, receipts, categories, isLoading };
}
