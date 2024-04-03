import { Request, Response } from "express";
import { handleAPICall } from "../utils";

export const handleGetProducts = async (req: Request, res: Response) => {
    try {
        const { companyName, categoryName } = req.params as { companyName: string, categoryName: string };
        const { maxPrice, minPrice, top } = req.query as { maxPrice: string, minPrice: string, top: string };
        console.log(companyName, categoryName, maxPrice, minPrice, top);
        const data = await handleAPICall(companyName, categoryName, maxPrice, minPrice, top);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};