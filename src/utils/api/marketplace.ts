import axios from "axios";

export async function getMarketplaces(): Promise<Array<any>> {
  const url = `${import.meta.env.VITE_API_URL}/marketplace`;
  const response = await axios.get(url);
  return response.data;
}

export async function createNewMarketplace(payload: any): Promise<any> {
  const url = `${import.meta.env.VITE_API_URL}/marketplace`;
  const response = await axios.post(url, payload);
  return response.data;
}
