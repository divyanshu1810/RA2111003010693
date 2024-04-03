"use client";
import React, { useState, useEffect } from "react";
import Product from "../components/Product"; // Assuming correct path to Product component

export interface Products {
  products: {
    _id: number;
    productName: string;
    companyName: string;
    categoryName: string;
    price: number;
    rating: number;
    discount?: number; // Optional discount property
    availability: boolean;
  }[];
}

interface TopProductsProps {
  topProducts: Products[];
}

const TopProducts: React.FC<TopProductsProps> = ({ topProducts }) => {
  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topProducts?.map((product, key) => (
        <Product key={key} product={product} />
      ))}
    </div>
  );
};

export default function HomePage() {
  const [topProducts, setTopProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const limit = 5; // Assuming you want to display top 5 products
      const categoryName = "Phone";

      const res = await fetch(`http://localhost:3000/api/categories/${categoryName}/products?top=20&minPrice=10&maxPrice=100000&page=1&sortBy=price`);
      const data = await res.json();
      setTopProducts(data);
      console.log(data);
    };
    fetchTopProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">Top Products</h1>
      <TopProducts topProducts={topProducts.products} />
    </div>
  );
}
