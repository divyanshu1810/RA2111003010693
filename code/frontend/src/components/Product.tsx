import React from "react";
import Link from "next/link";

export interface ProductProps {
    _id: number;
    name: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount?: number;
    availability: boolean;
    image: string;
}

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
    const { _id, name, company, price, rating, discount, availability, image } = product;

    const discountedPrice = discount ? price * (1 - discount / 100) : price;

    return (
        <Link href={`/product/${_id}`}>
            <div className="flex flex-col rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col px-4 py-2">
                    <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-700">{company}</p>
                    <div className="flex items-center mt-2">
                        {discount && (
                            <span className="text-red-500 line-through mr-2">{price.toFixed(2)}</span>
                        )}
                        <span className="text-lg font-semibold text-gray-900">{discountedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        {/* <Rating value={rating} readOnly precision={0.5} size="small" /> */}
                        <span className="text-sm text-gray-700 ml-2">({rating})</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{availability ? "In Stock" : "Out of Stock"}</p>
                </div>
            </div>
        </Link>
    );
};

export default Product;
