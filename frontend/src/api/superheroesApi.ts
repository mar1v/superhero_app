import axios from "axios";
import { config } from "../config";

export interface Superhero {
  _id?: string;
  nickname: string;
  real_name: string;
  origin_description?: string;
  superpowers: string[];
  catch_phrase?: string;
  images?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const validateSuperhero = (hero: Superhero): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!hero.nickname || hero.nickname.trim().length < 2) {
    errors.push({
      field: "nickname",
      message: "Nickname must be at least 2 characters",
    });
  }
  if (hero.nickname && hero.nickname.length > 50) {
    errors.push({
      field: "nickname",
      message: "Nickname must not exceed 50 characters",
    });
  }

  if (!hero.real_name || hero.real_name.trim().length < 2) {
    errors.push({
      field: "real_name",
      message: "Real name must be at least 2 characters",
    });
  }
  if (hero.real_name && hero.real_name.length > 100) {
    errors.push({
      field: "real_name",
      message: "Real name must not exceed 100 characters",
    });
  }

  if (!hero.superpowers || hero.superpowers.length === 0) {
    errors.push({
      field: "superpowers",
      message: "At least one superpower is required",
    });
  }

  if (hero.origin_description && hero.origin_description.length > 1000) {
    errors.push({
      field: "origin_description",
      message: "Origin description must not exceed 1000 characters",
    });
  }

  if (hero.catch_phrase && hero.catch_phrase.length > 200) {
    errors.push({
      field: "catch_phrase",
      message: "Catch phrase must not exceed 200 characters",
    });
  }

  if (hero.images && hero.images.length > 0) {
    hero.images.forEach((url, index) => {
      if (url && url.trim()) {
        try {
          new URL(url);
        } catch {
          errors.push({
            field: `images[${index}]`,
            message: "Image URL must be valid",
          });
        }
      }
    });
  }

  return errors;
};

const getValidationErrors = (error: unknown): ValidationError[] => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiResponse<Superhero>;
    return response?.errors || [];
  }
  return [];
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiResponse<Superhero>;
    return response?.message || error.message || "An error occurred";
  }
  return error instanceof Error ? error.message : "An unknown error occurred";
};

export const superheroesApi = {
  getAll: async (page = 1, limit = 5) => {
    const response = await api.get<ApiResponse<Superhero[]>>("/superheroes", {
      params: { page, limit },
    });
    return {
      heroes: response.data.data || [],
      pagination: response.data.pagination,
    };
  },

  getById: async (id: string): Promise<Superhero> => {
    const response = await api.get<ApiResponse<Superhero>>(
      `/superheroes/${id}`
    );
    if (!response.data.data) throw new Error("Hero not found");
    return response.data.data;
  },

  create: async (hero: Superhero): Promise<Superhero> => {
    const validationErrors = validateSuperhero(hero);
    if (validationErrors.length > 0) {
      const error = new Error("Validation failed") as Error & {
        validationErrors: ValidationError[];
      };
      error.validationErrors = validationErrors;
      throw error;
    }

    try {
      const response = await api.post<ApiResponse<Superhero>>(
        "/superheroes",
        hero
      );
      if (!response.data.data) throw new Error("Failed to create hero");
      return response.data.data;
    } catch (error: unknown) {
      const err = error as Record<string, unknown>;
      if (err.validationErrors) throw error;
      err.validationErrors = getValidationErrors(error);
      err.message = getErrorMessage(error);
      throw error;
    }
  },

  update: async (id: string, hero: Superhero): Promise<Superhero> => {
    const validationErrors = validateSuperhero(hero);
    if (validationErrors.length > 0) {
      const error = new Error("Validation failed") as Error & {
        validationErrors: ValidationError[];
      };
      error.validationErrors = validationErrors;
      throw error;
    }

    try {
      const response = await api.put<ApiResponse<Superhero>>(
        `/superheroes/${id}`,
        hero
      );
      if (!response.data.data) throw new Error("Failed to update hero");
      return response.data.data;
    } catch (error: unknown) {
      const err = error as Record<string, unknown>;
      if (err.validationErrors) throw error;
      err.validationErrors = getValidationErrors(error);
      err.message = getErrorMessage(error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/superheroes/${id}`);
  },

  search: async (query: string): Promise<Superhero[]> => {
    if (!query || query.trim().length === 0) {
      throw new Error("Search query cannot be empty");
    }
    const response = await api.get<ApiResponse<Superhero[]>>(
      "/superheroes/search",
      { params: { q: query } }
    );
    return response.data.data || [];
  },
};
