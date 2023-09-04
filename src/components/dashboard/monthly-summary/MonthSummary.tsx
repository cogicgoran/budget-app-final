import styles from "./monthlySummary.module.scss";
import { Trans } from "react-i18next";
import { useMonthlyReport } from "../../../hooks/useMonthlyReport";
import { formatCurrencyNumberText } from "../../receipt/Receipt";
import CategoryReceipt from "./CategoryReceipt";

function MonthSummary() {
  const { monthlyReport, isLoading } = useMonthlyReport();

  const textCurrentMonth = (
    <Trans components={{ br: <br /> }}>currentMonth</Trans>
  );

  return (
    <div className={styles.dashboardCurrentMonth}>
      <div className={styles.dashboardCurrentMonthHeader}>
        <span>{textCurrentMonth}</span>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && monthlyReport !== undefined && (
        <>
          <div className={styles.dashboardCurrentMonthTotal}>
            <span>
              {formatCurrencyNumberText(
                monthlyReport.total,
                monthlyReport.currency,
              )}{" "}
              <br /> {monthlyReport.currency}
            </span>
          </div>
          <div className={styles.dashboardCurrentMonthCategories}>
            {monthlyReport.perCategory.length > 0
              ? monthlyReport.perCategory.map((categoryData: any) => {
                  return (
                    <CategoryReceipt
                      key={categoryData.category.id}
                      categoryName={categoryData.category.name}
                      categoryTotal={categoryData.total}
                      categoryMainColor={categoryData.category.color}
                      categoryIcon={categoryData.category.icon}
                    />
                  );
                })
              : "No data"}
          </div>
        </>
      )}
    </div>
  );
}

export default MonthSummary;
