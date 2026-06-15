import axios from "axios";

const API = axios.create({
  baseURL: "https://vedant-libraryhub.onrender.com/api"
});

export default API;