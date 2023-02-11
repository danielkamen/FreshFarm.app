import ProductList from "../components/ProductList";
import SingleProduct from "../components/SingleProduct";


export default function HomePage() {
  return (
      <div>
        <SingleProduct/>
        <ProductList/>
      </div>
  );
}