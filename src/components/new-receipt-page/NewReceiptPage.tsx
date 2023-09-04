import { useTranslation } from "react-i18next";
import styles from "./newReceipt.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useCategories } from "../../hooks/useCategories";
import { useMarketplaces } from "../../hooks/useMarketplaces";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/constants";
import { createReceipt } from "../../utils/api/receipt";
import { ReceiptContext } from "../../context/NewReceiptContext";
import { FormDataArticle } from "./ReceiptAddProduct";
import ReceiptForm, { createReceiptPayload } from "../forms/ReceiptForm";

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

export interface ReceiptFormData {
  marketplace: number | null;
  date: Dayjs | null;
  currency: number | null;
  articles: Array<FormDataArticle>;
}

function NewReceiptPage() {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const { marketplaces } = useMarketplaces();
  const { currencies } = useCurrencies();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm({
    defaultValues: initialReceiptFormValue,
  });
  const navigate = useNavigate();

  const textNewReceipt = t("newReceipt");

  const contextValue = {
    categories,
    marketplaces,
    currencies,
  };

  async function handleSubmit(formData: ReceiptFormData) {
    setIsSubmitting(true);
    try {
      const payload = createReceiptPayload({
        marketplace: formData.marketplace!,
        date: formData.date!,
        currency: formData.currency!,
        articles: formData.articles,
      });

      await createReceipt(payload);
      navigate(PATHS.DASHBOARD);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create new receipt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ReceiptContext.Provider value={contextValue}>
      <div className={styles["new-receipt"]}>
        <h3 className="text-center text-[18px] font-normal">
          {textNewReceipt}
        </h3>
        <FormProvider {...formMethods}>
          <ReceiptForm
            submitHandler={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </FormProvider>
      </div>
    </ReceiptContext.Provider>
  );
}

export default NewReceiptPage;
