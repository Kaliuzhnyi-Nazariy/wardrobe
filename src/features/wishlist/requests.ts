import { api } from "../api";

export const getWishlist = async ({
  params,
}: {
  params?: {
    clothes?: "true" | "false";
    outfit?: "true" | "false";
    color?: string;
    clothesIds?: string;
    name?: String;
    size?: string;
    season?: string;
  };
}) => {
  try {
    return (await api.get("/wishlist", { params })).data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export const getWishlistitem = async ({ id }: { id: string }) => {
  return (await api.get("/wishlist/" + id)).data;
};
