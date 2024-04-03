import React from "react";
import Link from "next/link";

export interface ProductProps {
    _id: number;
    productName: string;
    companyName: string;
    price: number;
    discount: number;
    availability: boolean;
    categoryName: string;
    rating: number;
}

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
    const { _id, productName, companyName, price, discount, availability, categoryName, rating } = product;

    const discountedPrice = discount ? price * (1 - discount / 100) : price;

    return (
        <Link href={`/product?id=${_id}&?categoryName=${categoryName}`}>
            <div className="flex flex-col rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col px-4 py-2">
                    <h3 className="text-lg font-medium text-gray-900">{productName}</h3>
                    <p className="text-sm text-gray-700">{companyName}</p>
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
                    <p>
                        <span className="text-sm text-gray-700">Category: </span>
                        <span className="text-sm text-gray-500">{categoryName}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Product;
