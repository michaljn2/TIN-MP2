const express = require('express');
const router = express.Router();

const studApiController = require('../../api/StudentAPI');

router.get('/', studApiController.getStudents);
router.get('/:studId', studApiController.getStudentById);
router.post('/', studApiController.createStudent);
router.put('/:studId', studApiController.updateStudent);
router.delete('/:studId', studApiController.deleteStudent);

module.exports = router;