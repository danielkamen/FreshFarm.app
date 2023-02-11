import { FC, PropsWithChildren } from "react";
import { UserProvider } from "../contexts/useUserContext";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
