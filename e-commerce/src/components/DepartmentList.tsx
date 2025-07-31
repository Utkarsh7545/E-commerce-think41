import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Department = {
  id: number;
  name: string;
  product_count?: number;
};

const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/departments');
        const data: Department[] = await res.json();

        // Fetch product counts for each department
        const departmentsWithCount = await Promise.all(
          data.map(async (dept) => {
            try {
              const productRes = await fetch(`http://localhost:3000/api/departments/${dept.id}/products`);
              const products = await productRes.json();
              return { ...dept, product_count: products.length };
            } catch {
              return { ...dept, product_count: 0 };
            }
          })
        );

        setDepartments(departmentsWithCount);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Departments</h2>
        <Link to="/" className="text-blue-500 hover:underline">← Back to Products</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            to={`/departments/${dept.id}`}
            className="block bg-white p-4 rounded shadow hover:bg-blue-50"
          >
            <h3 className="text-lg font-semibold">{dept.name}</h3>
            <p className="text-sm text-gray-600">
              🧮 {dept.product_count ?? '...'} products
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
