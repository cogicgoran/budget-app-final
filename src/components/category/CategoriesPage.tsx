import styles from "./categories.module.scss";
import { useTranslation } from "react-i18next";
import { getColorSchemeByMainColor, getIconByName } from "../../utils/common";
import { useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../components/UI/backdrop/Backdrop";
import AddCategory from "../../components/category/AddCategory";
import { useCategories } from "../../hooks/useCategories";
import CategoryShowcase from "../../components/category/CategoryShowcase";
import { IconCirclePlus } from "../icons/CirclePlus";

const CategoryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const textCategories = t("categories");
  const { categories, appendCategory } = useCategories();

  function addCategoryListener(category: any) {
    appendCategory(category);
  }

  return (
    <div className={styles.categories}>
      <h2>{textCategories}</h2>
      <div className={styles.categoryContainer}>
        {categories &&
          categories.map((category) => {
            const colorScheme = getColorSchemeByMainColor(category.color)!;
            const icon = getIconByName(category.icon)!.icon;
            return (
              <CategoryShowcase
                key={category.id}
                colorScheme={colorScheme}
                icon={icon}
                name={category.name}
              />
            );
          })}
      </div>
      <div className={styles.categoryAddBtn} onClick={() => setShowModal(true)}>
        <IconCirclePlus />
      </div>
      {showModal &&
        createPortal(
          <AddCategory
            onAddCategory={addCategoryListener}
            onCancel={() => setShowModal(false)}
          />,
          document.getElementById("overlay-root")!,
        )}
      {showModal &&
        createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")!,
        )}
    </div>
  );
};

export default CategoryPage;
