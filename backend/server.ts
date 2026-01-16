import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import { errorHandler } from "./middleware";
import superheroesRouter from "./routes/superheroes";

const app = express();

const { mongoUri: MONGO_URI } = config;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/superheroes", superheroesRouter);

app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
