const sequelize = require('./sequelize');

const Student = require('../../model/sequelize/Student');
const Group = require('../../model/sequelize/Group');
const Study = require('../../model/sequelize/Study');

const authUtil = require('../../utils/authUtils');
const passHash = authUtil.hashPassword('12345')

module.exports = () => {
    Student.hasMany(Study, {as: 'studies', foreignKey: {name:'student_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Study.belongsTo(Student, {as: 'student', foreignKey: {name: 'student_id', allowNull: false}});
    Group.hasMany(Study, {as: 'studies', foreignKey: {name: 'group_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Study.belongsTo(Group, {as: 'group', foreignKey: {name: 'group_id', allowNull: false}});

    let allStudents, allGroups;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Student.findAll();
        })
        .then(studs => {
            if (!studs || studs.length == 0) {
                return Student.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', index: 's22222', birthDate: '2001-02-11', email: 's22222@pja.edu.pl', password: authUtil.hashPassword('Haslo123')},
                    {firstName: 'Marek', lastName: 'Janczak', index: 's22233', birthDate: '2001-05-22', email: 's22233@pja.edu.pl', password: authUtil.hashPassword('mojehaslo')},
                    {firstName: 'Aleksander', lastName: 'Jurczak', index: 's22156', birthDate: '2000-10-28', email: 's22156@pja.edu.pl', password: authUtil.hashPassword('haselko')}
                ])
                    .then( () => {
                        return Student.findAll();
                    });
            } else {
                return studs;
            }
        })
        .then(studs => {
            allStudents = studs;
            return Group.findAll();
        })
        .then(groups => {
            if(! groups || groups.length == 0) {
                return Group.bulkCreate([
                    {shortcut: '2021L-ALG-11c', course: 'ALG', faculty: null, capacity: 15},
                    {shortcut: '2022Z-TIN-12c', course: 'TIN', faculty: 'Bazy Danych', capacity: 15},
                    {shortcut: '2021Z-GRK-13c', course: 'GRK', faculty: null, capacity: 16},
                    {shortcut: '2021Z-GRK-1w', course: 'GRK', faculty: null, capacity: 120},
                    {shortcut: '2022Z-AM-19c', course: 'AM', faculty: null, capacity: 16}
                ])
                    .then( () => {
                        return Group.findAll();
                    });
            } else {
                return groups;
            }
        })
        .then(groups => {
            allGroups = groups;
            return Study.findAll();
        })
        .then(studies => {
            if (!studies || studies.length == 0) {
                return Study.bulkCreate([
                    {student_id: allStudents[0]._id, group_id: allGroups[0]._id, itn: 0, grade: 4.5},
                    {student_id: allStudents[0]._id, group_id: allGroups[1]._id, itn: 1, grade: null},
                    {student_id: allStudents[1]._id, group_id: allGroups[2]._id, itn: 1, grade: null},
                    {student_id: allStudents[2]._id, group_id: allGroups[3]._id, itn: 0, grade: 3.0}
                ]);
            } else {
                return studies;
            }
        });
};