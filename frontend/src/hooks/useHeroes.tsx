import { useContext } from "react";
import { HeroesContext } from "../context/HeroesContext";
import type { HeroesContextType } from "../context/HeroesProvider";

export const useHeroes = (): HeroesContextType => {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};
