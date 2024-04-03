"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Product = ({ product }) => {
    const { id, name, company, price, rating, discount, availability, image } = product;
    const discountedPrice = discount ? price * (1 - discount / 100) : price;
    return (<div className="flex flex-col rounded-lg shadow-md overflow-hidden">
            <img src={image} alt={name} className="w-full h-64 object-cover"/>
            <div className="flex flex-col px-4 py-2">
                <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                <p className="text-sm text-gray-700">{company}</p>
                <div className="flex items-center mt-2">
                    {discount && (<span className="text-red-500 line-through mr-2">{price.toFixed(2)}</span>)}
                    <span className="text-lg font-semibold text-gray-900">{discountedPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center mt-1">
                    {/* <Rating value={rating} readOnly precision={0.5} size="small" /> */}
                    <span className="text-sm text-gray-700 ml-2">({rating})</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{availability ? "In Stock" : "Out of Stock"}</p>
            </div>
        </div>);
};
exports.default = Product;
//# sourceMappingURL=Product.js.map