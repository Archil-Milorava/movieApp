import axios from "axios";

const options = {
  baseURL: import.meta.env.NODE_ENV === "prod" ? import.meta.env.API_BASE_URL : import.meta.env.BASE_URL_DEV,
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
