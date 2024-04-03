import config from "../config";
import { z } from 'zod';

const baseURL = config.baseUrl;
const authToken = config.token.secret;

export const handleAPICall = async (companyName: string, categoryName: string, maxPrice: number, minPrice: number, top: number) => {
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
});

export const checkValidInput = (parsedMaxPrice: number, parsedMinPrice: number, parsedTop: number) => {
    if (isNaN(parsedMaxPrice) || isNaN(parsedMinPrice) || isNaN(parsedTop)) {
        throw new Error('User input is not a number');
    }
    if (parsedMaxPrice < 0 || parsedMinPrice < 0 || parsedTop < 0) {
        throw new Error('User input cannot be negative');
    }
    if (parsedMaxPrice < parsedMinPrice) {
        throw new Error('Max price cannot be less than min price');
    }
};

