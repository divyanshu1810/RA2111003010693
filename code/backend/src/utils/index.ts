import config from "../config";
import { Product } from "../models";

const baseURL = config.baseUrl;
const authToken = config.token.secret;

export const handleAPICall = async (companyName: string, categoryName: string, maxPrice: number, minPrice: number, top: number, sortBy: string) => {
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
    if (sortBy) {
        data.sort((a: Product, b: Product) => {
            if (sortBy === 'price') {
                return b.price - a.price;
            } else if (sortBy === 'rating') {
                return b.rating - a.rating;
            } else if (sortBy === 'discount') {
                return b.discount - a.discount;
            }
        });
    }
    return data;
};



