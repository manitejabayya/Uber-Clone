const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({ // Added 'await' here
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
}

module.exports.findOne = (filter) => {
    return userModel.findOne(filter); // Return the query object instead of awaiting it
};