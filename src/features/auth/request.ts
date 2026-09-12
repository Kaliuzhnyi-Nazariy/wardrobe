import { api } from "../api";
import { ISignIn, ISignUp } from "./interface";

export const signup = async ({
  name,
  email,
  password,
  confirmPassword,
}: ISignUp) => {
  return await api.post("/auth/signup", {
    name,
    email,
    password,
    confirmPassword,
  });
};

export const signin = async ({ email, password }: ISignIn) => {
  return (await api.post("/auth/signin", { email, password })).data;
};

export const logout = async () => {
  return (await api.post("/auth/logout")).data;
};
