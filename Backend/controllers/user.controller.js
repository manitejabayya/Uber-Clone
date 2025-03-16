const userModel = require('../models/user.model');
const userservice = require('../services/user.service');
const {validationResult} = require('express-validator');


module.exports.registeruser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password} = req.body;

    const hashedpassword = await userModel.hashPassword(password);

    const user = await userservice.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}