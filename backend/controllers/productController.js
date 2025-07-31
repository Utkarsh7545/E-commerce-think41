const mysql = require('mysql2/promise');

// Create a reusable function to connect to the database
const connectDB = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodepass',
    database: 'products_db',
  });
};

// GET /api/products - Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM products');
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
};

// GET /api/products/:id - Fetch product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    res.status(500).json({ message: 'Server error while fetching the product.' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
