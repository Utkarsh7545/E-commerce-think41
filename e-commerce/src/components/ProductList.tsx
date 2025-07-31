import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  brand: string;
  retail_price: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <Link to={`/product/${p.id}`} className="block hover:text-blue-600">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-600">{p.brand} • ₹{p.retail_price}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
