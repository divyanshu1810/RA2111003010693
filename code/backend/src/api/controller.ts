import { Request, Response } from "express";
import { checkValidInput, handleAPICall } from "../utils";

export const handleGetProducts = async (req: Request, res: Response) => {
    try {
        const { companyName, categoryName } = req.params as { companyName: string, categoryName: string };
        const { maxPrice, minPrice, top, page } = req.query as { maxPrice: string, minPrice: string, top: string, page: string };
        const parsedMaxPrice = parseFloat(maxPrice);
        const parsedMinPrice = parseFloat(minPrice);
        const parsedTop = parseInt(top);
        const parsedPage = parseInt(page) || 1;
        checkValidInput(parsedMaxPrice, parsedMinPrice, parsedTop);

        if (parsedTop <= 10) {
            const data = await handleAPICall(companyName, categoryName, parsedMaxPrice, parsedMinPrice, parsedTop);
            return res.status(200).json({
                products: data,
                currentPage: 1,
                totalPages: 1
            });
        } else {
            const startIndex = (parsedPage - 1) * 10;
            const endIndex = parsedPage * 10;
            const data = await handleAPICall(companyName, categoryName, parsedMaxPrice, parsedMinPrice, parsedTop);
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
