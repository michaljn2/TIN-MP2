const StudentRepository = require('../repository/sequelize/StudentRepository');

exports.showStudentList = (req, res, next) => {
    StudentRepository.getStudents()
        .then(studs => {
            res.render('pages/student/list', {
                studs: studs,
                navLocation: 'student'
            });
        });
}

exports.showAddStudentForm = (req, res, next) => {
    res.render('pages/student/form', {
        stud:{},
        pageTitle: req.__('stud.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('stud.form.add.btnLabel'),
        formAction: '/students/add',
        navLocation: 'student',
        validationErrors: []
    });
}

exports.showStudentDetails = (req, res, next) => {
    const studId = req.params.studentId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'showDetails',
                pageTitle: req.__('stud.form.details.pageTitle'),
                formAction: '',
                navLocation: 'student',
                validationErrors: []
            });
        });
}

exports.showEditStudentForm = (req, res, next) => {
    const studId = req.params.studentId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'edit',
                pageTitle: req.__('stud.form.edit.pageTitle'),
                btnLabel: req.__('stud.form.edit.btnLabel'),
                formAction: '/students/edit',
                navLocation: 'student',
                validationErrors: []
            });
        });
}

exports.addStudent = (req, res, next) => {
    const studData = { ...req.body};
    StudentRepository.createStudent(studData)
        .then(result => {
            res.redirect('/students');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('email') && e.type == 'unique violation'){
                    e.message = "Podany email jest już używany";
                }
                if(e.path.includes('index') && e.type == 'unique violation'){
                    e.message = 'Podany indeks jest już używany';
                }
            });
            res.render('pages/student/form', {
                stud: studData,
                pageTitle: req.__('stud.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('stud.form.add.btnLabel'),
                formAction: '/students/add',
                navLocation: 'student',
                validationErrors: err.errors
            });
        });
};

exports.updateStudent = (req, res, next) => {
    const studId = req.body._id;
    const studData = { ...req.body};
    StudentRepository.updateStudent(studId, studData)
        .then(result => {
            res.redirect('/students');
        })
        .catch(err => {
            StudentRepository.getStudentById(studId)
                .then(std => {
                    studData.studies = std.studies;
                    err.errors.forEach(e => {
                        if (e.path.includes('email') && e.type == 'unique violation'){
                            e.message = "Podany email jest już używany";
                        }
                        if(e.path.includes('index') && e.type == 'unique violation'){
                            e.message = 'Podany indeks jest już używany';
                        }
                    });
                    res.render('pages/student/form', {
                        stud: studData,
                        formMode: 'edit',
                        pageTitle: req.__('stud.form.edit.pageTitle'),
                        btnLabel: req.__('stud.form.edit.btnLabel'),
                        formAction: '/students/edit',
                        navLocation: 'student',
                        validationErrors: err.errors
                    });
                })
        })
};

exports.deleteStudent = (req, res, next) => {
    const studId = req.params.studentId;
    StudentRepository.deleteStudent(studId)
        .then( () => {
            res.redirect('/students');
        });
};


