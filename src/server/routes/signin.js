const router = require('express').Router();
var mongoose = require('mongoose'); 

let User = require('../models/user.model');
let UserSession = require('../models/userSession.model')
router.route('/').get((req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error '+err))
})


//Sign up
router.route('/account/signup').post((req,res,next)=>{
    const {body} = req;
    const {
        firstName,
        lastName,
        phoneNumber,
        password
    } = body
    let {email} = body

    if(!firstName){
        return res.send({
            success:false,
            message:'Error:First Name cannot be blank!'
        })
    }
    if(!lastName){
        return res.send({
            success:false,
            message:'Error:Last Name cannot be blank!'
        })
    }
    if(!phoneNumber){
        return res.send({
            success:false,
            message:'Error:Phone Number cannot be blank!'
        })
    }
    if(!email){
        return res.send({
            success:false,
            message:'Error:Email cannot be blank!'
        })
    }
    if(!password){
        return res.send({
            success:false,
            message:'Error:Password cannot be blank!'
        })
    }

    email = email.toLowerCase()
    //Verify email doesn't exist 
    User.find({
        email:email
    },(err,previousUsers)=>{
        if(err){
            return res.send('Server error')
        }else if (previousUsers.length>0){
            return res.send("Account already exist")
        }
    })
    const newUser = new User()

    newUser.email = email;
    newUser.phoneNumber = phoneNumber
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);

    console.log(newUser)
    newUser.save()
        .then(()=>res.json('newUser added'))
        .catch(err=>res.status(400).json('Error '+err))
    // newUser.save((err,user)=>{
    //     if(err){
    //         console.log()
    //         return res.send({
    //             success:false,
    //             message:'Error:Server error!'
    //         })
    //     }
    //     return res.send({
    //         success:true,
    //         message:':Signed up!'
    //     })
    // })
})
//Sign in
router.route('/account/signin').post((req,res,next)=>{
    const {body} = req;
    const {
        password
    } = body
    let {email} = body

    if(!email){
        return res.send({
            success:false,
            message:'Error:Email cannot be blank!'
        })
    }
    if(!password){
        return res.send({
            success:false,
            message:'Error:Password cannot be blank!'
        })
    }

    email = email.toLowerCase()
    User.find({
        email:email
    },(err,users)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error:Server error!'
            })
        }
        if (users.length!=1){
            return res.send({
                success:false,
                message:'Error:Invalid Email'
            })  
        }
        const user = users[0]
        if(!user.validPassword(password)){
            return res.send({
                success:false,
                message:'Error:Invalid Password'
            })
        }
        //Otherwise correct user 
        const userSession = new UserSession();
        userSession.userId = user._id
        userSession.save((err,doc)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error:Server Error'
                }) 
            }
            return res.send({
                success:true,
                message:'Signed Up',
                token:doc._id
            }) 
        })
    })
})
//Verify
router.route('/account/verify').get((req,res,next)=>{
    //Get the token
    const {query} = req
    const {token} = query
    //?token=test

    //Verify the token is one of a kind and it's not deleted
    UserSession.find({
        _id:token,
        isDeleted:false
    },(err,sessions)=>{
        if(err){
            console.log(err)
            return res.send({
                success:false,
                message:'Error:Server Error'
            })
        }
        if(sessions.length!=1){
            return res.send({
                success:false,
                message:'Error:Invalid,more than 1 session or not found'
            })
        }else{
            console.log(sessions)
            User.find({
                _id:sessions[0].userId
            },(err,users)=>{
                if(err){
                    return res.send({
                        success:false,
                        message:'Error:Server error!'
                    })
                }
                const user = users[0]
                return res.send({
                    success:true,
                    message:'Successfully found the user',
                    userName:user.firstName+" "+user.lastName,
                    email:user.email,
                    phoneNumber:user.phoneNumber,
                    role:user.role
                })
            })
        }

    })
})
//Logout
router.route('/account/logout').get((req,res,next)=>{
    //Get the token
    const {query} = req
    const {token} = query
    //?token=test

    //Verify the token is one of a kind and it's not deleted
    UserSession.findOneAndUpdate({
        _id:token,
        isDeleted:false
    },{
        $set:{
            isDeleted:true
        }
    },null,(err,sessions)=>{
        if(err){
            console.log(err)
            return res.send({
                success:false,
                message:'Error:Server Error'
            })
        }
        return res.send({
            success:true,
            message:'Good'
        })
    })
})

module.exports = router