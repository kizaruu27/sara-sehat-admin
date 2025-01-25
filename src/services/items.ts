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

export const addNewItem = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/items`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new item");
  }
};
