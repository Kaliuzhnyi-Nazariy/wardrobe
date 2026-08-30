import { api } from "../api";

export const getClothes = async ({
  season,
  name,
  color,
  size,
  isOwned,
}: {
  season?: string;
  name?: string;
  color?: string;
  size?: string;
  isOwned?: string;
}) => {
  return (
    await api.get("/clothes", {
      params: { season, name, color, size, isOwned },
    })
  ).data;
};

export const addClothes = async (data: FormData) => {
  return await api.post("/clothes", data);
};

export const getClothesById = async (id: string) => {
  return (await api.get("/clothes/" + id)).data;
};

export const updateClothes = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  return (await api.put("/clothes/" + id, data)).data;
};

export const deleteClothes = async ({ id }: { id: string }) => {
  return (await api.delete("/clothes/" + id)).data;
};
