const StudentRepository = require('../repository/sequelize/StudentRepository');
const config = require('../config/key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    StudentRepository.findByEmail(email)
        .then(user => {
            if (!user){
                return res.status(401).send({message: "auth.invalid"});
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({message: "auth.invalid"});
                    }

                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user._id});
                })
                .catch(err =>{
                    console.log(err);
                    res.status(501);
                })
        })
}