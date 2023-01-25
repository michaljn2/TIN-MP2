const StudentRepository = require('../repository/sequelize/StudentRepository');
exports.getStudents = (req, res, next) => {
    StudentRepository.getStudents()
        .then(studs => {
            res.status(200).json(studs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStudentById = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            if (!stud) {
                res.status(404).json({
                    message: 'Student with id: ' + studId + ' not found'
                })
            } else {
                res.status(200).json(stud);
            }
        });
};

exports.createStudent = (req, res, next) => {
    StudentRepository.createStudent(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.errors);
        });
};

exports.updateStudent = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.updateStudent(studId, req.body)
        .then(result => {
            res.status(200).json({message: 'Student updated!', stud: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.errors);
        });
};

exports.deleteStudent = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.deleteStudent(studId)
        .then(result => {
            res.status(200).json({message: 'Removed student', stud: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.errors);
        });
};