import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Superhero, superheroesApi } from "../api/superheroesApi";

const SuperheroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchHero = async () => {
      try {
        setLoading(true);
        const result = await superheroesApi.getById(id);
        setHero(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Hero not found");
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !hero)
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Hero not found"}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center gap-8">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Back to home
      </button>
      <h1 className="text-4xl font-bold text-white drop-shadow-md">
        {hero.nickname}
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-5">
          <p>
            <span className="font-semibold text-gray-700">Real Name:</span>{" "}
            <span className="text-gray-900">{hero.real_name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Origin:</span>{" "}
            <span className="text-gray-900">{hero.origin_description}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Superpowers:</span>{" "}
            <span className="text-gray-900">{hero.superpowers.join(", ")}</span>
          </p>
          <p className="italic text-gray-600 mt-2">"{hero.catch_phrase}"</p>
        </div>

        <div className="flex-1 flex flex-wrap gap-4 justify-center items-start">
          {hero.images?.map((img, idx) => (
            <div
              key={idx}
              className="w-32 h-32 rounded-lg overflow-hidden shadow-md border border-gray-300"
            >
              <img
                src={img}
                alt={`hero-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetails;
