import { Request, Response } from "express";
import { getProducts, getProductsById } from "../utils";
import { checkValidInput } from "../middlwares";

export const handleGetProducts = async (req: Request, res: Response) => {
    try {
        const { companyName, categoryName } = req.params as { companyName: string, categoryName: string };
        const { maxPrice, minPrice, top, page, sortBy } = req.query as { maxPrice: string, minPrice: string, top: string, page: string, sortBy: string };
        const parsedMaxPrice = parseFloat(maxPrice);
        const parsedMinPrice = parseFloat(minPrice);
        const parsedTop = parseInt(top);
        const parsedPage = parseInt(page) || 1;
        checkValidInput(parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);

        if (parsedTop <= 10) {
            const data = await getProducts(categoryName, parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);
            return res.status(200).json({
                products: data,
                currentPage: 1,
                totalPages: 1
            });
        } else {
            const startIndex = (parsedPage - 1) * 10;
            const endIndex = parsedPage * 10;
            const data = await getProducts(categoryName, parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);
            const paginatedData = data.slice(startIndex, endIndex);
            const totalPages = Math.ceil(data.length / 10);

            return res.status(200).json({
                products: paginatedData,
                currentPage: parsedPage,
                totalPages: totalPages
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetProductById = async (req: Request, res: Response) => {
    try {
        const { productId, categoryName } = req.params as { productId: string, categoryName: string };
        const data = await getProductsById(productId, categoryName);
        if (!data) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            product: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
