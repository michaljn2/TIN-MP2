const Student = require('../../model/sequelize/Student');
const Group = require('../../model/sequelize/Group');
const Study = require('../../model/sequelize/Study');
const {escapeRegExpChars} = require("ejs/lib/utils");
const authUtils = require('../../utils/authUtils');

exports.getStudents = () => {
    return Student.findAll();
}

exports.getStudentById = (studId) => {
    return Student.findByPk(studId,
        {
            include: [{
                model: Study,
                as: 'studies',
                include: [{
                    model: Group,
                    as: 'group'
                }]
            }]
        });
};

exports.createStudent = (newStudData) => {
    return Student.create({
        firstName: newStudData.firstName,
        lastName: newStudData.lastName,
        index: newStudData.index,
        birthDate: newStudData.birthDate,
        email: newStudData.email,
        password: authUtils.hashPassword(newStudData.password)
    });
};

exports.updateStudent = (studId, studData) => {
    const firstName = studData.firstName;
    const lastName = studData.lastName;
    const index = studData.index;
    const birthDate = studData.birthDate;
    const email = studData.email;
    const password = studData.password;
    if(password) {
        return Student.update({
            firstName: studData.firstName,
            lastName: studData.lastName,
            index: studData.index,
            birthDate: studData.birthDate,
            email: studData.email,
            password: authUtils.hashPassword(studData.password)
        }, {where: {_id: studId}});
    } else {
        return Student.update({
            firstName: studData.firstName,
            lastName: studData.lastName,
            index: studData.index,
            birthDate: studData.birthDate,
            email: studData.email
        }, {where: {_id: studId}});
    }
};

exports.deleteStudent = (studId) => {
    return Student.destroy({
        where: {_id: studId}
    });
};

exports.findByEmail = (email) => {
    return Student.findOne({
        where: {email: email}
    });
}
