import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { Produce, ProduceQuery, Category, Farmer } from "../types";
import Navigation from "../components/Navigation";
import ProduceList from "../components/ProduceList";
import { useSearchParams } from "react-router-dom";
import FilterList from "../components/FilterList";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const [produce, setProduce] = useState<Array<Produce>>([]);
  useEffect(() => {
    setProduce([]);
    getDocs(collection(db, "products")).then((productArrayData) => {
      productArrayData.forEach((doc) => {
        const productRef = {
          id: doc.id,
          ...doc.data(),
        } as ProduceQuery;

        getDoc<Category>(productRef.category_id).then((category) => {
          if (category.exists()) {
            getDoc<Farmer>(productRef.seller_id).then((seller) => {
              if (seller.exists()) {
                let productData = {
                  id: doc.id,
                  ...doc.data(),
                  category: category.data() as Category,
                  seller: seller.data() as Farmer,
                } as Produce;
                setProduce((prev) => [...prev, productData]);
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
        <div className="mx-auto px-6 lg:px-8">
          <FilterList
            categoryId={searchParams.get("category")}
            title={"Browse Produce"}>
            <ProduceList produce={produce} />
          </FilterList>
        </div>
      </div>
    </div>
  );
}
