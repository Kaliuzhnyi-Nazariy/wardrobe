import axios from "axios";

const { EXPO_PUBLIC_API_URL } = process.env;

export const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api",
  withCredentials: true,
});

// export const setHeader = (token: string) => {
//   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// export const clearHeader = () => {
//   delete api.defaults.headers.common["Authorization"];
// };
