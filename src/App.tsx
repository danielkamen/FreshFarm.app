import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import CartPage from "./pages/CartPage";
import LeaveReviewPage from "./pages/LeaveReviewPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
      <div>
        <HomePage/>
        <ProductPage/>
        <ViewProductPage/>
        <CartPage/>
        <LeaveReviewPage/>
        <EditProductPage/>
      </div>
  );
}

export default App;
