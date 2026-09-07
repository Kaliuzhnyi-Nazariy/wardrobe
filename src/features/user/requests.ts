import { api } from "../api";

export const getData = async () => {
  return (await api.get("/user")).data;
};

export const updateUserData = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return (await api.put("/user", { name, email })).data;
};

export const updateUserPassword = async ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  return (await api.patch("/user/password", { password, confirmPassword }))
    .data;
};

export const deleteUserAccount = async () => {
  return await api.delete("/user");
};
