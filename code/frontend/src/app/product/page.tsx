"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const ProductDetailsPage = () => {
    const searchParams = useSearchParams()

    const _id = searchParams.get('id');
    const categoryName = searchParams.get('categoryName');
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (_id) {
            const fetchProduct = async () => {
                const res = await fetch('http://localhost:3000/api/categories/Phone/products/' + _id);
                const data = await res.json();
                setProduct(data);
            };
            fetchProduct();
        }

    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Product Details</h1>
            {product && (
                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">{product.product.productName}</h2>
                    <p className="text-gray-600 mb-2">{product.product.companyName}</p>
                    <p className="text-lg font-semibold mb-2">${product.product.price}</p>
                    {product.product.discount > 0 && (
                        <p className="text-sm text-gray-500 mb-2">Discount: {product.product.discount}%</p>
                    )}
                    <p className="text-sm text-gray-500 mb-2">{product.product.availability ? "In Stock" : "Out of Stock"}</p>
                    <p className="text-sm text-gray-500 mb-2">Category: {product.product.categoryName}</p>
                    <p className="text-sm text-gray-500 mb-2">Rating: {product.product.rating}</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
