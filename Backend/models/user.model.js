const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must contain 3 characters']
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,'Last name must contain 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must contain the atleast 5 charchater ']
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,

    },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
    
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
