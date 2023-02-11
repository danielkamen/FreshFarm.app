import HomePage from "./pages/HomePage";
import SignUpPage from './components/SignUpFarmer'
import SearchBar from './components/Navigation'
import ProductPage from './pages/ProductPage'
import VerifyFarmer from './pages/VerifyFarmer'

import {HOME, LOGIN, SIGNUP, SEARCH, PRODUCTPAGE, VERIFYFARMER} from './constants/routes'
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
            <Route path={SIGNUP} element={<SearchBar/>} />
            <Route path={SEARCH} element={<SignUpPage />} />
            <Route path={PRODUCTPAGE} element={<ProductPage />} />
            <Route path={VERIFYFARMER} element={<VerifyFarmer />} />
        </Routes>
        </>
      </div>
        
    </Router>
      
  );
}

export default App;
