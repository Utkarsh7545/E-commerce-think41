import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  brand: string;
  cost: number;
};

const DepartmentDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [deptName, setDeptName] = useState<string>('');

  useEffect(() => {
    const fetchDepartmentProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/departments/${id}/products`);
        const data = await res.json();
        setProducts(data);
        if (data.length > 0) setDeptName(data[0].department_name); // if available in product
      } catch (error) {
        console.error('Error fetching department products:', error);
      }
    };

    fetchDepartmentProducts();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{deptName || 'Department'} Products</h2>
        <Link to="/departments" className="text-blue-600 hover:underline">
          ← Back to Departments
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found in this department.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id} className="p-3 border rounded bg-white shadow-sm">
              <strong>{product.name}</strong> – {product.brand} (${product.cost})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentDetails;
