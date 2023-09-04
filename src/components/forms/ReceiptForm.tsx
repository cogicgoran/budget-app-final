import { useRef, useState } from "react";
import Backdrop from "../UI/backdrop/Backdrop";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import Button from "../UI/button/Button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Dayjs } from "dayjs";
import PrepopulateReceiptForm, {
  PrepopulateReceiptResponse,
} from "./prepopulate/PrepopulateReceiptForm";
import { uuidv4 } from "@firebase/util";
import { useReceiptContext } from "../../context/NewReceiptContext";
import dayjs from "dayjs";
import { ReceiptFormData } from "../new-receipt-page/NewReceiptPage";
import ReceiptAddProduct, {
  FormDataArticle,
} from "../new-receipt-page/ReceiptAddProduct";
import ReceiptInfo from "../new-receipt-page/ReceiptInfo";
import ReceiptProductList from "../new-receipt-page/ReceiptProductList";
import { ReceiptDto } from "../../utils/dto/receipt.dto";

interface Props {
  isSubmitting: boolean;
  submitHandler: (_formData: ReceiptFormData) => void;
}

function ReceiptForm({ isSubmitting, submitHandler }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showPrepopulate, setShowPrepopulate] = useState(false);
  const { t } = useTranslation();
  const { marketplaces } = useReceiptContext();

  const addProductRef = useRef<HTMLButtonElement>(null);
  const formMethods = useFormContext<ReceiptFormData>();

  const articles = formMethods.watch("articles");
  const totalPrice = articles.reduce(
    (acc, article) => acc + article.price * article.amount,
    0,
  );

  const textAddProduct = t("addProduct");
  const textFinish = t("finish");
  const textNewReceipt = t("newReceipt");

  function addArticleHandler(article: FormDataArticle) {
    formMethods.setValue("articles", [
      ...formMethods.getValues().articles,
      article,
    ]);
    addProductRef.current?.focus();
  }

  function removeArticle(uuid: string) {
    const currentArticles = formMethods.getValues().articles;
    formMethods.setValue(
      "articles",
      currentArticles.filter((article) => article.uuid !== uuid),
    );
  }

  function getMarketplaceByOption(
    marketplaceName: string,
    marketplaceAddress: string,
  ) {
    const foundMarketplace = marketplaces.find((marketplace) => {
      return (
        marketplace.name
          .toLowerCase()
          .includes(marketplaceName.toLowerCase()) &&
        marketplace.address
          .toLowerCase()
          .includes(marketplaceAddress.toLowerCase())
      );
    });

    return foundMarketplace?.id ?? null;
  }

  function handleDataPopulation(data: PrepopulateReceiptResponse) {
    console.log(data);
    formMethods.setValue(
      "articles",
      data.articles.map((dataItem) => {
        return {
          amount: dataItem.amount,
          category: 1,
          name: dataItem.name,
          price: dataItem.unitPrice,
          uuid: uuidv4(),
        };
      }),
    );
    formMethods.setValue("date", dayjs(data.date));
    formMethods.setValue(
      "marketplace",
      getMarketplaceByOption(
        data.marketplaceData.shopName,
        data.marketplaceData.address,
      ),
    );
  }

  return (
    <>
      <div>
        <form onSubmit={formMethods.handleSubmit(submitHandler)}>
          <ReceiptInfo />
          <ReceiptProductList
            onRemoveArticle={removeArticle}
            articleList={formMethods.getValues().articles}
            total={totalPrice}
          />
          <Button
            ref={addProductRef}
            type="button"
            actionType="create"
            onClick={() => setShowModal(true)}
          >
            + {textAddProduct}
          </Button>
          <Button
            type="button"
            actionType="create"
            onClick={() => setShowPrepopulate(true)}
          >
            + Scan receipt QR Code
          </Button>
          <div className="text-center">
            <Button type="submit" actionType="success" disabled={isSubmitting}>
              {textFinish}
            </Button>
          </div>
        </form>
      </div>
      {showModal &&
        createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")!,
        )}
      {showModal &&
        createPortal(
          <ReceiptAddProduct
            onAddArticle={addArticleHandler}
            onCancel={() => setShowModal(false)}
          />,
          document.getElementById("overlay-root")!,
        )}
      {showPrepopulate &&
        createPortal(
          <Backdrop onCancel={() => setShowPrepopulate(false)} />,
          document.getElementById("backdrop-root")!,
        )}
      {showPrepopulate &&
        createPortal(
          <PrepopulateReceiptForm onDataRetrieved={handleDataPopulation} />,
          document.getElementById("overlay-root")!,
        )}
    </>
  );
}

export default ReceiptForm;

export function createReceiptPayload(formData: {
  marketplace: number;
  date: Dayjs;
  currency: number;
  articles: FormDataArticle[];
}) {
  return ReceiptDto.parse({
    marketplaceId: Number(formData.marketplace),
    date: formData.date.toISOString(),
    currencyId: Number(formData.currency),
    articles: formData.articles.map((article) => ({
      id: article.id,
      name: article.name,
      category: article.category,
      unitPrice: article.price,
      amount: article.amount,
    })),
  });
}
