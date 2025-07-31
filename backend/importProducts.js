const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

// MySQL DB connection config
const dbConfig = {
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodepass',
    database: 'products_db',
};  

// Define your table creation query
const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  cost DECIMAL(10,2),
  category VARCHAR(255),
  name VARCHAR(255),
  brand VARCHAR(255),
  retail_price DECIMAL(10,2),
  department VARCHAR(255),
  sku VARCHAR(100),
  distribution_center_id INT
);
`;

async function importCSVtoDB(csvFilePath) {
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute(createTableQuery);

  const insertQuery = `
    INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      cost=VALUES(cost),
      category=VALUES(category),
      name=VALUES(name),
      brand=VALUES(brand),
      retail_price=VALUES(retail_price),
      department=VALUES(department),
      sku=VALUES(sku),
      distribution_center_id=VALUES(distribution_center_id);
  `;

  const stream = fs.createReadStream(csvFilePath).pipe(csv());
  let count = 0;

  for await (const row of stream) {
    const {
      id,
      cost,
      category,
      name,
      brand,
      retail_price,
      department,
      sku,
      distribution_center_id,
    } = row;

    try {
      await connection.execute(insertQuery, [
        parseInt(id),
        parseFloat(cost),
        category,
        name,
        brand,
        parseFloat(retail_price),
        department,
        sku,
        parseInt(distribution_center_id),
      ]);
      count++;
    } catch (error) {
      console.error('Error inserting row:', row, error.message);
    }
  }

  console.log(`✅ Imported ${count} products successfully.`);
  await connection.end();
}

// Run the script
const csvFilePath = path.join(__dirname, 'products.csv'); 
importCSVtoDB(csvFilePath).catch(console.error);
