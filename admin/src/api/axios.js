import axios from 'axios';
// withCredentials: true
//todo: turn this ^^^^ on for production, then check server.js cors/helmet settings
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2V2aW5zdG9uZ2UiLCJpYXQiOjE2MTk4MjU2ODR9.z1_YGj6ihtvz17gCqrgmQN5ZYQYQB2Y1tdKW37oshQA";
const baseURL = process.env.REACT_APP_API;
export const axiosWithAuth = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const axiosWithoutAuth = axios.create({ baseURL })

export const axiosWithAuthMulti = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
})