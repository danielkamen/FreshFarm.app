import Navigation from "../components/Navigation";
import { SEARCHRESULTPAGE, VIEWPRODUCEPAGE } from "../constants/routes";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Category } from "../types";

export default function ProducePage() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getDocs(collection(db, "categories"));
      let categoriesArray: Array<Category> = [];
      categoriesData.forEach((doc) => {
        const categoriesData = {
          id: doc.id,
          ...doc.data(),
        } as Category;
        categoriesArray.push(categoriesData);
      });
      setCategories(categoriesArray);
    };
    fetchCategories();
  }, []);
  return (
    <div className="bg-white">
      <header>
        <Navigation />
      </header>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="items-center margin-auto w-8xl">
          <h2 className="text-center margin-auto w-8xl text-4xl font-bold tracking-tight text-black-400 sm:text-6xl py-6 pl-10xl pt-10">
            Produce Categories
          </h2>
        </div>
        <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {categories.map((category) => (
              <Link
                to={`${SEARCHRESULTPAGE}?category=${category.id}`}
                key={category.id}
                className="group">
                <div>
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl text-center font-medium text-black">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
