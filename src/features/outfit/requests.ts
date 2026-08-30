import { api } from "../api";

export const createOutfit = async (data: FormData) => {
  return await api.post("/outfit", data);
};

export const getOutfits = async ({
  season,
  name,
  clothes,
}: {
  season?: string;
  name?: string;
  clothes?: string;
}) => {
  return (await api.get("/outfit", { params: { season, name, clothes } })).data;
};

export const getOutfitById = async (id: string) => {
  return (await api.get("/outfit/" + id)).data;
};

export const updateOutfit = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  return (await api.put("/outfit/" + id, data)).data;
};

export const deleteOutfirById = async (id: string) => {
  return (await api.delete("/outfit/" + id)).data;
};
