import express, { Router } from "express";
import {
  create,
  deleteSuperhero,
  getAll,
  getById,
  search,
  update,
} from "../controllers/superheroController";
import { validatePagination } from "../middleware";

const router: Router = express.Router();

router.get("/search", search);
router.get("/", validatePagination, getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteSuperhero);

export default router;
