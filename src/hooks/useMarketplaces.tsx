import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMarketplaces } from "../utils/api/marketplace";

export function useMarketplaces() {
  const [marketplaces, setMarketplaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAndStoreMarketplaces();
  }, []);

  async function getAndStoreMarketplaces() {
    setIsLoading(true);
    try {
      const marketplaces = (await getMarketplaces()) as any;
      setMarketplaces(marketplaces);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get marketplaces");
    } finally {
      setIsLoading(false);
    }
  }

  function prependNewMarketplace(marketplace: any) {
    setMarketplaces((previousMarketplaces) => [
      marketplace,
      ...previousMarketplaces,
    ]);
  }

  return { marketplaces, isLoading, prependNewMarketplace };
}
