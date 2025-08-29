import { createContext } from "react";
import type { HeroesContextType } from "./HeroesProvider";

export const HeroesContext = createContext<HeroesContextType | undefined>(
  undefined
);
