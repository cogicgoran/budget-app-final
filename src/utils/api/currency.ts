import axios from "axios";

export async function getCurrencies(): Promise<Array<any>> {
  const url = `${import.meta.env.VITE_API_URL}/currency`;
  const response = await axios.get(url);
  return response.data;
}

export async function createCurrency(payload: any) {
  const url = `${import.meta.env.VITE_API_URL}/currency`;
  const response = await axios.post(url, payload);
  return response.data;
}
