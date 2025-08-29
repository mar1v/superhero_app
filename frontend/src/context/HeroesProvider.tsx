import { type ReactNode, useEffect, useState } from "react";
import superheroesApi, { type Superhero } from "../api/superheroesApi";
import { HeroesContext } from "./HeroesContext";

export interface HeroesContextType {
  heroes: Superhero[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  perPage: number;
  setPage: (page: number) => void;
  addHero: (hero: Superhero) => Promise<void>;
  updateHero: (hero: Superhero) => Promise<void>;
  deleteHero: (id: string) => Promise<void>;
  refreshHeroes: () => Promise<void>;
}

interface Props {
  children: ReactNode;
  perPage?: number;
}

export const HeroesProvider = ({ children, perPage = 5 }: Props) => {
  const [allHeroes, setAllHeroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allHeroes.length / perPage);

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const data = await superheroesApi.getAll();
      setAllHeroes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const addHero = async (hero: Superhero) => {
    await superheroesApi.create(hero);
    await fetchHeroes();
    const newTotalPages = Math.ceil(allHeroes.length / perPage);
    if (newTotalPages > currentPage) setCurrentPage(newTotalPages);
  };

  const updateHero = async (hero: Superhero) => {
    if (!hero._id) return;
    await superheroesApi.update(hero._id, hero);
    await fetchHeroes();
  };

  const deleteHero = async (id: string) => {
    await superheroesApi.delete(id);
    await fetchHeroes();
    const newTotalPages = Math.ceil((allHeroes.length - 1) / perPage);
    if (currentPage > newTotalPages && newTotalPages > 0)
      setCurrentPage(newTotalPages);
  };

  const refreshHeroes = async () => fetchHeroes();

  const paginatedHeroes = allHeroes.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <HeroesContext.Provider
      value={{
        heroes: paginatedHeroes,
        loading,
        currentPage,
        totalPages,
        perPage,
        setPage: setCurrentPage,
        addHero,
        updateHero,
        deleteHero,
        refreshHeroes,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
