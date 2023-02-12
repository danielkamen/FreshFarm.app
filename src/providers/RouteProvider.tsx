import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SearchBar from "../components/Navigation";
import ProductPage from "../pages/ProductPage";
//import VerifyFarmer from '../pages/VerifyFarmer'
import ViewProductPage from "../pages/ViewProductPage";
import CartPage from "../pages/CartPage";
import LeaveReviewPage from "../pages/LeaveReviewPage";
import EditProductPage from "../pages/EditProductPage";
import MeetFarmersPage from "../pages/MeetFarmersPage";
import FarmerInfoPage from "../pages/FarmerInfoPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
// VERIFYFARMER,
import {
  HOME,
  LOGIN,
  SIGNUP,
  PRODUCTPAGE,
  VIEWPRODUCTPAGE,
  CARTPAGE,
  LEAVEREVIEWPAGE,
  EDITPRODUCTPAGE,
  MEETFARMERSPAGE,
  PROFILE,
} from "../constants/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";

export const RouteProvider = () => {
  const { user } = useUserContext();
  const isLoaded = user !== undefined;

  return (
    <>
      {isLoaded ? (
        <Router>
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={SIGNUP} element={<SignupPage />} />
            <Route path={PRODUCTPAGE} element={<ProductPage />} />
            <Route path={EDITPRODUCTPAGE} element={<EditProductPage />} />
            <Route path={VIEWPRODUCTPAGE} element={<ViewProductPage />} />
            <Route path={CARTPAGE} element={<CartPage />} />
            <Route path={LEAVEREVIEWPAGE} element={<LeaveReviewPage />} />
            <Route path={MEETFARMERSPAGE} element={<MeetFarmersPage />} />
            <Route path={PROFILE} element={<ProfilePage />} />
          </Routes>
        </Router>
      ) : null}
    </>
  );
};
