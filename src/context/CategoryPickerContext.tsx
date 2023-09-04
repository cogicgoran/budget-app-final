import { createContext, useContext } from "react";
import { ColorScheme } from "../utils/common";

export function useCategoryPickerContext() {
  const context = useContext(CategoryPickerContext);
  if (context === undefined)
    throw new Error(
      "useContext must be used withing corresponding context provider",
    );
  return context as ICategoryPickerContext;
}

export interface ICategoryPickerContext {
  colorScheme: ColorScheme;
  setColorScheme: React.Dispatch<
    React.SetStateAction<{
      color: string;
      borderColor: string;
    }>
  >;
  iconData: {
    name: string;
    icon: () => JSX.Element;
  };
  setIconData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      icon: () => JSX.Element;
    }>
  >;
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  showIconPicker: boolean;
  setShowIconPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryPickerContext = createContext<ICategoryPickerContext | {}>(
  {},
);
