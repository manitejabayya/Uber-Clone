const userModel = require('../models/user.model');
const userservice = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registeruser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedpassword = await userModel.hashPassword(password);

    const user = await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedpassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.loginuser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userservice.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password); 
    if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });

}

module.exports.getuserProfile = async (req,res,next)=>{
    res.status(200).json(req.user);
    
}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logged out'});
}


