import constate from "constate";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Category } from "../types";

function useCategory() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  useEffect(() => {
    setCategories([]);
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

  return { categories };
}
export const [CategoryProvider, useCategoryContext] = constate(useCategory);
