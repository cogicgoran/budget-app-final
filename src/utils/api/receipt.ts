import axios from "axios";

export async function getMonthlyReport(): Promise<{
  currency: string;
  perCategory: {
    category: any;
    total: number;
  }[];
  total: number;
}> {
  console.log("test");
  const url = `${import.meta.env.VITE_API_URL}/receipt/current-month-summary`;
  const response = await axios.get(url);
  return response.data;
}

export async function getReceiptsView(): Promise<{
  items: any[];
}> {
  const url = `${import.meta.env.VITE_API_URL}/receipt/view`;
  const response = await axios.get(url);
  return response.data;
}

export async function getRecentReceipts(): Promise<{
  recentReceipts: any[];
  recentCategories: any[];
}> {
  const url = `${import.meta.env.VITE_API_URL}/receipt/recent-receipts`;
  const response = await axios.get(url);
  return response.data;
}

export async function createReceipt(payload: any) {
  const url = `${import.meta.env.VITE_API_URL}/receipt`;
  const response = await axios.post(url, payload);
  return response.data;
}

export async function updateReceipt(receiptId: number, payload: any) {
  const url = `${import.meta.env.VITE_API_URL}/receipt/${receiptId}`;
  const response = await axios.put(url, payload);
  return response.data;
}

export async function getReceipt(
  id: number,
  abortController: AbortController,
): Promise<{
  id: number;
  articles: Array<any>;
  currency: any;
  marketplace: any;
}> {
  const url = `${import.meta.env.VITE_API_URL}/receipt/${id}`;
  const response = await axios.get(url, {
    signal: abortController.signal,
  });
  return response.data;
}

export async function deleteReceipt(id: number) {
  const url = `${import.meta.env.VITE_API_URL}/receipt/${id}`;
  const response = await axios.delete(url);
  return response.data;
}

export async function populateScanResults(query: string) {
  const url = `${import.meta.env.VITE_API_URL}/receipt/populate?query=${query}`;
  const response = await axios.get(url);
  return response.data;
}

export type MonthlyReport = Awaited<ReturnType<typeof getMonthlyReport>>;
