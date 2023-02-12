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
  const categoryId = searchParams.get("category");

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
                name: produceRef.name,
                price: produceRef.price,
                quantity: produceRef.quantity,
                picked_on: produceRef.picked_on,
                category: {
                  id: categoryRef.id,
                  name: categoryRef.data().name,
                  image_url: categoryRef.data().image_url,
                } as Category,
                seller: {
                  id: sellerRef.id,
                  name: sellerRef.data().name,
                  description: sellerRef.data().description,
                  created_at: sellerRef.data().created_at,
                  updated_at: sellerRef.data().updated_at,
                  email_address: sellerRef.data().email_address,
                  image_url: sellerRef.data().image_url,
                  phone_number: sellerRef.data().phone_number,
                  address: sellerRef.data().address,
                } as Farmer,
              } as Produce;
              if (categoryId) {
                if (produceData.category.id === categoryId) {
                  setProduce((prev) => [...prev, produceData]);
                } else {
                  setProduce((prev) => [...prev]);
                }
              } else {
                setProduce((prev) => [...prev, produceData]);
              }
            }
          }
        }
      });
    });
  }, [categoryId]);

  return (
    <div>
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto px-6 lg:px-8">
          <FilterList categoryId={categoryId} title={"Browse Produce"}>
            <ProduceList produce={produce} />
          </FilterList>
        </div>
      </div>
    </div>
  );
}
