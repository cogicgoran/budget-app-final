import classNames from "classnames";
import Select from "react-select";
import { useFormContext } from "react-hook-form";
import { FormDataArticle } from "./ReceiptAddProduct";
import { useReceiptContext } from "../../context/NewReceiptContext";
import { ReceiptFormData } from "./NewReceiptPage";
import { IconTrashCan } from "../icons/TrashCan";

interface Props {
  onRemoveArticle: Function;
  article: FormDataArticle;
  currency: string | undefined;
}

function ReceiptProduct({ article, onRemoveArticle, currency }: Props) {
  const { categories } = useReceiptContext();
  const category = categories.find(
    (category) => category.id === article.category,
  )!;
  const formMethods = useFormContext<ReceiptFormData>();
  function removeHandler() {
    onRemoveArticle(article.uuid);
  }

  const options = categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));

  const articles = formMethods.watch("articles");
  const thisArticle = articles.find((art) => art.uuid === article.uuid);
  const selectedOption = options.find(
    (opt) => parseInt(opt.value) === thisArticle?.category,
  )!;

  const articleIdx = articles.indexOf(thisArticle!);

  return (
    <tr>
      <td className={classNames("px-[3px] py-[1px]")}>{article.name}</td>
      <td className={classNames("px-[3px] py-[1px]")}>
        <span>{category?.name}</span>
        <Select
          options={options}
          onChange={(option) => {
            formMethods.setValue(
              `articles.${articleIdx}.category`,
              Number(option?.value),
            );
          }}
          value={selectedOption}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            control(base) {
              return {
                ...base,
                minHeight: "unset",
                borderRadius: "unset",
                // borderColor: errors[name] ? "f00" : "#90c3d0",
              };
            },
            valueContainer(base) {
              return { ...base, padding: "0" };
            },
            input(base) {
              return { ...base, margin: "0" };
            },
            dropdownIndicator(base) {
              return { ...base, padding: "0" };
            },
            placeholder(base) {
              return { ...base, fontStyle: "italic", color: "#90c3d0" };
            },
            option(base) {
              return { ...base, color: "#1a4e5b" };
            },
            singleValue(base) {
              return { ...base, color: "#1a4e5b" };
            },
          }}
          classNames={{
            control() {
              return "border-[#ff0000] min-w-[256px]";
            },
          }}
        />
      </td>
      <td className={classNames("px-[3px] py-[1px]")}>
        {article.price.toFixed(2)} {currency}
      </td>
      <td className={classNames("px-[3px] py-[1px]")}>
        {article.amount.toFixed(3)}
      </td>
      <td className={classNames("px-[3px] py-[1px]")}>
        {(article.price * article.amount).toFixed(2)} {currency}
      </td>
      <td onClick={removeHandler} className={classNames("px-[3px] py-[1px]")}>
        <div className={classNames("flex justify-center items-center")}>
          <span
            className={classNames(
              "p-1",
              "transition-colors cursor-pointer rounded-[50%]",
              "hover:bg-[#90c3d0] hover:text-[grey]",
            )}
          >
            <IconTrashCan className={classNames("w-[14px]")} />
          </span>
        </div>
      </td>
    </tr>
  );
}

export default ReceiptProduct;

// TODO: work on styling the table
