import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/api/user/`;

const getPublicContent = () => {
  return axios.get(API_URL + "public");
};

const getUserBoard = () => {
  return axios.get(API_URL + "board", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
};
