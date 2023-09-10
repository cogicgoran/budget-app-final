import React, { ReactNode, useState } from "react";
import styles from "./addCategory.module.scss";
import { ColorScheme } from "../../utils/common";
import cn from "classnames";
import { Tooltip } from "react-tooltip";

interface Props {
  colorScheme: ColorScheme;
  icon: () => ReactNode;
  name: string;
  readonly?: boolean;
  onChange?: any;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onShowcaseClick?: any;
  showcasePlaceholder?: string;
  isSliderOverlay?: boolean;
  isDashboard?: boolean;
  className?: string;
}

function CategoryShowcase({
  colorScheme,
  icon,
  name,
  readonly = true,
  onChange,
  onClick,
  onShowcaseClick,
  showcasePlaceholder,
  isSliderOverlay = false,
  isDashboard = false,
  className,
}: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleHoverOver() {
    setIsTooltipOpen(true);
  }

  function handleHoverLeave() {
    setIsTooltipOpen(false);
  }

  return (
    <div
      style={{ borderColor: colorScheme.borderColor }}
      className={cn(
        "border-2 border-solid rounded-t-2xl",
        "my-[12px] mx-0",
        { "absolute top-2 left-1/2 translate-x-[-50%]": isSliderOverlay },
        {
          "w-[72px]": isDashboard,
          "w-[100px]": !isDashboard,
        },
        className,
      )}
      onClick={onShowcaseClick}
    >
      <div
        style={{ color: colorScheme.color }}
        className={cn(
          "flex justify-center items-center",
          styles.categoryShowcaseImage,
          {
            "h-[48px]": isDashboard,
            "h-[80px]": !isDashboard,
            [styles.categoryShowcaseImageDashboard]: isDashboard,
          },
        )}
      >
        {icon()}
      </div>
      <input
        className={cn(
          "block w-full border-0 border-t-2 border-solid",
          "text-center uppercase text-ellipsis whitespace-nowrap",
          "text-white",
          "focus:outline-0",
          {
            "text-[11px]": isDashboard,
            "text-[14px]": !isDashboard,
          },
        )}
        style={{
          backgroundColor: colorScheme.color,
          borderColor: colorScheme.borderColor,
        }}
        type="text"
        placeholder={!readonly ? showcasePlaceholder : ""}
        value={name}
        disabled={readonly}
        onClick={onClick}
        onChange={onChange}
        id={name}
        data-tooltip-content={name}
        onMouseOver={handleHoverOver}
        onMouseLeave={handleHoverLeave}
      />
      <Tooltip anchorId={name} isOpen={isTooltipOpen} />
    </div>
  );
}

export default CategoryShowcase;
