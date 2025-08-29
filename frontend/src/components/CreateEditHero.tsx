import { useEffect, useState } from "react";
import { type Superhero } from "../api/superheroesApi";
import { useHeroes } from "../hooks/useHeroes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  heroToEdit?: Superhero | null;
}

const CreateEditHero = ({ isOpen, onClose, heroToEdit }: Props) => {
  const { addHero, updateHero, loading } = useHeroes();

  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (heroToEdit) {
      setNickname(heroToEdit.nickname);
      setRealName(heroToEdit.real_name);
      setOriginDescription(heroToEdit.origin_description);
      setSuperpowers(heroToEdit.superpowers.join(", "));
      setCatchPhrase(heroToEdit.catch_phrase);
      setImages(heroToEdit.images);
    } else {
      setNickname("");
      setRealName("");
      setOriginDescription("");
      setSuperpowers("");
      setCatchPhrase("");
      setImages([]);
    }
  }, [heroToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const heroData: Superhero = {
      _id: heroToEdit?._id,
      nickname: nickname.trim(),
      real_name: realName.trim(),
      origin_description: originDescription.trim(),
      superpowers: superpowers
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      catch_phrase: catchPhrase.trim(),
      images: images.filter(Boolean),
    };

    if (!heroData.nickname || !heroData.real_name) {
      alert("Please fill in Nickname and Real Name");
      return;
    }

    try {
      if (heroToEdit) await updateHero(heroData);
      else await addHero(heroData);
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving hero");
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    onClose();
  };
  const resetForm = () => {
    setNickname("");
    setRealName("");
    setOriginDescription("");
    setSuperpowers("");
    setCatchPhrase("");
    setImages([]);
    setNewImageUrl("");
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-white-800 p-6 rounded-xl w-full max-w-md relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {heroToEdit ? "Edit Hero" : "Create Hero"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="border p-2 rounded"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            required
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Origin Description"
            value={originDescription}
            onChange={(e) => setOriginDescription(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Superpowers (comma separated)"
            value={superpowers}
            onChange={(e) => setSuperpowers(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Catch Phrase"
            value={catchPhrase}
            onChange={(e) => setCatchPhrase(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <img
                  src={img}
                  alt={`hero-${idx}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleRemoveImage(idx)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Add image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 p-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? heroToEdit
                ? "Updating..."
                : "Adding..."
              : heroToEdit
              ? "Update Hero"
              : "Add Hero"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditHero;
