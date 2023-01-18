const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

// UWAGA wiadomosci wysylane przy walidacji zostały dostosowane do aplikacji React
// korzystajacej z API w tej aplikacji
const Group = sequelize.define('Group', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    shortcut: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            },
            is: {
                args: /20[0-9][0-9][LZ]-[A-Z]{2,3}-[1-9][0-9]c/,
                // msg: "This field must contain semester name, course and group number separated by '-'"
                msg: "shortcut"
            },
        }
    },
    course: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            },
            is: {
                args: /[A-Z]{2,3}/,
                // msg: "This field must contain 2-3 big letters"
            },
            isCourseSameAsShortcutCourse(value){
                const course = this.shortcut.split('-')[1];
                if (value != course){
                    throw new Error('courseFromShortcut');
                }
            }
        }
    },
    faculty: {
        type: Sequelize.STRING,
        allowNull: true
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            },
            isInt: {
                // msg: "This field must be an integer"
                msg: "capacity-integer"
            },
            min: {
                args: 1,
                // msg: "This field must be from 1 to 150"
                msg: "capacity-range"
            },
            max: {
                args: 150,
                // msg: "This field must be from 1 to 150"
                msg: "capacity-integer"
            }
        }
    }
}, { timestamps: false }
);
module.exports = Group;