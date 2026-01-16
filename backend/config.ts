export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/superheroes_db",
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: (process.env.NODE_ENV || "development") === "development",
};
