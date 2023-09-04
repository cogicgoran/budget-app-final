import { useTranslation } from "react-i18next";
import styles from "../../components/pages/new-receipt/newReceipt.module.scss";
import ReceiptForm, {
  createReceiptPayload,
} from "../../components/forms/ReceiptForm";
import { useMarketplaces } from "../../hooks/useMarketplaces";
import { useCategories } from "../../hooks/useCategories";
import { useCurrencies } from "../../hooks/useCurrencies";
import { ReceiptContext } from "../../context/NewReceiptContext";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../../utils/function/common";
import { PATHS } from "../../utils/constants";
import dayjs from "dayjs";
import { ReceiptFormData } from "../new-receipt-page/NewReceiptPage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getReceipt, updateReceipt } from "../../utils/api/receipt";
import { FormDataArticle } from "../new-receipt-page/ReceiptAddProduct";

export function isReceiptInfoValid(info: any) {
  const { marketplace, date, currency } = info;
  if (
    typeof marketplace === "string" &&
    typeof date === "string" &&
    typeof currency === "string" &&
    marketplace.length > 0 &&
    date.length > 0 &&
    currency.length > 0 &&
    isFinite(new Date(date) as any)
  ) {
    return true;
  }
  return false;
}

const initialReceiptFormValue: ReceiptFormData = {
  marketplace: null,
  date: null,
  currency: null,
  articles: [],
};

const EditReceiptPage = () => {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const { marketplaces } = useMarketplaces();
  const { currencies } = useCurrencies();
  const formMethods = useForm<ReceiptFormData>({
    defaultValues: initialReceiptFormValue,
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query] = useSearchParams();
  const receiptId = Number(query.get("receiptId"));
  const textEditReceipt = t("editReceipt");

  const contextValue = {
    categories,
    marketplaces,
    currencies,
  };

  useEffect(() => {
    if (isNaN(receiptId)) {
      //  handle error
      return;
    }
    const abortController = new AbortController();

    (async function fetchReceipt() {
      try {
        const data = await getReceipt(receiptId, abortController);
        console.log(data);
        if (data.receipt) {
          formMethods.reset(
            {
              date: dayjs(data.receipt.date),
              articles: data.receipt.articles.map(
                (article: any): FormDataArticle => {
                  return {
                    id: article.id,
                    uuid: article.id,
                    price: article.unitPrice,
                    amount: article.amount,
                    category: article.category.id,
                    name: article.name,
                  };
                },
              ),
              marketplace: data.receipt.marketplace.id,
              currency: data.receipt.currency.id,
            },
            { keepDefaultValues: false },
          );
        }
      } catch (error) {
        toast.error(getResponseErrorMessage(error));
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  async function handleSubmit(formData: ReceiptFormData) {
    setIsSubmitting(true);
    try {
      const payload = createReceiptPayload({
        marketplace: formData.marketplace!,
        date: formData.date!,
        currency: formData.currency!,
        articles: formData.articles,
      });

      await updateReceipt(receiptId, payload);
      navigate(PATHS.DASHBOARD);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update receipt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ReceiptContext.Provider value={contextValue}>
      <div className={styles["new-receipt"]}>
        <h3>{textEditReceipt}</h3>
        <FormProvider {...formMethods}>
          <ReceiptForm
            isSubmitting={isSubmitting}
            submitHandler={handleSubmit}
          />
        </FormProvider>
      </div>
    </ReceiptContext.Provider>
  );
};

export default EditReceiptPage;
