import classNames from "classnames";
import Language from "../../language/Language";
import Header from "../../header/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div
      className={classNames(
        "w-[100vw] min-h-[100vh] bg-[#e0f9ff] border-solid border-2 border-[#90c3d0] max-w-4xl m-auto",
      )}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
