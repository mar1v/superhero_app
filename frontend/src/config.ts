const isDevelopment = import.meta.env.DEV;

export const config = {
  apiUrl: isDevelopment
    ? "http://localhost:5000/api"
    : "https://api.production.com/api",
};
