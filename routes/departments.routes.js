const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAllDepartments);

router.get('/departments/random', DepartmentController.getRandomDepartment);

router.get('/departments/:id', DepartmentController.getDepartmentById);

router.post('/departments', DepartmentController.addDepartment);

router.put('/departments/:id', DepartmentController.editDepartment);

router.delete('/departments/:id', DepartmentController.deleteDepartment);

module.exports = router;
