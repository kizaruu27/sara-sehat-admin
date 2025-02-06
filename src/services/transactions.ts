import { urlBE } from "@/helper/helper";
import axios from "axios";

const baseUrl = urlBE();

export const addToCart = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/transaction/cart`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed add item to cart");
  }
};

export const getAllCarts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/transaction/cart`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get cart data");
  }
};
