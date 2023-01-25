const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');

const studApiController = require('../../api/StudentAPI');

router.get('/', studApiController.getStudents);
router.get('/:studId', studApiController.getStudentById);
router.post('/', isAuth, studApiController.createStudent);
router.put('/:studId', isAuth, studApiController.updateStudent);
router.delete('/:studId', isAuth, studApiController.deleteStudent);

module.exports = router;