import z from "zod";
import { isISODate } from "../string";

export const ReceiptDto = z.object({
  articles: z
    .array(
      z.object({
        id: z.number({ invalid_type_error: "Invalid article id" }).optional(),
        name: z.string({ invalid_type_error: "Invalid article name" }),
        amount: z
          .number({ invalid_type_error: "Invalid article amount" })
          .positive("Invalid article amount"),
        unitPrice: z
          .number({ invalid_type_error: "Invalid article price" })
          .nonnegative("Invalid article price"),
        category: z.number({ invalid_type_error: "Invalid article category" }),
      }),
      { invalid_type_error: "Invalid receipt" },
    )
    .min(1, { message: "Receipt must have at least one article" }),
  currencyId: z
    .number({
      invalid_type_error: "Invalid currency",
    })
    .int("Invalid currency"),
  marketplaceId: z
    .number({ invalid_type_error: "Invalid marketplace" })
    .int("Invalid marketplace"),
  date: z
    .string({ invalid_type_error: "Invalid receipt date" })
    .refine(isISODate, { message: "Invalid ISO string date" }),
});
