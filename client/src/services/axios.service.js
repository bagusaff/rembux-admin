import axios from "axios";
import authHeader from "./auth-header";

const apiUrl = process.env.REACT_APP_API_URL;

export const authAxios = axios.create({
  baseURL: apiUrl,
  headers: authHeader(),
});

export const publicAxios = axios.create({
  baseURL: apiUrl,
});
