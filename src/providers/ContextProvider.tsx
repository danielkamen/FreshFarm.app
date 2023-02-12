import { FC, PropsWithChildren } from "react";
import { UserProvider } from "../contexts/useUserContext";
import { CategoryProvider } from "../contexts/useCategoryContext";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </UserProvider>
  );
};
