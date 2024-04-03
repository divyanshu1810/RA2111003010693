import database from "../loaders/database";
import { Product } from "../models";
import { ObjectId } from 'mongodb';

export const getProducts = async (categoryName: string, maxPrice: number, minPrice: number, top: number, sortBy: string) => {
    const data_collection = await (await database()).collection('products');
    const data = await data_collection.find({
        categoryName,
        price: { $gte: minPrice, $lte: maxPrice }
    }).limit(top).toArray();
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

export const getProductsById = async (productId: string, categoryName: string) => {
    const data_collection = await (await database()).collection('products');
    const data = await data_collection.findOne({ _id: new ObjectId(productId), categoryName });
    return data;
}



