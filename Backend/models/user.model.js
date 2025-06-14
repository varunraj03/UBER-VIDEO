const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname    : {
        firstname: {
        type: String,
        required: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
    },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    sockedetId: {
        type: String,
    },
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET)
        return token;
} // Generate JWT token for the user



userSchema.methods.comparePassword =async function(password){
        return await bcrypt.compare(password,this.password);
}//



userSchema.statics.hashPassword= async function (password) {
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user',userSchema);

module.exports=userModel;

// isko require kernge controller pe


