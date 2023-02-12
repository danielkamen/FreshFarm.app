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
    getDocs(collection(db, "products")).then((produceArrayData) => {
      produceArrayData.forEach(async (doc) => {
        if (doc.exists()) {
          const produceRef = {
            id: doc.id,
            ...doc.data(),
          } as ProduceQuery;

          const categoryRef = await getDoc(produceRef.category_id);
          if (categoryRef.exists()) {
            const sellerRef = await getDoc(produceRef.seller_id);
            if (sellerRef.exists()) {
              const produceData = {
                id: doc.id,
                ...doc.data(),
                category: categoryRef.data() as Category,
                seller: sellerRef.data() as Farmer,
              } as Produce;
              setProduce((prev) => [...prev, produceData]);
            }
          }
        }
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
