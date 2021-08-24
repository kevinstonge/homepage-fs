import axios from "axios";
// withCredentials: true
//todo: turn this ^^^^ on for production, then check server.js cors/helmet settings
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk5MDYxODF9.jqsNOEJra3wrT7f8Ae5KjTVkCyyL042VpA5SFYmwktc";
const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV;
export const axiosWithAuth = axios.create({
  baseURL,
  withCredentials: true,
});
