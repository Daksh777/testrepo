import { Navigate, Route, Routes } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import ProtectedRoute from "./layouts/ProtectedRoute";
import SearchMain from "./components/Search/SearchMain";
import ReferenceLocation from "./components/ReferenceLocation/ReferenceLocation";
import Preference from "./components/Preference/Preference";
import ResultsMain from "./components/Results/ResultsMain";
import Compare from "./components/Compare/Compare";
import { SearchArea } from "./components/SearchArea/SearchArea";
import Saved from "./components/Saved/Saved";
import { Toaster } from "sonner";
import ReactQueryProvider from "./shared/QueryProvider";
import Liked from "./components/Liked/Liked";
import SampleReportMain from "./components/SampleReport/SampleReportMain";
import SavedDetail from "./components/SavedDetail/SavedDetail";
import UserMain from "./pages/User/UserMain";
import { lazy, Suspense } from "react";
import HomeMain from "./pages/Home/HomeMain";
const AdminMain = lazy(() => import("./pages/Admin/AdminMain"));
const ForgotPasswordSet = lazy(
  () => import("./pages/ForgotPasswordSet/ForgotPasswordSet")
);
const ReportPdfMain = lazy(() => import("./pages/ReportPdf/ReportPdfMain"));
const PaymentSuccessfull = lazy(
  () => import("./pages/PaymentSuccessfull/PaymentSuccessfull")
);

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <div className="font-inter">
      <Toaster richColors />

      <ReactQueryProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/reference-location"
                element={<ReferenceLocation />}
              />
              <Route path="/preferences" element={<Preference />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/results" element={<ResultsMain />} />
              <Route path="/search-area" element={<SearchArea />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/saved/:id" element={<SavedDetail />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/overview/:id" element={<SampleReportMain />} />
              <Route path="/user/*" element={<UserMain />} />
            </Route>
            <Route path="/search" element={<SearchMain />} />
            <Route
              path="/report/view/:report_id"
              element={
                <Suspense>
                  <ReportPdfMain />
                </Suspense>
              }
            />
            <Route
              path="/payment-success"
              element={
                <Suspense>
                  <PaymentSuccessfull />
                </Suspense>
              }
            />
            <Route
              path="/reset-password"
              element={
                <Suspense>
                  <ForgotPasswordSet />
                </Suspense>
              }
            />
            <Route
              path="/admin/*"
              element={
                <Suspense>
                  <AdminMain />
                </Suspense>
              }
            />
            <Route path="/" element={<HomeMain />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GoogleOAuthProvider>
      </ReactQueryProvider>
    </div>
  );
}

export default App;
