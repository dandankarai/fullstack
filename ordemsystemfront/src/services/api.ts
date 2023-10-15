import { signOut } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

export function setupApiClient(context) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@login.token"]}`,
    },
  });
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
