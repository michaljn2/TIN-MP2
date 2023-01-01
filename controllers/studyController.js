const StudentRepository = require('../repository/sequelize/StudentRepository');
const GroupRepository = require('../repository/sequelize/GroupRepository');
const StudyRepository = require('../repository/sequelize/StudyRepository');
exports.showStudyList = (req, res, next) => {
    StudyRepository.getStudies()
        .then(studies => {
            res.render('pages/study/list', {
                studies: studies,
                navLocation: 'study'
            });
        });
}

exports.showAddStudyForm = (req, res, next) => {
    let allStuds, allGroups;
    StudentRepository.getStudents()
        .then(studs => {
            allStuds = studs;
            return GroupRepository.getGroups();
        })
        .then(groups => {
            allGroups = groups;
            res.render('pages/study/form', {
                study: {},
                formMode: 'createNew',
                allStuds: allStuds,
                allGroups: allGroups,
                pageTitle: req.__('study.form.add.pageTitle'),
                btnLabel: req.__('study.form.add.btnLabel'),
                formAction: '/studies/add',
                navLocation: 'study',
                validationErrors: []
            });
        });
}

exports.showStudyDetails = (req, res, next) => {
    const studyId = req.params.studyId;
    let allStuds, allGroups, study;
    StudyRepository.getStudyById(studyId)
        .then(stdy => {
            study = stdy;
            return StudentRepository.getStudents()
                .then(studs => {
                    allStuds = studs;
                    return GroupRepository.getGroups()
                        .then(groups => {
                            allGroups = groups;
                            res.render('pages/study/form', {
                                study: study,
                                formMode: 'showDetails',
                                allStuds: allStuds,
                                allGroups: allGroups,
                                pageTitle: req.__('study.form.details.pageTitle'),
                                formAction: '',
                                navLocation: 'study',
                                validationErrors: []
                            });
                        });
                });
        });
}

exports.showEditStudy = (req, res, next) => {
    const studyId = req.params.studyId;
    let allStuds, allGroups, study;
    StudyRepository.getStudyById(studyId)
        .then(stdy => {
            study = stdy;
            return StudentRepository.getStudents()
                .then(studs => {
                    allStuds = studs;
                    return GroupRepository.getGroups()
                        .then(groups => {
                            allGroups = groups;
                            res.render('pages/study/form', {
                                study: study,
                                formMode: 'edit',
                                allStuds: allStuds,
                                allGroups: allGroups,
                                pageTitle: req.__('study.form.edit.pageTitle'),
                                btnLabel: req.__('study.form.edit.btnLabel'),
                                formAction: '/studies/edit',
                                navLocation: 'study',
                                validationErrors: []
                            });
                        });
                });
        });
}

exports.addStudy = (req, res, next) => {
    const studyData = { ...req.body};
    let allStuds, allGroups;
    StudyRepository.createStudy(studyData)
        .then(result => {
            res.redirect('/studies');
        })
        .catch(err => {
            return StudentRepository.getStudents()
                .then(studs => {
                    allStuds = studs;
                    return GroupRepository.getGroups()
                        .then(groups => {
                            allGroups = groups;
                            res.render('pages/study/form', {
                                study: studyData,
                                formMode: 'createNew',
                                allStuds: allStuds,
                                allGroups: allGroups,
                                pageTitle: req.__('study.form.add.pageTitle'),
                                btnLabel: req.__('study.form.add.btnLabel'),
                                formAction: '/studies/add',
                                navLocation: 'study',
                                validationErrors: err.errors
                            });
                        })
                });
        });
};

exports.updateStudy = (req, res, next) => {
    const studyId = req.body._id;
    const studyData = { ...req.body};
    let allStuds, allGroups, study;
    StudyRepository.updateStudy(studyId, studyData)
        .then(result => {
            res.redirect('/studies');
        })
        .catch(err => {
            return StudentRepository.getStudents()
                .then(studs => {
                    allStuds = studs;
                    return GroupRepository.getGroups()
                        .then(groups => {
                            allGroups = groups;
                                    res.render('pages/study/form', {
                                        study: studyData,
                                        formMode: 'edit',
                                        allStuds: allStuds,
                                        allGroups: allGroups,
                                        pageTitle: req.__('study.form.edit.pageTitle'),
                                        btnLabel: req.__('study.form.edit.btnLabel'),
                                        formAction: '/studies/edit',
                                        navLocation: 'study',
                                        validationErrors: err.errors
                                    });
                        });
                });
        });
};

exports.deleteStudy = (req, res, next) => {
    const studyId = req.params.studyId;
    StudyRepository.deleteStudy(studyId)
        .then( () => {
            res.redirect('/studies');
        });
};