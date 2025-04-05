import axios from "axios";

const API_URL = "https://api.npoint.io/202f0b3a7776777187fe";

export const getProductsFromAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
