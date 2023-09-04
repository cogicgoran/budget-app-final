import { useTranslation } from "react-i18next";
import { PATHS } from "../../../utils/constants";
import {
  getColorSchemeByMainColor,
  getIconByName,
} from "../../../utils/common";
import cn from "classnames";
import { Link } from "react-router-dom";
import CategoryShowcase from "../../category/CategoryShowcase";

interface Props {
  categories: any[];
  isLoading: boolean;
}

function DashboardCategories({ categories, isLoading }: Props) {
  const { t } = useTranslation();
  const textCategories = t("categories");
  const textSeeMore = t("seeMore");

  return (
    <div className={cn("min-h-[100px] px-4 py-6 bg-white")}>
      <h2
        className={cn(
          "m-0 mb-2 py-0 px-4 text-base font-normal text-[#0a1f24] uppercase",
        )}
      >
        {textCategories}
      </h2>
      <div className={cn("flex gap-x-8 justify-start")}>
        {!isLoading &&
          categories.map((category) => {
            return (
              <CategoryShowcase
                key={category.id}
                colorScheme={getColorSchemeByMainColor(category.color)!}
                icon={getIconByName(category.icon!)?.icon!}
                name={category.name}
                isDashboard
                className={cn("my-0 mx-0")}
              />
            );
          })}
        <Link to={PATHS.CATEGORIES}>
          <button>{textSeeMore}</button>
        </Link>
        {isLoading && "Loading..."}
      </div>
    </div>
  );
}

export default DashboardCategories;
