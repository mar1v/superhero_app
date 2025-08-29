import axios from "axios";

export interface Superhero {
  _id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

const BASE_URL = "http://localhost:5000";

const superheroesApi = {
  getAll: async (): Promise<Superhero[]> => {
    const response = await axios.get(`${BASE_URL}/superheroes?limit=100`);
    return response.data;
  },

  getById: async (id: string): Promise<Superhero> => {
    const response = await axios.get(`${BASE_URL}/superheroes/${id}`);
    return response.data;
  },

  create: async (hero: Superhero): Promise<Superhero> => {
    const response = await axios.post(`${BASE_URL}/superheroes`, hero);
    return response.data;
  },

  update: async (id: string, hero: Superhero): Promise<Superhero> => {
    const response = await axios.put(`${BASE_URL}/superheroes/${id}`, hero);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await axios.delete(`${BASE_URL}/superheroes/${id}`);
    return response.data;
  },
};

export default superheroesApi;
