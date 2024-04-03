import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';


type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
        try {
            const validatedSchema = await schema.parseAsync(req[location]);
            req[location] = validatedSchema;
            next();
        } catch (error) {
            return res.status(500).json({
                error,
            });
        }
    };
}

export const checkValidInput = (parsedMaxPrice: number, parsedMinPrice: number, parsedTop: number, sortBy: string) => {
    if (isNaN(parsedMaxPrice) || isNaN(parsedMinPrice) || isNaN(parsedTop)) {
        throw new Error('User input is not a number');
    }
    if (parsedMaxPrice < 0 || parsedMinPrice < 0 || parsedTop < 0) {
        throw new Error('User input cannot be negative');
    }
    if (parsedMaxPrice < parsedMinPrice) {
        throw new Error('Max price cannot be less than min price');
    }
    if (!sortBy || sortBy.length < 0 && !['price', 'rating', 'discount'].includes(sortBy)) {
        throw new Error('Invalid sortBy parameter');
    }
};