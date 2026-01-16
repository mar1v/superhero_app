import { useEffect, useState } from "react";
import { type Superhero, superheroesApi } from "../api/superheroesApi";
import CreateEditHero from "../components/CreateEditHero";
import Pagination from "../components/Pagination";
import SuperheroList from "../components/SuperheroList";

const Home = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const perPage = 5;

  const fetchHeroes = async (page: number) => {
    setLoading(true);
    try {
      const result = await superheroesApi.getAll(page, perPage);
      setHeroes(result.heroes);
      setTotalPages(result.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading heroes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes(currentPage);
  }, [currentPage]);

  const handleAddHero = async (hero: Superhero) => {
    await superheroesApi.create(hero);
    await fetchHeroes(1);
    setModalOpen(false);
  };

  const handleDeleteHero = async (id: string) => {
    await superheroesApi.delete(id);

    const result = await superheroesApi.getAll(currentPage, perPage);
    if (result.heroes.length < 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setHeroes(result.heroes);
      setTotalPages(result.pagination?.pages || 1);
    }
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    fetchHeroes(currentPage);
  }, [currentPage]);

  const handleHeroUpdated = async () => {
    await fetchHeroes(currentPage);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white p-2 rounded m-4 self-center"
      >
        Add Hero
      </button>
      <CreateEditHero
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddHero}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SuperheroList
          heroes={heroes}
          deleteHero={handleDeleteHero}
          onHeroUpdated={handleHeroUpdated}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
