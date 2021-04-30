import axios from 'axios';
// withCredentials: true
//todo: turn this ^^^^ on for production, then check server.js cors/helmet settings
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk2MTY1NDF9.ZlzLz1AlK9inN24ZBFT4fT_ct0bRv4p3mNLCFoRGLyg";
const baseURL = process.env.REACT_APP_API;
export const axiosWithAuth = axios.create({
    baseURL,
    headers: {
        Authentication: `Bearer ${token}`
    }
});
export const axiosWithoutAuth = axios.create({baseURL})