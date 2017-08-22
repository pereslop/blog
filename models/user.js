/**
 * Created by mykola on 8/17/17.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if (!email) {
      return false;
  } else {
      if (email.length < 5 || email.length > 30) {
          return false;
      } else {
          return true;
      }
  }
};
let validEmailChecher = (email) => {
    if (!email) {
        return false;
    } else {

        const regExp = require('regex-email');
        return regExp.test(email);
    }
}
const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'email must be at least 5 characters, but not more than 30'
    },
    {
        validator: validEmailChecher,
        message: 'Must be a valid email'
    }
];
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err); // Ensure no errors
    this.password = hash; // Apply encryption to password
    next(); // Exit middleware
});
})
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
