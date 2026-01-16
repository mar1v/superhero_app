import { AppError } from "../middleware";
import { superheroSchema, validateSuperhero } from "../middleware/validator";

describe("validateSuperhero", () => {
  it("should throw error for short nickname", () => {
    expect(() =>
      validateSuperhero({
        nickname: "A",
        real_name: "Test",
        superpowers: ["flying"],
      })
    ).toThrow(AppError);
  });

  it("should throw error for missing superpowers", () => {
    expect(() =>
      validateSuperhero({
        nickname: "Superman",
        real_name: "Clark",
        superpowers: [],
      })
    ).toThrow(AppError);
  });

  it("should pass valid data", () => {
    expect(() =>
      validateSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        superpowers: ["flying", "super strength"],
        origin_description: "From Krypton",
        catch_phrase: "I'm Superman!",
      })
    ).not.toThrow();
  });

  it("should validate schema correctly", () => {
    const validData = {
      nickname: "Batman",
      real_name: "Bruce Wayne",
      superpowers: ["intelligence", "martial arts"],
    };

    expect(() => superheroSchema.parse(validData)).not.toThrow();
  });

  it("should reject invalid URL in images", () => {
    expect(() =>
      validateSuperhero({
        nickname: "Superman",
        real_name: "Clark",
        superpowers: ["flying"],
        images: ["not-a-url"],
      })
    ).toThrow(AppError);
  });
});
