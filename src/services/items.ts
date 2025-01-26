import axios from "axios";
import { urlBE } from "@/helper/helper";

const baseUrl = urlBE();
export const getAllItem = async (payload: any) => {
  try {
    const response = await axios.get(`${baseUrl}/items`, {
      params: payload,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get Items");
  }
};

export const getItemById = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch item data");
  }
};

export const addNewItem = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/items`, payload, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new item");
  }
};

export const updateItemData = async (id: string, payload: any) => {
  try {
    const response = await axios.patch(`${baseUrl}/items/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Update item data failed");
  }
};

export const deleteItem = async (itemId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/items/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new item");
  }
};
