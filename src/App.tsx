import HomePage from "./pages/HomePage";
import SignupPage from './pages/SignupPage'
import SearchBar from './components/Navigation'
import ProductPage from './pages/ProductPage'
//import VerifyFarmer from './pages/VerifyFarmer'
import ViewProductPage from "./pages/ViewProductPage";
import CartPage from "./pages/CartPage";
import LeaveReviewPage from "./pages/LeaveReviewPage";
import EditProductPage from "./pages/EditProductPage";
import MeetFarmersPage from "./pages/MeetFarmersPage";
import FarmerInfoPage from "./pages/FarmerInfoPage";
import LoginPage from './pages/LoginPage';
// VERIFYFARMER,
import {HOME, LOGIN, SIGNUP, PRODUCTPAGE, VIEWPRODUCTPAGE, CARTPAGE, LEAVEREVIEWPAGE, EDITPRODUCTPAGE, MEETFARMERSPAGE} from './constants/routes'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <>
          <Routes>
            <Route path={HOME} element={<HomePage/>}/>
            <Route path={LOGIN} element={<LoginPage/>} />
            <Route path={SIGNUP} element={<SignupPage/>} />
            <Route path={PRODUCTPAGE} element={<ProductPage />} />
            <Route path={EDITPRODUCTPAGE} element={<EditProductPage />} />
            <Route path={VIEWPRODUCTPAGE} element={<ViewProductPage />} />
            <Route path={CARTPAGE} element={<CartPage />} />
            <Route path={LEAVEREVIEWPAGE} element={<LeaveReviewPage/>}/>
            <Route path={MEETFARMERSPAGE} element={<MeetFarmersPage/>}/>

        </Routes>

        </>

      </div>
        
    </Router>
      
  );
}

export default App;
