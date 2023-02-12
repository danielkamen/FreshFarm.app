import { Link } from "react-router-dom";

import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { Product, ProductQuery, Category, Farmer } from "../types";
import Navigation from "../components/Navigation";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { PRODUCEPAGE } from "../constants/routes";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

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
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id}>
                <Link to={PRODUCEPAGE} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="block h-12 w-12 rounded-full"
                          src={product.image_url}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {product.name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <CurrencyDollarIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">{product.price}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Harvested on{" "}
                              <time
                                dateTime={product.picked_on
                                  .toDate()
                                  .toDateString()
                                  .toString()}
                              />
                            </p>
                            {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              {product.}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
