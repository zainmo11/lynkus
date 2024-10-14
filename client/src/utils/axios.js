import axios from "axios";

const api = axios.create({
  baseURL: "https://lynkus-3.onrender.com/api",
});

export default api;
