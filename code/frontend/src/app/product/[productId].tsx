// pages/[productId].tsx
import { useRouter } from 'next/router';

const ProductDetailsPage = () => {
    const router = useRouter();
    const { productId } = router.query;

    // Fetch product details based on productId from your data source
    // For now, let's just display the productId
    return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
        </div>
    );
};

export default ProductDetailsPage;
