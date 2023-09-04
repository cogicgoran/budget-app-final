import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./receiptAddProduct.module.scss";
import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uuidv4 } from "@firebase/util";
import z from "zod";
import { useReceiptContext } from "../../context/NewReceiptContext";
import NewProductInput from "../forms/NewProductInput";
import NewProductSelect from "../forms/NewProductSelect";
import Button from "../UI/button/Button";

interface Props {
  onAddArticle: (article: FormDataArticle) => void;
  onCancel: () => any;
}

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Invalid name" })
    .min(1, { message: "Name must contain at least 1 character" }),
  category: z.string({
    invalid_type_error: "Please select an article category",
  }),
  price: z
    .number({ coerce: true, invalid_type_error: "Invalid price" })
    .positive({ message: "Price must be positive" }),
  amount: z
    .number({ coerce: true, invalid_type_error: "Invalid price" })
    .positive({ message: "Amount must be greater than 0" }),
});

function getInitialFormValues() {
  return {
    name: "",
    category: null as string | null,
    price: "",
    amount: 1,
  };
}

export type AddArticleFormValues = ReturnType<typeof getInitialFormValues>;

export interface FormDataArticle {
  id?: number;
  uuid: string;
  name: string;
  price: number;
  amount: number;
  category: number;
}

function ReceiptAddProduct(props: Props) {
  const methods = useForm<AddArticleFormValues>({
    defaultValues: getInitialFormValues(),
    resolver: zodResolver(schema),
  });
  const { watch, handleSubmit, setFocus } = methods;
  const { categories } = useReceiptContext();
  const { t } = useTranslation();
  const textAdd = t("add");
  const textAddProduct = t("addProduct");
  const textCategory = t("category");
  const textCancel = t("cancel");
  const textName = t("name");
  const textPrice = t("price");
  const textAmount = t("amount");

  const formValues = watch();

  function onSubmit(values: AddArticleFormValues) {
    props.onAddArticle({
      uuid: uuidv4(),
      name: values.name.trim(),
      category: Number(values.category!),
      price: Number(values.price),
      amount: Number(values.amount),
    });

    props.onCancel();
  }

  useEffect(() => {
    setFocus("name");
  }, []);

  function onInvalid() {}

  const submitAction = handleSubmit(onSubmit, onInvalid);

  return (
    <div className={styles.newProduct}>
      <div>
        <h4>{textAddProduct}</h4>
        <FormProvider {...methods}>
          <form id="article-form" name="article-form" onSubmit={submitAction}>
            <NewProductInput label={textName} name="name" key="name" />
            <NewProductInput label={textPrice} name="price" key="price" />
            <NewProductSelect
              label={textCategory}
              name="category"
              key="category"
              options={categories.map((category) => ({
                label: category.name,
                value: category.id.toString(),
              }))}
            />
            <NewProductInput label={textAmount} name="amount" key="amount" />
            <div className={styles.newProductControls}>
              <Button type="button" actionType="fail" onClick={props.onCancel}>
                {textCancel}
              </Button>
              <Button actionType="success" type="button" onClick={submitAction}>
                {textAdd}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ReceiptAddProduct;
