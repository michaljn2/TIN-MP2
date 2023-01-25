const express = require('express');
const router = express.Router();

const studyApiController = require('../../api/StudyAPI');
const isAuth = require('../../middleware/isAuth')

router.get('/', studyApiController.getStudies);
router.get('/:studyId', studyApiController.getStudyById);
router.post('/', isAuth, studyApiController.createStudy);
router.put('/:studyId', isAuth, studyApiController.updateStudy);
router.delete('/:studyId', isAuth, studyApiController.deleteStudy);

module.exports = router;