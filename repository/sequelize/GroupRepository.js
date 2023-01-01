const Student = require('../../model/sequelize/Student');
const Group = require('../../model/sequelize/Group');
const Study = require('../../model/sequelize/Study');

exports.getGroups = () => {
    return Group.findAll();
}

exports.getGroupById = (groupId) => {
    return Group.findByPk(groupId,
        {
            include: [{
                model: Study,
                as: 'studies',
                include: [{
                    model: Student,
                    as: 'student'
                }]
            }]
        });
};

exports.createGroup = (newGroupData) => {
    if(newGroupData.faculty == ''){
        newGroupData.faculty = null;
    }
    return Group.create({
        shortcut: newGroupData.shortcut,
        course: newGroupData.course,
        faculty: newGroupData.faculty,
        capacity: newGroupData.capacity
    });
};

exports.updateGroup = (groupId, groupData) => {
    if (groupData.faculty == ''){
        groupData.faculty = null;
    }
    const shortcut = groupData.shortcut;
    const course = groupData.course;
    const faculty = groupData.faculty;
    const capacity = groupData.capacity;
    return Group.update(groupData, {where: {_id: groupId}});
};

exports.deleteGroup = (groupId) => {
    return Group.destroy({
        where: {_id: groupId}
    });
};