import axios from "axios";
import { TokenResponse } from "./types";

export const $api = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1",
  headers: {
    Token: localStorage.getItem("token") || "",
  },
});

$api.interceptors.request.use((config) => {
  config.headers.Token = localStorage.getItem("token");
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await $api.get<TokenResponse>("/token");
        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);
