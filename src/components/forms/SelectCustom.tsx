import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import Select, { components, ValueContainerProps } from "react-select";
import { AddArticleFormValues } from "../pages/new-receipt/ReceiptAddProduct";

interface Option {
  label: string;
  value: number;
}

interface Props {
  name: keyof AddArticleFormValues;
  options: any[];
}

function SelectCustom({ name, options }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<AddArticleFormValues>();
  const value = watch(name);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Select<Option>
      {...register(name)}
      options={options}
      onChange={(option) => {
        setValue(name, option ? option.value : null, {
          shouldValidate: true,
        });
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
            borderColor: errors[name] ? "f00" : "#90c3d0",
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
  );
}

export default SelectCustom;
