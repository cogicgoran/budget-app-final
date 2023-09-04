import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./addCategory.module.scss";
import { categoryIconsData, getIconByName } from "../../utils/common";
import classNames from "classnames";
import TransparentCategoryShowcase from "./TransparentCategoryShowcase";
import { NextArrow, PrevArrow } from "./CategoryColorPicker";
import { flushSync } from "react-dom";
import type SwiperClass from "swiper";
import CategoryShowcase from "./CategoryShowcase";
import { useCategoryPickerContext } from "../../context/CategoryPickerContext";

interface Props {
  onCancel: any;
}

function CategoryIconPicker({ onCancel }: Props) {
  const { iconData, setIconData, colorScheme, categoryName } =
    useCategoryPickerContext();
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperClass | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  function updateIcon(newIndex: number) {
    flushSync(() => {
      setIconData((prevState) => {
        const newIconData = categoryIconsData[newIndex];
        if (prevState.name === newIconData.name) return prevState;
        return { ...newIconData };
      });
    });
  }

  function onInit(swiper: SwiperClass) {
    swiperInstanceRef.current = swiper;
  }

  function handleProgress(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newIndex = swiper.realIndex;

    if (newIndex == undefined) return;
    updateIcon(newIndex);
  }

  function handleTransitionStart(swiper: SwiperClass) {
    if (isFirstRenderRef.current) return;
    const newIndex = swiper.realIndex;
    updateIcon(newIndex);
  }

  return (
    <div className={classNames(styles.categoryColorSelect, "iconPicker")}>
      <div style={{ position: "relative" }}>
        <Swiper
          ref={swiperRef as any}
          slidesPerView={7}
          grabCursor
          centeredSlides
          loop={true}
          onInit={onInit}
          onSlideChangeTransitionStart={handleTransitionStart}
          loopedSlides={categoryIconsData.length}
          className={styles.swiperIconWrapper}
          watchSlidesProgress
          onProgress={handleProgress}
        >
          {categoryIconsData.map((iconData) => (
            <SwiperSlide
              key={iconData.name}
              className={styles.iconPickerSlide}
              style={{ color: colorScheme.color }}
            >
              {iconData.icon()}
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={classNames(styles.sliderIconPrev, styles.sliderIconArrow)}
          ref={prevRef}
          onClick={() => {
            swiperInstanceRef.current!.slidePrev();
          }}
        >
          <PrevArrow />
        </div>
        <div
          className={classNames(styles.sliderIconNext, styles.sliderIconArrow)}
          ref={nextRef}
          onClick={() => {
            swiperInstanceRef.current!.slideNext();
          }}
        >
          <NextArrow />
        </div>
        <CategoryShowcase
          colorScheme={colorScheme}
          icon={() => null}
          name={categoryName}
          isSliderOverlay={true}
        />
      </div>
    </div>
  );
}

export default CategoryIconPicker;
