import { useNavigate, useParams } from "react-router-dom";
import type { Superhero } from "../api/superheroesApi";
import { useHeroes } from "../hooks/useHeroes";

const SuperheroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { heroes } = useHeroes();
  const navigate = useNavigate();

  if (!id)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold text-lg">
        Hero ID is missing
      </p>
    );

  const hero = heroes.find((hero) => hero._id === id);

  if (!hero) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold text-lg">
        Hero not found
      </p>
    );
  }

  const heroData: Superhero = {
    _id: hero._id,
    nickname: hero.nickname.trim(),
    real_name: hero.real_name.trim(),
    origin_description: hero.origin_description.trim(),
    superpowers: hero.superpowers.map((s) => s.trim()).filter(Boolean),
    catch_phrase: hero.catch_phrase.trim(),
    images: hero.images.filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center gap-8">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Back to home
      </button>
      <h1 className="text-4xl font-bold text-white drop-shadow-md">
        {heroData.nickname}
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-5">
          <p>
            <span className="font-semibold text-gray-700">Real Name:</span>{" "}
            <span className="text-gray-900">{heroData.real_name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Origin:</span>{" "}
            <span className="text-gray-900">{heroData.origin_description}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Superpowers:</span>{" "}
            <span className="text-gray-900">
              {heroData.superpowers.join(", ")}
            </span>
          </p>
          <p className="italic text-gray-600 mt-2">"{heroData.catch_phrase}"</p>
        </div>

        <div className="flex-1 flex flex-wrap gap-4 justify-center items-start">
          {heroData.images.map((img, idx) => (
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
