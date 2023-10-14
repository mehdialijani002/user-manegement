import axios from "axios";
import mockData from "../mock/mock.component";

const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use((config) => {
  if (config.method === "get") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config);
      }, 1000);
    });
  }
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.config.method === "get") {
    return {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: response.headers,
      config: response.config,
    };
  }
  return response;
});

export default instance;
