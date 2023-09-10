import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { categoryColors, ColorScheme } from "../../utils/common";
import { IconChevronLeft } from "../icons/ChevronLeft";
import { IconChevronRight } from "../icons/ChevronRight";
import styles from "./addCategory.module.scss";
import CategoryShowcase from "./CategoryShowcase";
import type SwiperClass from "swiper";
import { flushSync } from "react-dom";
import classNames from "classnames";
import { useCategoryPickerContext } from "../../context/CategoryPickerContext";

interface Props {
  onCancel: any;
  onSubmit: any;
}

function CategoryColorPicker({ onCancel, onSubmit }: Props) {
  const {
    showIconPicker,
    setShowIconPicker,
    setIconData,
    setCategoryName,
    iconData,
    categoryName,
    colorScheme,
    setColorScheme,
  } = useCategoryPickerContext();
  const { t } = useTranslation();
  const textAdd = t("add");
  const textAddCategory = t("addCategory");
  const textCancel = t("cancel");
  const textTypeHere = t("typeHere");
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperClass | null>(null);
  const isFirstRenderRef = useRef(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  function onInit(swiper: SwiperClass) {
    swiperInstanceRef.current = swiper;
  }

  function updateColors(newColorScheme: ColorScheme) {
    flushSync(() => {
      setColorScheme((prevState) => {
        if (newColorScheme.color === prevState.color) return prevState;
        return newColorScheme;
      });
    });
  }

  function handleProgress(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;

    const newIndex = swiper.realIndex;
    if (newIndex == undefined) return;

    const newColorScheme = { ...categoryColors[newIndex] };
    updateColors(newColorScheme);
  }

  function handleTransitionStart(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newColorScheme = { ...categoryColors[swiper.realIndex] };
    updateColors(newColorScheme);
  }

  return (
    <div className={classNames(styles.categoryColorSelect, "colorPicker")}>
      <h3 className={styles.addCategoryTitle}>{textAddCategory}</h3>
      <div className="flex justify-center">
        <CategoryShowcase
          colorScheme={colorScheme}
          icon={iconData.icon}
          name={categoryName}
          onShowcaseClick={() => setShowIconPicker((prevState) => !prevState)}
          onClick={(e: any) => e.stopPropagation()}
          onChange={(e: any) => setCategoryName(e.target.value)}
          readonly={false}
          showcasePlaceholder={textTypeHere}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Swiper
          ref={swiperRef as any}
          slidesPerView={9}
          grabCursor
          centeredSlides
          loop={true}
          onInit={onInit}
          onSlideChangeTransitionStart={handleTransitionStart}
          loopedSlides={categoryColors.length}
          className={styles.swiperColorWraper}
          watchSlidesProgress
          onProgress={handleProgress}
          style={{ padding: "2px 0" }}
        >
          {categoryColors.map((colorScheme) => (
            <SwiperSlide
              key={colorScheme.color}
              className={styles.colorPickerItem}
              style={{
                backgroundColor: colorScheme.color,
                outlineColor: colorScheme.borderColor,
              }}
            />
          ))}
        </Swiper>
        <div
          className={classNames(
            styles.sliderColorPrev,
            styles.sliderColorArrow,
          )}
          ref={prevRef}
          onClick={() => {
            swiperInstanceRef.current!.slidePrev();
          }}
        >
          <PrevArrow />
        </div>
        <div
          className={classNames(
            styles.sliderColorNext,
            styles.sliderColorArrow,
          )}
          ref={nextRef}
          onClick={() => {
            swiperInstanceRef.current!.slideNext();
          }}
        >
          <NextArrow />
        </div>
      </div>

      <div className={styles.addCategoryControls}>
        <button className={styles.addCategoryCancel} onClick={onCancel}>
          {textCancel}
        </button>
        <button className={styles.addCategoryConfirm} onClick={onSubmit}>
          {textAdd}
        </button>
      </div>
    </div>
  );
}

export function NextArrow({ onClick }: { onClick?: any }) {
  return (
    <span onClick={onClick}>
      <IconChevronRight />
    </span>
  );
}

export function PrevArrow({ onClick }: { onClick?: any }) {
  return (
    <span onClick={onClick}>
      <IconChevronLeft />
    </span>
  );
}

export default CategoryColorPicker;
