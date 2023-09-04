import React, { useEffect, useRef } from "react";
import BigLoader from "../BigLoader";
import classNames from "classnames";

interface Props {
  showLoader: boolean;
  onLoaderHidden: () => void;
}

function PageLoader({ showLoader, onLoaderHidden }: Props) {
  const pageLoaderElement = useRef<HTMLDivElement>(null);
  const pageLoaderInnerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showLoader) {
      pageLoaderElement.current?.classList.add("opacity-0");
      setTimeout(() => {
        pageLoaderElement.current?.classList.add("hidden");
        onLoaderHidden();
      }, 500);
    }
  }, [showLoader]);

  return (
    <div
      ref={pageLoaderElement}
      className={classNames(
        "flex justify-center items-center w-[100vw] h-[100vh] bg-[#e0f9ff]",
        "absolute z-10",
        "transition-opacity duration-500 ease-out",
      )}
    >
      <div
        ref={pageLoaderInnerElement}
        className={classNames(
          "flex justify-center items-center flex-col gap-4",
        )}
      >
        Initializing app
        <BigLoader />
      </div>
    </div>
  );
}

export default PageLoader;
