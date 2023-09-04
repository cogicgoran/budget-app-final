import React from "react";
import styles from "./receiptProductList.module.scss";
import { useTranslation } from "react-i18next";
import ReceiptProduct from "./ReceiptProduct";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { FormDataArticle } from "./ReceiptAddProduct";
import { useReceiptContext } from "../../context/NewReceiptContext";

interface Props {
  onRemoveArticle: (id: string) => void;
  total: any;
  articleList: FormDataArticle[];
}

function ReceiptProductList({ articleList, onRemoveArticle, total }: Props) {
  const { currencies } = useReceiptContext();
  const { watch } = useFormContext();
  const selectedCurrencyId = watch("currency");
  const { t } = useTranslation();
  const textProductName = t("productName");
  const textCategory = t("category");
  const textPrice = t("price");
  const textAmount = t("amount");
  const textTotal = t("total");

  const currencyCode = currencies.find(
    (currency) => currency.id == selectedCurrencyId,
  )?.code;

  return (
    <div>
      <table className={classNames(styles["new-receipt-table"], "w-full")}>
        <thead>
          <tr>
            <th>{textProductName}</th>
            <th>{textCategory}</th>
            <th>{textPrice}</th>
            <th>{textAmount}</th>
            <th>{textTotal}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => {
            return (
              <ReceiptProduct
                key={article.uuid}
                onRemoveArticle={onRemoveArticle}
                article={article}
                currency={currencyCode}
              />
            );
          })}
        </tbody>
      </table>
      <span className={styles["new-receipt-total"]}>
        {total.toFixed(2)} {currencyCode}
      </span>
    </div>
  );
}

export default ReceiptProductList;
