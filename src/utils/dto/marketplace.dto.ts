import z from "zod";

export const AddMarketplaceDto = z.object({
  name: z.string(),
  address: z.string(),
});
