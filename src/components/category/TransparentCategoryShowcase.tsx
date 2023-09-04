import { useCategoryPickerContext } from "../../context/CategoryPickerContext";
import styles from "./addCategory.module.scss";

function TransparentCategoryShowcase() {
  const { colorScheme, categoryName, setShowIconPicker } =
    useCategoryPickerContext();

  return (
    <div
      style={{ borderColor: colorScheme.borderColor }}
      className={styles.categoryShowcaseTransparent}
      onClick={() => setShowIconPicker((prevState) => !prevState)}
    >
      <div
        style={{ color: colorScheme.color }}
        className={styles.categoryShowcaseImage}
      ></div>
      <div
        style={{
          backgroundColor: colorScheme.color,
          borderColor: colorScheme.borderColor,
        }}
        className={styles.categoryShowcaseName}
      >
        <input
          className={styles.categoryShowcaseInput}
          value={categoryName}
          disabled
        />
        {categoryName && <p className={styles.tooltipText}>{categoryName}</p>}
      </div>
    </div>
  );
}

export default TransparentCategoryShowcase;
