import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrencies } from "../utils/api/currency";

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAndStoreCurrencies();
  }, []);

  async function getAndStoreCurrencies() {
    setIsLoading(true);
    try {
      const currencies = await getCurrencies();
      setCurrencies(currencies);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get currencies");
    } finally {
      setIsLoading(false);
    }
  }

  return { currencies, isLoading };
}
