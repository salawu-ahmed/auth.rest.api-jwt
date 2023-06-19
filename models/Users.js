const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, ' Minimum password length is 6 characters']
    }
})

//using mongoose hooks to hash passwords before saving them into the database
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
    // this.password refers to the password the user inputs 
    // the object is created but is not saved hence the password in the obj is what use inputted

userSchema.statics.login = async function(email, password) {
    const isUser = await this.findOne({email})
    if(isUser){
        const passwordMatch = await bcrypt.compare(password, isUser.password)
        if(passwordMatch){
            return isUser
        } 
        throw Error ("incorrect password")
    }
    throw Error ("incorrect email")
}
const userModel = mongoose.model('user', userSchema)
module.exports = userModel