import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import PageLoader from "./components/UI/loader/full-page-loader/PageLoader";
import AppLayout from "./components/UI/layout/AppLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { router } from "./router";
import "./styles/globals.scss";
import "./styles/fonts.scss";
import "./styles/swiper.scss";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import DashboardPage from "./components/dashboard/DashboardPage";
import AuthenticationPage from "./components/auth/AuthenticationPage";
import { PATHS } from "./utils/constants";
import NewReceiptPage from "./components/new-receipt-page/NewReceiptPage";
import ViewReceiptsPage from "./components/view-receipts/ViewReceiptsPage";
import MarketplacePage from "./components/marketplaces/MarketplacesPage";
import CategoryPage from "./components/category/CategoriesPage";

function App() {
  const [user, loading, error] = useAuthState(firebaseAuthService);
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [showApp, setShowApp] = useState(false);
  // const navigate = useNavigate()

  useEffect(() => {
    if (!showApp) return;
    if (!user) router.navigate("/auth");
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setIsAppInitialized(true);
    }, 1250);
  }, []);

  async function handleLoaderHiding() {
    if (!user) {
      await router.navigate("/auth");
    }
    setShowApp(true);
  }

  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer position="bottom-right" autoClose={3000} />
        {!showApp && (
          <PageLoader
            showLoader={!isAppInitialized || loading}
            onLoaderHidden={handleLoaderHiding}
          />
        )}
        {showApp && (
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={AppLayout}>
                <Route path={PATHS.AUTH} Component={AuthenticationPage} />
                <Route path={PATHS.DASHBOARD} Component={DashboardPage} />
                <Route path={PATHS.NEW_RECEIPTS} Component={NewReceiptPage} />
                <Route
                  path={PATHS.VIEW_RECEIPTS}
                  Component={ViewReceiptsPage}
                />
                <Route path={PATHS.MARKETPLACES} Component={MarketplacePage} />
                <Route path={PATHS.CATEGORIES} Component={CategoryPage} />
                <Route path="/edit-receipt/*" Component={NewReceiptPage} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </LocalizationProvider>
    </>
  );
}

export default App;
