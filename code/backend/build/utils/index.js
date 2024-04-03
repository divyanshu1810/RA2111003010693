"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAPICall = void 0;
const config_1 = __importDefault(require("../config"));
const baseURL = config_1.default.baseUrl;
const authToken = config_1.default.token.secret;
const handleAPICall = async (companyName, categoryName, maxPrice, minPrice, top, sortBy) => {
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
        data.sort((a, b) => {
            if (sortBy === 'price') {
                return b.price - a.price;
            }
            else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            else if (sortBy === 'discount') {
                return b.discount - a.discount;
            }
        });
    }
    return data;
};
exports.handleAPICall = handleAPICall;
//# sourceMappingURL=index.js.map