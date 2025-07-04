import axios from "axios";

const options = {
  baseURL:
    import.meta.env.VITE_NODE_ENV === "prod"
      ? import.meta.env.VITE_API_BASE_URL
      : import.meta.env.VITE_BASE_URL_DEV,
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { status: statusCode, data } = err.response;
    return Promise.reject({ statusCode, ...data });
  }
);

export default API;
