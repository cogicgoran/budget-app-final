import classNames from "classnames";
import {
  getColorSchemeByMainColor,
  getIconByName,
} from "../../../utils/common";
import styles from "./categoryPill.module.scss";

interface Props {
  children: string;
  iconName: string;
  mainColor: string;
}

function CategoryPill({ children, iconName, mainColor }: Props) {
  return (
    <span
      style={{
        backgroundColor: getColorSchemeByMainColor(mainColor)?.color,
        borderColor: getColorSchemeByMainColor(mainColor)?.borderColor,
      }}
      className={classNames(
        styles.categoryPill,
        "text-[12px] text-white bg-neutral-900 uppercase",
        "px-2 py-0",
        "border-solid border-[1px] rounded-xl",
        "w-min flex items-center gap-x-2",
      )}
    >
      {getIconByName(iconName)?.icon()}
      <span className="max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}

export default CategoryPill;
