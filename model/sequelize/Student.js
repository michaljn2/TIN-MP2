const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear() - 18;

if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
const nowString = [year, month, day].join('-');

const Student = sequelize.define('Student', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field is required"
            },
            len: {
                args: [2,60],
                msg: "This field must contain 2-60 signs"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field is required"
            },
            len: {
                args: [2,60],
                msg: "This field must contain 2-60 signs"
            },
        }
    },
    index: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^s[1-9][0-9]{0,4}/,
                msg: "This field must contain 's' and 1-5 signs student number"
            }
        }
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field is required"
            },
            isDate: {
                msg: "This field must be a date in 'yyyy-MM-dd' format"
            },
            isBeforeDate(value) {
                let nowDate = new Date(),
                    month = '' + (nowDate.getMonth() + 1),
                    day = '' + nowDate.getDate(),
                    year = nowDate.getFullYear() - 18;

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                const nowString = [year, month, day].join('-');
                const valueDate = new Date(value);
                const compareToDate = new Date(nowString);
                if (valueDate.getTime() > compareToDate.getTime()) {
                    throw new Error(__("student must be at least 18 years old"));
                }
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "This field is required"
            },
            len: {
                args:[5,60],
                msg: "This field must contain 5-60 signs"
            },
            isEmail: {
                msg: "This field must be a proper email address"
            },
            isSameAsIndex (value){
                if ((this.index + '@pja.edu.pl') != value){
                    throw new Error('Email must contain student index and @pja.edu.pl domain');
                }
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false }
);
module.exports = Student;