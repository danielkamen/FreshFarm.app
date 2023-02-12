import { FC, PropsWithChildren } from "react";
import { UserProvider } from "../contexts/useUserContext";
import { CategoryProvider } from "../contexts/useCategoryContext";
import { SearchProvider } from "../contexts/useSearchContext";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserProvider>
      <CategoryProvider>
        <SearchProvider>{children}</SearchProvider>
      </CategoryProvider>
    </UserProvider>
  );
};
