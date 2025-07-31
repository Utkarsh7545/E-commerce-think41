import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/" className="text-3xl font-bold text-center block text-blue-700 hover:underline">
          📦 Product Dashboard
        </Link>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
