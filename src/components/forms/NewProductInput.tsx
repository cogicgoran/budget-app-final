import classNames from "classnames";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
}

function NewProductInput({ name, label }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={classNames(
        "grid items-center grid-cols-[16ch_1fr] gap-y-[2ch]",
        "mb-0.5",
      )}
    >
      <label
        htmlFor={name}
        className={classNames({
          "text-[red]": errors[name],
        })}
      >
        {label}:
      </label>
      <input
        {...register(name)}
        id={name}
        placeholder={label}
        className={classNames(
          "p-0.5",
          "border-solid border-[#90c3d0] border-[1px]",
          "focus:outline-[#90c3d0]",
          {
            "border-[red]": errors[name],
          },
        )}
      />
    </div>
  );
}

export default NewProductInput;
