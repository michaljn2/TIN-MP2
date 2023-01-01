const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

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
                msg: "This field is required"
            },
            is: {
                args: /20[0-9][0-9][LZ]-[A-Z]{2,3}-[1-9][0-9]c/,
                msg: "This field must contain semester name, course and group number separated by '-'"
            },
        }
    },
    course: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field is required"
            },
            is: {
                args: /[A-Z]{2,3}/,
                msg: "This field must contain 2-3 big letters"
            },
            isCourseSameAsShortcutCourse(value){
                const course = this.shortcut.split('-')[1];
                if (value != course){
                    throw new Error('Course must be the same as defined in shortcut');
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
                msg: "This field is required"
            },
            isInt: {
                msg: "This field must be an integer"
            },
            min: {
                args: 1,
                msg: "This field must be from 1 to 150"
            },
            max: {
                args: 150,
                msg: "This field must be from 1 to 150"
            }
        }
    }
}, { timestamps: false }
);
module.exports = Group;