import HomePage from "./pages/HomePage";
import SignUpPage from './components/SignUpFarmer'
import SearchBar from './components/Navigation'
import ProductPage from './pages/ProductPage'
//import VerifyFarmer from './pages/VerifyFarmer'
import ViewProductPage from "./pages/ViewProductPage";
import CartPage from "./pages/CartPage";
import LeaveReviewPage from "./pages/LeaveReviewPage";
import EditProductPage from "./pages/EditProductPage";
// VERIFYFARMER,
import {HOME, LOGIN, SIGNUP, SEARCH, PRODUCTPAGE, VIEWPRODUCTPAGE, CARTPAGE, LEAVEREVIEWPAGE, EDITPRODUCTPAGE} from './constants/routes'
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
            <Route path={LOGIN} element={<></>} />
            <Route path={SIGNUP} element={<SignUpPage/>} />
            <Route path={SEARCH} element={<SearchBar />} />
            <Route path={PRODUCTPAGE} element={<ProductPage />} />
            <Route path={EDITPRODUCTPAGE} element={<EditProductPage />} />
            <Route path={VIEWPRODUCTPAGE} element={<ViewProductPage />} />
            <Route path={CARTPAGE} element={<CartPage />} />
             <Route path={LEAVEREVIEWPAGE} element={<LeaveReviewPage />} />

        </Routes>
        </>
      </div>
        
    </Router>
      
  );
}

export default App;
