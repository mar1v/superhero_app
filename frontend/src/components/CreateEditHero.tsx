import { useEffect, useMemo, useState } from "react";
import {
  type Superhero,
  type ValidationError,
  superheroesApi,
  validateSuperhero,
} from "../api/superheroesApi";

interface CreateEditHeroProps {
  isOpen: boolean;
  onClose: () => void;
  heroToEdit?: Superhero | null;
  onSave: (hero: Superhero) => Promise<void>;
}

const CreateEditHero = ({
  isOpen,
  onClose,
  heroToEdit,
  onSave,
}: CreateEditHeroProps) => {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (heroToEdit) {
      setNickname(heroToEdit.nickname);
      setRealName(heroToEdit.real_name);
      setOriginDescription(heroToEdit.origin_description || "");
      setSuperpowers(heroToEdit.superpowers?.join(", ") || "");
      setCatchPhrase(heroToEdit.catch_phrase || "");
      setImages(heroToEdit.images || []);
    } else {
      resetForm();
    }
    setErrors([]);
  }, [heroToEdit]);

  const getErrorMessage = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message;
  };

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

    const validationErrors = validateSuperhero(heroData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      if (heroToEdit) {
        await superheroesApi.update(heroToEdit._id!, heroData);
      } else {
        await onSave(heroData);
      }
      resetForm();
      onClose();
    } catch (error: unknown) {
      console.error(error);
      const err = error as Record<string, unknown>;
      if (err.validationErrors) {
        setErrors(err.validationErrors as ValidationError[]);
      } else {
        setErrors([
          {
            field: "submit",
            message: (err.message as string) || "Error saving hero",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      try {
        new URL(newImageUrl);
        setImages([...images, newImageUrl.trim()]);
        setNewImageUrl("");
        setErrors(errors.filter((e) => !e.field.startsWith("images")));
      } catch {
        setErrors([
          ...errors.filter((e) => !e.field.startsWith("images")),
          { field: "newImageUrl", message: "Please enter a valid URL" },
        ]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setErrors([]);
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
    setErrors([]);
  };

  const buttonLabel = useMemo(() => {
    if (loading) {
      return heroToEdit ? "Updating..." : "Adding...";
    } else {
      return heroToEdit ? "Update Hero" : "Add Hero";
    }
  }, [loading, heroToEdit]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-white-800 p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {heroToEdit ? "Edit Hero" : "Create Hero"}
        </h2>

        {errors.some((e) => e.field === "submit") && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.find((e) => e.field === "submit")?.message}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <input
              className={`w-full border p-2 rounded ${
                getErrorMessage("nickname") ? "border-red-500" : ""
              }`}
              placeholder="Nickname *"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {getErrorMessage("nickname") && (
              <p className="text-red-600 text-sm mt-1">
                {getErrorMessage("nickname")}
              </p>
            )}
          </div>

          <div>
            <input
              className={`w-full border p-2 rounded ${
                getErrorMessage("real_name") ? "border-red-500" : ""
              }`}
              placeholder="Real Name *"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
            />
            {getErrorMessage("real_name") && (
              <p className="text-red-600 text-sm mt-1">
                {getErrorMessage("real_name")}
              </p>
            )}
          </div>

          <div>
            <textarea
              className={`w-full border p-2 rounded ${
                getErrorMessage("origin_description") ? "border-red-500" : ""
              }`}
              placeholder="Origin Description"
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
            />
            {getErrorMessage("origin_description") && (
              <p className="text-red-600 text-sm mt-1">
                {getErrorMessage("origin_description")}
              </p>
            )}
          </div>

          <div>
            <input
              className={`w-full border p-2 rounded ${
                getErrorMessage("superpowers") ? "border-red-500" : ""
              }`}
              placeholder="Superpowers (comma separated) *"
              value={superpowers}
              onChange={(e) => setSuperpowers(e.target.value)}
            />
            {getErrorMessage("superpowers") && (
              <p className="text-red-600 text-sm mt-1">
                {getErrorMessage("superpowers")}
              </p>
            )}
          </div>

          <div>
            <input
              className={`w-full border p-2 rounded ${
                getErrorMessage("catch_phrase") ? "border-red-500" : ""
              }`}
              placeholder="Catch Phrase"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
            />
            {getErrorMessage("catch_phrase") && (
              <p className="text-red-600 text-sm mt-1">
                {getErrorMessage("catch_phrase")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Images</label>
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <img
                  src={img}
                  alt={`hero-${idx}`}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/64";
                  }}
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
                type="text"
                placeholder="Add image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className={`flex-1 border p-2 rounded ${
                  getErrorMessage("newImageUrl") ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
            {getErrorMessage("newImageUrl") && (
              <p className="text-red-600 text-sm">
                {getErrorMessage("newImageUrl")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 p-2 rounded text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditHero;
