const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Study = sequelize.define('Study', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            }
        }
    },
    grade: {
        type: Sequelize.DECIMAL(2,1),
        allowNull: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            }
        }
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                // msg: "This field is required"
                msg: "required"
            }
        }
    }
}, { timestamps: false }
);
module.exports = Study;