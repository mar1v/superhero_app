import { useState } from "react";
import CreateEditHero from "../components/CreateEditHero";
import { Pagination } from "../components/Pagination";
import SuperheroCard from "../components/SuperheroCard";
import { useHeroes } from "../hooks/useHeroes";

const Home = () => {
  const { loading } = useHeroes();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white p-2 rounded m-4 self-center"
      >
        Add Hero
      </button>
      <CreateEditHero isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {loading ? <p>Loading...</p> : <SuperheroCard />}
      <Pagination />
    </div>
  );
};
export default Home;
