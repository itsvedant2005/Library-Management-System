import axios from "axios";

const API = axios.create({
  baseURL: "https://vedantslibraryhub.onrender.com/api",
  withCredentials: true
});

export default API;