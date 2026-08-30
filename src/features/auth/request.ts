import { api } from "../api";
import { ISignIn, ISignUp } from "./interface";

export const signup = async ({
  name,
  email,
  password,
  confirmPassword,
}: ISignUp) => {
  console.log("request: ", { name, email, password, confirmPassword });

  try {
    // const token = (
    //   await api.post("/auth/signup", { name, email, password, confirmPassword })
    // ).data;

    // setHeader(token);

    // return;

    await api.post("/auth/signup", {
      name,
      email,
      password,
      confirmPassword,
    });
    return;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const signin = async ({ email, password }: ISignIn) => {
  try {
    // const token = (await api.post("/auth/signin", { email, password })).data;
    // setHeader(token);
    await api.post("/auth/signin", { email, password });

    return;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
