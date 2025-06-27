import axios from "axios";

const options = {
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { satus: statusCode, data } = err.response;
    return Promise.reject({ statusCode, ...data });
  }
);

export default API;