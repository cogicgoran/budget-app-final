import CategoryPill from "../../UI/category-pill/CategoryPill";
import styles from "./monthlySummary.module.scss";
import { formatCurrencyNumberText } from "../../receipt/Receipt";

interface Props {
  categoryName: string;
  categoryTotal: number;
  categoryMainColor: string;
  categoryIcon: string;
}

function CategoryReceipt({
  categoryName,
  categoryTotal,
  categoryMainColor,
  categoryIcon,
}: Props) {
  return (
    <div className={styles["dashboardCurrentMonthCategory"]}>
      <CategoryPill iconName={categoryIcon} mainColor={categoryMainColor}>
        {categoryName}
      </CategoryPill>
      <span className="text-[#660000]">
        {formatCurrencyNumberText(categoryTotal, "RSD")} RSD
      </span>
    </div>
  );
}

export default CategoryReceipt;
