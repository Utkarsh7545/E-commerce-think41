const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentById,
  getProductsByDepartmentId,
} = require('../controllers/departmentController');

router.get('/departments', getAllDepartments);
router.get('/departments/:id', getDepartmentById);
router.get('/departments/:id/products', getProductsByDepartmentId);

module.exports = router;
