import { urlBE } from "@/helper/helper";
import axios from "axios";

const baseUrl = urlBE();
export const getAllSuppliers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/supplier`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get suppliers");
  }
};
