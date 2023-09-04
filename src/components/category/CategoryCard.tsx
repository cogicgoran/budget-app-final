import classNames from "classnames";
import { getColorSchemeByMainColor } from "../../utils/common";
import styles from "./categoryCard.module.scss";

interface Props {
  category: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
}

function CategoryCard({ category }: Props) {
  return (
    <div>
      <span
        style={{
          backgroundColor: category.color,
          borderColor: getColorSchemeByMainColor(category.color)?.borderColor,
        }}
        className={classNames(styles.categorySmall, "uppercase")}
      >
        {category.name}
      </span>
    </div>
  );
}

export default CategoryCard;
