import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { Product, ProductQuery, Category, Farmer } from "../types";
import Navigation from "../components/Navigation";
import ProductList from "../components/ProduceList";

export default function SearchResultPage() {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    setProducts([]);
    getDocs(collection(db, "products")).then((productArrayData) => {
      productArrayData.forEach((doc) => {
        const productRef = {
          id: doc.id,
          ...doc.data(),
        } as ProductQuery;

        getDoc<Category>(productRef.category_id).then((category) => {
          if (category.exists()) {
            getDoc<Farmer>(productRef.seller_id).then((seller) => {
              if (seller.exists()) {
                let productData = {
                  id: doc.id,
                  ...doc.data(),
                  category: category.data() as Category,
                  seller: seller.data() as Farmer,
                } as Product;
                setProducts((prev) => [...prev, productData]);
              }
            });
          }
        });
      });
    });
  }, []);

  return (
    <div>
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
