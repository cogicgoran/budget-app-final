import { IconApple } from "../components/icons/Apple";
import { IconBaby } from "../components/icons/Baby";
import { IconBabyCarriage } from "../components/icons/BabyCarriage";
import { IconBook } from "../components/icons/Book";
import { IconCar } from "../components/icons/Car";
import { IconCarrot } from "../components/icons/Carrot";
import { IconCart } from "../components/icons/Cart";
import { IconCat } from "../components/icons/Cat";
import { IconCocktail } from "../components/icons/Cocktail";
import { IconFootball } from "../components/icons/Football";
import { IconHandegg } from "../components/icons/Handegg";
import { IconHeadphone } from "../components/icons/Headphone";
import { IconHeart } from "../components/icons/Heart";
import { IconHouse } from "../components/icons/House";
import { IconIceCream } from "../components/icons/IceCream";
import { IconLemon } from "../components/icons/Lemon";
import { IconMask } from "../components/icons/Mask";
import { IconMedkit } from "../components/icons/Medkit";
import { IconPaw } from "../components/icons/Paw";
import { IconTV } from "../components/icons/TV";

// const categoryStyleSheet: any = {
//   food: {
//     category: "UNKNOWN",
//     icon: IconApple,
//     color: "#EB6383",
//     border: "#CB4363",
//     textColor: "#FFFFFF",
//   },
//   kids: {
//     category: "UNKNOWN",
//     icon: IconBaby,
//     color: "#FA9191",
//     border: "#DA7171",
//     textColor: "#FFFFFF",
//   },
//   3: {
//     category: "UNKNOWN",
//     icon: IconBabyCarriage,
//     color: "#FFE9C5",
//     border: "#DFC9A5",
//     textColor: "#000000",
//   },
//   4: {
//     category: "UNKNOWN",
//     icon: IconBook,
//     color: "#B4F2E1",
//     border: "#94D2C1",
//     textColor: "#000000",
//   },
//   5: {
//     category: "UNKNOWN",
//     icon: IconCarrot,
//     color: "#E7B2A5",
//     border: "#C79285",
//     textColor: "#000000",
//   },
//   gas: {
//     category: "UNKNOWN",
//     icon: IconCar,
//     color: "#F1935C",
//     border: "#D1733C",
//     textColor: "#222222",
//   },
//   7: {
//     category: "UNKNOWN",
//     icon: IconCat,
//     color: "#BA6B57",
//     border: "#9A4B37",
//     textColor: "#222222",
//   },
//   8: {
//     category: "UNKNOWN",
//     icon: IconCocktail,
//     color: "#30475E",
//     border: "#10273E",
//     textColor: "#222222",
//   },
//   9: {
//     category: "UNKNOWN",
//     icon: IconFootball,
//     color: "#EEF9BF",
//     border: "#CED99F",
//     textColor: "#222222",
//   },
//   10: {
//     category: "UNKNOWN",
//     icon: IconMask,
//     color: "#A7E9AF",
//     border: "#87C98F",
//     textColor: "#222222",
//   },
//   11: {
//     category: "FOOD",
//     icon: IconHeadphone,
//     color: "#75B79E",
//     border: "#55977E",
//     textColor: "#FFFFFF",
//   },
//   12: {
//     category: "GAS",
//     icon: IconHeart,
//     color: "#6A8CAF",
//     border: "#4A6C8F",
//     textColor: "#FFFFFF",
//   },
//   13: {
//     category: "SHOPPING",
//     icon: IconHouse,
//     color: "#85603F",
//     border: "#65401F",
//     textColor: "#000000",
//   },
//   14: {
//     category: "HEALTH",
//     icon: IconIceCream,
//     color: "#9E7540",
//     border: "#7E5520",
//     textColor: "#000000",
//   },
//   15: {
//     category: "ICECREAM",
//     icon: IconLemon,
//     color: "#BD9354",
//     border: "#9D7334",
//     textColor: "#000000",
//   },
//   16: {
//     category: "UNKNOWN",
//     icon: IconMedkit,
//     color: "#E3D18A",
//     border: "#C3B16A",
//     textColor: "#222222",
//   },
//   17: {
//     category: "UNKNOWN",
//     icon: IconPaw,
//     color: "#F39189",
//     border: "#D37169",
//     textColor: "#222222",
//   },
//   18: {
//     category: "UNKNOWN",
//     icon: IconHandegg,
//     color: "#BB8082",
//     border: "#9B6062",
//     textColor: "#222222",
//   },
//   19: {
//     category: "UNKNOWN",
//     icon: IconCart,
//     color: "#6E7582",
//     border: "#4E5562",
//     textColor: "#222222",
//   },
//   20: {
//     category: "UNKNOWN",
//     icon: IconTV,
//     color: "#046582",
//     border: "#025572",
//     textColor: "#222222",
//   },
// };

export const categoryColors = [
  { color: "#EB6383", borderColor: "#CB4363" },
  { color: "#FFE9C5", borderColor: "#DFC9A5" },
  { color: "#FA9191", borderColor: "#DA7171" },
  { color: "#B4F2E1", borderColor: "#94D2B1" },
  { color: "#E7B2A5", borderColor: "#C79285" },
  { color: "#F1935C", borderColor: "#D1734C" },
  { color: "#BA6B57", borderColor: "#9A4B47" },
  { color: "#30475E", borderColor: "#20374E" },
  { color: "#EEF9BF", borderColor: "#BED99F" },
  { color: "#A7E9AF", borderColor: "#87C98F" },
  { color: "#75B79E", borderColor: "#55977E" },
  { color: "#6A8CAF", borderColor: "#5A6C8F" },
  { color: "#85603F", borderColor: "#65502F" },
  { color: "#9E7540", borderColor: "#7E5530" },
  { color: "#BD9354", borderColor: "#9D7344" },
  { color: "#E3D18A", borderColor: "#C3B16A" },
  { color: "#F39189", borderColor: "#D37169" },
  { color: "#BB8082", borderColor: "#9B6062" },
  { color: "#6E7582", borderColor: "#5E5562" },
  { color: "#046582", borderColor: "#005562" },
];

export const categoryIconsData = [
  { name: "apple", icon: IconApple },
  { name: "baby", icon: IconBaby },
  { name: "babyCarriage", icon: IconBabyCarriage },
  { name: "book", icon: IconBook },
  { name: "carrot", icon: IconCarrot },
  { name: "car", icon: IconCar },
  { name: "cat", icon: IconCat },
  { name: "cocktail", icon: IconCocktail },
  { name: "football", icon: IconFootball },
  { name: "mask", icon: IconMask },
  { name: "headphone", icon: IconHeadphone },
  { name: "heart", icon: IconHeart },
  { name: "iceCreat", icon: IconIceCream },
  { name: "lemon", icon: IconLemon },
  { name: "medkit", icon: IconMedkit },
  { name: "paw", icon: IconPaw },
  { name: "handegg", icon: IconHandegg },
  { name: "cart", icon: IconCart },
  { name: "tv", icon: IconTV },
];

const defaultColorScheme = categoryColors[0];
const defaultIcon = categoryIconsData[0];

export function getIconByName(iconName: string) {
  const iconData = categoryIconsData.find(
    (iconData) => iconData.name === iconName,
  );
  if (!iconData) return defaultIcon;
  return iconData;
}

export function getColorSchemeByMainColor(mainColor: string) {
  return (
    categoryColors.find((colorScheme) => colorScheme.color === mainColor) ??
    defaultColorScheme
  );
}

export type ColorScheme = (typeof categoryColors)[number];
// export default categoryStyleSheet;
