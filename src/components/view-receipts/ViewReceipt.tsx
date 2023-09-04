import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { viewReceiptAtom } from "../../store/atoms";
import { toast } from "react-toastify";
import classNames from "classnames";
import { PATHS } from "../../utils/constants";
import { IconPenToSquare } from "../icons/PenToSquare";
import { IconTrashCan } from "../icons/TrashCan";
import Button from "../UI/button/Button";
import styles from "../new-receipt-page/receiptProductList.module.scss";
import { getResponseErrorMessage } from "../../utils/function/common";
import { deleteReceipt, getReceipt } from "../../utils/api/receipt";
import { Link } from "react-router-dom";

interface Props {
  onDelete: (_receiptId: number) => void;
}

export default function ViewReceipt({ onDelete }: Props) {
  const { t } = useTranslation();
  const [receipt, setReceipt] = useState<
    | { id: number; articles: Array<any>; currency: any; marketplace: any }
    | undefined
  >();
  const [viewReceiptId, setViewReceiptId] = useAtom(viewReceiptAtom);

  const textProductName = t("productName");
  const textCategory = t("category");
  const textPrice = t("price");
  const textAmount = t("amount");
  const textTotal = t("total");

  useEffect(() => {
    const abortController = new AbortController();
    (async function fetchReceipt() {
      try {
        const data = await getReceipt(viewReceiptId!, abortController);
        setReceipt(data);
      } catch (error) {
        toast.error("Failed to retrieve a receipt");
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  if (!receipt) return <div>noreceipt</div>;

  const totalPrice = receipt.articles.reduce(
    (acc, article) => acc + article.unitPrice * article.amount,
    0,
  );

  return (
    <div>
      <div className={classNames("flex justify-center")}>
        <div>
          <Link to={PATHS.EDIT_RECEIPTS + "/" + receipt.id}>
            <a
              className={classNames(
                "block p-[6px] w-fit",
                "transition-colors cursor-pointer rounded-[50%]",
                "hover:bg-[#90c3d0] hover:text-[grey]",
              )}
            >
              <IconPenToSquare className={classNames("w-[20px] h-[20px]")} />
            </a>
          </Link>
        </div>
        <div>
          <span
            className={classNames(
              "block w-fit p-[6px]",
              "transition-colors cursor-pointer rounded-[50%]",
              "hover:bg-[#90c3d0] hover:text-[grey]",
            )}
            onClick={() => {
              (async function () {
                try {
                  await deleteReceipt(receipt.id);
                  onDelete(receipt.id);
                  setViewReceiptId(undefined);
                  toast.success("Receipt deleted");
                } catch (error) {
                  toast.error(getResponseErrorMessage(error));
                }
              })();
            }}
          >
            <IconTrashCan className={classNames("w-[20px] h-[20px]")} />
          </span>
        </div>
      </div>
      <table className={classNames(styles["new-receipt-table"], "w-[800px]")}>
        <thead>
          <tr>
            <th>{textProductName}</th>
            <th>{textCategory}</th>
            <th>{textPrice}</th>
            <th>{textAmount}</th>
            <th>{textTotal}</th>
          </tr>
        </thead>
        <tbody>
          {receipt?.articles?.map((article) => {
            const category = {};
            const currency = "RSD";
            return (
              <tr>
                <td className={classNames("px-[3px] py-[1px]")}>
                  {article.name}
                </td>
                <td className={classNames("px-[3px] py-[1px]")}>
                  <span>{article.category.name}</span>
                </td>
                <td className={classNames("px-[3px] py-[1px]")}>
                  {article.unitPrice.toFixed(2)} {receipt.currency.code}
                </td>
                <td className={classNames("px-[3px] py-[1px]")}>
                  {article.amount.toFixed(3)}
                </td>
                <td className={classNames("px-[3px] py-[1px]")}>
                  {(article.unitPrice * article.amount).toFixed(2)}{" "}
                  {receipt.currency.code}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <span className={styles["new-receipt-total"]}>
        {totalPrice.toFixed(2)} {receipt.currency.code}
      </span>
      <div className={classNames("mt-4 text-center")}>
        <Button
          actionType="fail"
          onClick={() => {
            setViewReceiptId(undefined);
          }}
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
