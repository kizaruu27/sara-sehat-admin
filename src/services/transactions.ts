import { urlBE } from "@/helper/helper";
import axios from "axios";

const baseUrl = urlBE();

// cart
export const addToCart = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/transaction/cart`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed add item to cart");
  }
};

export const getAllCarts = async (payload: any) => {
  try {
    const response = await axios.get(`${baseUrl}/transaction/cart`, {
      params: payload,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get cart data");
  }
};

export const deleteCart = async (cartId: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/transaction/cart/${cartId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete cart data");
  }
};

export const updateCartQty = async (cartId: any, data: any) => {
  try {
    const response = await axios.patch(`${baseUrl}/transaction/cart/qty/${cartId}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update cart qty");
  }
};

// transaction
export const createTransaction = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/transaction`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
};
