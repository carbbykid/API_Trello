const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const getUserInfo = (req, res, next) =>{
    const token =  req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'AZQ,Pi()/')
    User.findOne({name:decode.name})
    .then(user =>{
        if(user){
            res.json({
                user
            })
        } else{
            res.json({
                message: 'User not found'
            })
        }
    })
}

module.exports = {getUserInfo}