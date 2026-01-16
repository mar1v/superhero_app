import { Superhero } from "../models/Superhero";

interface PaginationParams {
  page: number;
  limit: number;
}

interface SuperheroData {
  nickname: string;
  real_name: string;
  origin_description?: string;
  superpowers?: string[];
  catch_phrase?: string;
  images?: string[];
}

export const getSuperheroes = async (params: PaginationParams) => {
  const { page, limit } = params;
  const skip = (page - 1) * limit;

  const superheroes = await Superhero.find().skip(skip).limit(limit).exec();

  const total = await Superhero.countDocuments();

  return {
    data: superheroes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
export const createSuperhero = async (data: SuperheroData) => {
  const newHero = new Superhero(data);
  return await newHero.save();
};
export const updateSuperhero = async (id: string, data: SuperheroData) => {
  return await Superhero.findByIdAndUpdate(id, data, { new: true }).exec();
};
export const deleteSuperhero = async (id: string) => {
  return await Superhero.findByIdAndDelete(id).exec();
};
export const getSuperheroById = async (id: string) => {
  return await Superhero.findById(id).exec();
};
export const searchSuperheroes = async (query: string) => {
  return await Superhero.find({ $text: { $search: query } }).exec();
};

export default {
  getSuperheroes,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  getSuperheroById,
  searchSuperheroes,
};
