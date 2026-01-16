import { NextFunction, Request, Response } from "express";
import { AppError, asyncHandler, validateSuperhero } from "../middleware";
import * as SuperheroService from "../services/superheroService";

export const getAll = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await SuperheroService.getSuperheroes({ page, limit });

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  }
);

export const getById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const hero = await SuperheroService.getSuperheroById(
      req.params.id as string
    );

    if (!hero) {
      throw new AppError(404, "Superhero not found");
    }

    res.status(200).json({
      success: true,
      data: hero,
    });
  }
);

export const create = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    validateSuperhero(req.body);

    const hero = await SuperheroService.createSuperhero(req.body);

    res.status(201).json({
      success: true,
      message: "Superhero created successfully",
      data: hero,
    });
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    validateSuperhero(req.body);

    const hero = await SuperheroService.updateSuperhero(
      req.params.id as string,
      req.body
    );

    if (!hero) {
      throw new AppError(404, "Superhero not found");
    }

    res.status(200).json({
      success: true,
      message: "Superhero updated successfully",
      data: hero,
    });
  }
);

export const deleteSuperhero = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await SuperheroService.deleteSuperhero(
      req.params.id as string
    );

    if (!result) {
      throw new AppError(404, "Superhero not found");
    }

    res.status(200).json({
      success: true,
      message: "Superhero deleted successfully",
    });
  }
);

export const search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      throw new AppError(400, "Search query is required");
    }

    const results = await SuperheroService.searchSuperheroes(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  }
);
