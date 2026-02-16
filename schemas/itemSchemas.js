import { z } from 'zod';

// Item schema with validation rules
export const ItemSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  price: z.number().positive("Price must be positive").max(10000, "Price too high"),
  image: z.string().min(1, "Image is required"),
  category: z.string().optional().default("General"),
  inStock: z.boolean().optional().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

// Array of items schema
export const ItemsArraySchema = z.array(ItemSchema);

// Schema for creating/editing (without _id, timestamps)
export const CreateItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  price: z.number().positive("Price must be positive").max(10000, "Price too high"),
  image: z.string().min(1, "Image is required"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean(),
});