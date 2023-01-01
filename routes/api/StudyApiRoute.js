const express = require('express');
const router = express.Router();

const studyApiController = require('../../api/StudyAPI');

router.get('/', studyApiController.getStudies);
router.get('/:studyId', studyApiController.getStudyById);
router.post('/', studyApiController.createStudy);
router.put('/:studyId', studyApiController.updateStudy);
router.delete('/:studyId', studyApiController.deleteStudy);

module.exports = router;