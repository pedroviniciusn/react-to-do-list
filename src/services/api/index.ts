import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-to-do-list-rust-chi.vercel.app/api",
});
