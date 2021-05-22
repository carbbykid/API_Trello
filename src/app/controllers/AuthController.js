const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }

        let user = new User({
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
        })

        user.save()
        .then(user =>{
            res.json({
                message: 'User add succcessfully !'
            })
        })
        .catch(err =>{
            res.json({
                message: 'An error occured !'
            })
        })
    })
}

const login = (req, res, next) =>{
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({$or: [{email: username},{phone: username}]})
    .then(user =>{
        if(user){
            bcryptjs.compare(password, user.password, (err, result)=>{
                if(err){
                    res.json({
                        error: err
                    })
                }

                if(result){
                   let token = jwt.sign({name: user.name}, 'AZQ,Pi()/', { expiresIn: '1h' })
                   res.json({
                       message: 'Login Successful !',
                       token
                    })
                }else{
                    res.json({
                        message: 'Password does not matched !'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found !'
            })
        }

    })
}


module.exports = { register, login }