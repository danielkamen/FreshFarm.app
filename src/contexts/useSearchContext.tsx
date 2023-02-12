import constate from "constate";
import { useState } from "react";

function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  return {
    searchTerm,
    setSearchTerm,
  };
}

export const [SearchProvider, useSearchContext] = constate(useSearch);
