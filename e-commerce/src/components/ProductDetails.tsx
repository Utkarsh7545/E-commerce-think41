import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  retail_price: number;
  department_name: string;
  sku: string;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setError("");
      })
      .catch(() => {
        setError("Product not found or server error.");
      });
  }, [id]);

  return (
    <div className="space-y-4">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Product List
      </Link>

      {error && <p className="text-red-600">{error}</p>}

      {product && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Retail Price:</strong> ₹{product.retail_price}</li>
            <li><strong>Department:</strong> {product.department_name}</li>
            <li><strong>SKU:</strong> {product.sku}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
