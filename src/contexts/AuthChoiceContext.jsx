import { createContext, useContext } from "react";

export const AuthChoiceContext = createContext(() => {});

export function useAuthChoice() {
  return useContext(AuthChoiceContext);
}
