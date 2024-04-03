import config from "../config";
import { z } from 'zod';

const baseURL = config.baseUrl;
const authToken = config.token.secret;

export const handleAPICall = async (companyName: string, categoryName: string, maxPrice: string, minPrice: string, top: string) => {
    const apiUrl = `${baseURL}/test/companies/${companyName}/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const headers = {
        Authorization: `Bearer ${authToken}`
    };

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export const productsSchema = z.object({
    companyName: z.enum(['AMZ', 'FLP', 'SNP', 'MYN', 'AZO']),
    categoryName: z.enum(['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC']),
    maxPrice: z.string(),
    minPrice: z.string(),
    top: z.string()
});

