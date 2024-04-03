import { z } from 'zod';

export const productsSchema = z.object({
    categoryName: z.enum(['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC']),
});

export const productSchema = z.object({
    productName: z.string(),
    price: z.number(),
    rating: z.number(),
    discount: z.number(),
    availability: z.string(),
    companyName: z.string(),
    categoryName: z.string(),
});

export const productGetSchema = z.object({
    categoryName: z.string(),
    productId: z.string(),
});

export type Product = z.infer<typeof productSchema>;