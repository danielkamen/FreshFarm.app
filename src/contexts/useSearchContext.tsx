import constate from "constate";
import { useState } from "react";
import { Category } from "../types";

function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}

export const [SearchProvider, useSearchContext] = constate(useSearch);
