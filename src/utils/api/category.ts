import axios from "axios";

export async function getCategories(): Promise<unknown[]> {
  const url = `${import.meta.env.VITE_API_URL}/category`;
  const response = await axios.get(url);
  return response.data;
}

export async function createCategory(payload: unknown) {
  const url = `${import.meta.env.VITE_API_URL}/category`;
  const response = await axios.post(url, payload);
  return response.data;
}
