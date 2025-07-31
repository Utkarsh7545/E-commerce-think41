const mysql = require('mysql2/promise');

// Reusable DB connection
const connectDB = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodepass',
    database: 'products_db',
  });
};

// GET /api/departments - All departments
const getAllDepartments = async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM departments');
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server error while fetching departments.' });
  }
};

// GET /api/departments/:id - Department by ID
const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      'SELECT * FROM departments WHERE id = ?', [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`Error fetching department ${id}:`, error);
    res.status(500).json({ message: 'Server error while fetching department.' });
  }
};

// GET /api/departments/:id/products - Products in a department
const getProductsByDepartmentId = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(`
      SELECT p.*, d.name AS department_name
      FROM products p
      LEFT JOIN departments d ON p.department_id = d.id
      WHERE p.department_id = ?
    `, [id]);
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching products for department ${id}:`, error);
    res.status(500).json({ message: 'Server error while fetching department products.' });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getProductsByDepartmentId,
};
