const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productRoutes); 
app.use('/api', departmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
