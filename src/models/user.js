const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('age cannot be less than 0')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid email id!')
            }
        }
    } ,
    password: {
        type: String,
        require: true,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new Error("Invalid password!")
            }
            if (value.trim().length < 5){
                throw new Error("Password should exceed 5 characters")
            }
        }
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')
    return token
}

userSchema.statics.findByCredential = async (email, password) => {

    const user = await User.findOne({ email })
    if (!user){
        throw new Error('unable to login 1')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('unable to login 2')
    }

    return user
}

//Hash the plain text password
userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User