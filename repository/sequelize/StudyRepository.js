const Sequelize = require('sequelize');

const Student = require('../../model/sequelize/Student');
const Group = require('../../model/sequelize/Group');
const Study = require('../../model/sequelize/Study');

exports.getStudies = () => {
    return Study.findAll({include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Group,
                as: 'group'
            }]
    });
};

exports.getStudyById = (studyId) => {
    return Study.findByPk(studyId, {include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Group,
                as: 'group'
            }]
    });
};

exports.createStudy = (data) => {
    console.log(JSON.stringify(data));
    if(data.grade == ''){
        data.grade = null;
    }
    if (!data.itn){
        data.itn = 0;
    }
    return Study.create({
        student_id: data.student_id,
        group_id: data.group_id,
        itn: data.itn,
        grade: data.grade
    });
};

exports.updateStudy = (studyId, data) => {
    if (data.grade == ''){
        data.grade = null;
    }
    if (!data.itn){
        data.itn = 0;
    }
    return Study.update(data, {where: {_id: studyId}});
};

exports.deleteStudy = (studyId) => {
    return Study.destroy({
        where: {_id: studyId}
    });
};

exports.deleteManyStudies = (studiesIds) => {
    return Study.find({_id: { [Sequelize.Op.in]: studiesIds}})
}