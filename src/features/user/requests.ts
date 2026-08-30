import { api } from "../api";

export const getData = async () => {
  return (await api.get("/user")).data;
};
