import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import DepartmentList from './components/DepartmentList';
import DepartmentDetail from './components/DepartmentDetail';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 hover:underline"
          >
            📦 Product Dashboard
          </Link>
          <Link
            to="/departments"
            className="text-md text-blue-500 hover:underline"
          >
            View Departments
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
