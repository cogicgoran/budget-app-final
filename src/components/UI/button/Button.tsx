import cn from "classnames";
import { ReactNode, forwardRef } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  actionType: "success" | "info" | "fail" | "create";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, actionType, ...props }, ref) => {
    const isSuccessType = actionType === "success";
    const isInfoType = actionType === "info";
    const isFailType = actionType === "fail";
    const isCreateType = actionType === "create";

    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "border-1 border-solid rounded-xl",
          "px-4 py-[1px]",
          "text-xss uppercase",
          {
            "text-white bg-success-primary border-success-secondary ":
              isSuccessType,
            "text-white bg-info-primary border-info-secondary": isInfoType,
            "text-black bg-fail-primary border-fail-secondary": isFailType,
            "text-create-secondary bg-create-primary border-create-secondary":
              isCreateType,
          },
        )}
      >
        {children}
      </button>
    );
  },
);

export default Button;
