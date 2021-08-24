const api = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV;

export default api;