const StudyRepository = require('../repository/sequelize/StudyRepository');
exports.getStudies = (req, res, next) => {
    StudyRepository.getStudies()
        .then(studies => {
            res.status(200).json(studies);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStudyById = (req, res, next) => {
    const studyId = req.params.studyId;
    StudyRepository.getStudyById(studyId)
        .then(study => {
            if (!study) {
                res.status(404).json({
                    message: 'Study with id: ' + studyId + ' not found'
                })
            } else {
                res.status(200).json(study);
            }
        });
};

exports.createStudy = (req, res, next) => {
    StudyRepository.createStudy(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateStudy = (req, res, next) => {
    const studyId = req.params.studyId;
    StudyRepository.updateStudy(studyId, req.body)
        .then(result => {
            res.status(200).json({message: 'Study updated!', study: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteStudy = (req, res, next) => {
    const studyId = req.params.studyId;
    StudyRepository.deleteStudy(studyId)
        .then(result => {
            res.status(200).json({message: 'Removed study', study: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};