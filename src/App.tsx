import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import CartPage from "./pages/CartPage";
import LeaveReviewPage from "./pages/LeaveReviewPage";

function App() {
  return (
      <div>
        <HomePage/>
        <ProductPage/>
        <ViewProductPage/>
        <CartPage/>
        <LeaveReviewPage/>
      </div>
        
    </Router>
      
  );
}

export default App;
