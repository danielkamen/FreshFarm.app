import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import ProducePage from "../pages/ProducePage";
import ViewProducePage from "../pages/ViewProducePage";
import CartPage from "../pages/CartPage";
import LeaveReviewPage from "../pages/LeaveReviewPage";
import EditProducePage from "../pages/EditProducePage";
import MeetFarmersPage from "../pages/MeetFarmersPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import {
  HOME,
  LOGIN,
  SIGNUP,
  PRODUCEPAGE,
  VIEWPRODUCEPAGE,
  CARTPAGE,
  LEAVEREVIEWPAGE,
  EDITPRODUCEPAGE,
  MEETFARMERSPAGE,
  PROFILE,
  SEARCHRESULTPAGE,
} from "../constants/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";
import SearchResultPage from "../pages/SearchResultPage";
import NotFoundPage from "../pages/NotFoundPage";

export const RouteProvider = () => {
  const { user } = useUserContext();
  const isLoaded = user !== undefined;

  return (
    <>
      {isLoaded ? (
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path={HOME} element={<HomePage />} />
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={SIGNUP} element={<SignupPage />} />
            <Route path={PRODUCEPAGE} element={<ProducePage />} />
            <Route path={EDITPRODUCEPAGE} element={<EditProducePage />} />
            <Route path={VIEWPRODUCEPAGE} element={<ViewProducePage />} />
            <Route path={CARTPAGE} element={<CartPage />} />
            <Route path={LEAVEREVIEWPAGE} element={<LeaveReviewPage />} />
            <Route path={MEETFARMERSPAGE} element={<MeetFarmersPage />} />
            {/* <Route path={VIEWFARMERPAGE} element={<ViewFarmerPage />} /> */}
            <Route path={PROFILE} element={<ProfilePage />} />
            <Route path={SEARCHRESULTPAGE} element={<SearchResultPage />} />
          </Routes>
        </Router>
      ) : null}
    </>
  );
};
