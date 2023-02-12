import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  CurrencyDollarIcon
} from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc } from "@firebase/firestore";
import { Farmer, Product, ProductQuery } from "../types";
import { Category } from "../types";


export default function ProductList() {
   const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productArrayData = await getDocs(collection(db, "products"));
      let productsArray: Array<Product> = [];
      productArrayData.forEach(async (doc) => {
        const productRef = {
          id: doc.id,
          ...doc.data()
        } as ProductQuery;
        const categoryData = await getDoc<Category>(productRef.category);
        const sellerData = await getDoc<Farmer>(productRef.seller);

        let productData = {
          id: doc.id,
          ...doc.data(),
          category: categoryData.data(),
          seller: sellerData.data()
        } as Product;
        productsArray.push(productData);
      })

      setProducts(productsArray);
    }
    fetchProducts();
  }, [])

  console.log(products)

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={product.id} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={product.image_url}
                      alt={product.image_alt}
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-tertiary-accent">
                        {application.applicant.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {product.price}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Harvested on {" "}
                          <time dateTime={product.picked_on.toDate().toString()}>
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {product.category.name}
                        </p>
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
  );
}
