import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Superhero } from "../api/superheroesApi";
import CreateEditHero from "./CreateEditHero";

interface SuperheroListProps {
  heroes: Superhero[];
  deleteHero: (id: string) => Promise<void>;
  onHeroUpdated: () => Promise<void>;
}

const SuperheroCard = ({
  heroes,
  deleteHero,
  onHeroUpdated,
}: SuperheroListProps) => {
  const [editingHero, setEditingHero] = useState<Superhero | null>(null);
  const navigate = useNavigate();
  const handleSave = async () => {
    await onHeroUpdated();
    setEditingHero(null);
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8 w-full ">
      <div className="flex w-full gap-8 justify-center flex-wrap">
        {heroes.map((hero) => (
          <div
            key={hero._id}
            className="flex-1 max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <div className="aspect-[3/4] w-full">
              <img
                className="w-full h-full object-cover rounded-t-2xl"
                src={hero.images?.[0]}
                alt={hero.nickname}
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {hero.nickname}
              </h2>
              <button
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => hero._id && navigate(`/superhero/${hero._id}`)}
              >
                View Details
              </button>
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  onClick={() => hero._id && deleteHero(hero._id)}
                >
                  Delete
                </button>
                <button
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
                  onClick={() => setEditingHero(hero)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreateEditHero
        isOpen={!!editingHero}
        onClose={() => setEditingHero(null)}
        heroToEdit={editingHero}
        onSave={handleSave}
      />
    </div>
  );
};

export default SuperheroCard;
