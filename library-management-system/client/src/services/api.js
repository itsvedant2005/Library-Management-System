import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://vedantslibraryhub.onrender.com/api",
  withCredentials: true,
});

export default API;