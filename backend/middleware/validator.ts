import { z } from "zod";
import { AppError } from "./index";

export const superheroSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters").max(50),
  real_name: z.string().min(2).max(100),
  origin_description: z.string().optional(),
  superpowers: z.array(z.string()).min(1, "At least one superpower required"),
  catch_phrase: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

export const validateSuperhero = (data: any) => {
  try {
    superheroSchema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new AppError(400, err.issues[0].message);
    }
    throw err;
  }
};
