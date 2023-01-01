const StudentRepository = require('../repository/sequelize/StudentRepository');
const authUtil = require('../utils/authUtils');
exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    StudentRepository.findByEmail(email)
        .then(stud => {
            if(!stud) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy adres email lub hasło'
                })
            } else if (authUtil.comparePasswords(password, stud.password) === true){
                req.session.loggedUser = stud;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy adres email lub hasło'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
};

exports.logout = (req,res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

exports.updateStudentPassword = (req, res, next) => {
    const studId = req.body._id;
    const studData = {...req.body};
    StudentRepository.updateStudent(studId, studData)
        .then(() => {
            res.redirect('/');
        })
}

exports.showUpdatePasswordForm = (req, res, next) => {
    res.render('changePassword', {
        navLocation: 'student',
        validationErrors: []
    });
}