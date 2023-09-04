import { useState } from "react";
import { toast } from "react-toastify";
import { categoryColors, categoryIconsData } from "../../utils/common";
import styles from "./addCategory.module.scss";
import CategoryColorPicker from "./CategoryColorPicker";
import CategoryIconPicker from "./CategoryIconPicker";
import { createCategory } from "../../utils/api/category";
import {
  CategoryPickerContext,
  ICategoryPickerContext,
} from "../../context/CategoryPickerContext";
import { createCategoryPayload } from "../../utils/function/category";
import { getResponseErrorMessage } from "../../utils/function/common";

interface Props {
  onCancel: any;
  onAddCategory: any;
}

const DEFAULT_COLOR_SCHEME = categoryColors[0];
const DEFAULT_ICON_INDEX = categoryIconsData[0];

function AddCategory({ onCancel, onAddCategory }: Props) {
  const [colorScheme, setColorScheme] = useState(DEFAULT_COLOR_SCHEME);
  const [iconData, setIconData] = useState(DEFAULT_ICON_INDEX);
  const [categoryName, setCategoryName] = useState("");
  const [showIconPicker, setShowIconPicker] = useState(false);

  const contextValue: ICategoryPickerContext = {
    colorScheme,
    setColorScheme,
    iconData,
    setIconData,
    categoryName,
    setCategoryName,
    showIconPicker,
    setShowIconPicker,
  };

  async function addCategory() {
    try {
      if (!categoryName.trim()) throw new Error("Missing category name");
      const payload = createCategoryPayload({
        color: colorScheme.color,
        icon: iconData.name,
        name: categoryName,
      });
      const result = await createCategory(payload);
      onAddCategory(result);
      toast.success("Category created");
      onCancel();
    } catch (error) {
      toast.error(getResponseErrorMessage(error));
      console.error(error);
    }
  }

  return (
    <div className={styles.addCategoryContainer}>
      <CategoryPickerContext.Provider value={contextValue}>
        <CategoryColorPicker onCancel={onCancel} onSubmit={addCategory} />
        {showIconPicker && <CategoryIconPicker onCancel={onCancel} />}
      </CategoryPickerContext.Provider>
    </div>
  );
}

export default AddCategory;
