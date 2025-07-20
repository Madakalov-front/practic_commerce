import axios from 'axios';

const API_URL = 'http://localhost:3004/products';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};