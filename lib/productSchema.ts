import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  category: z.string().min(2, "Category is required"),
  image: z.any(),
  });

export type ProductFormData = z.infer<typeof productSchema>;
