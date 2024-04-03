import config from "../config";

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
