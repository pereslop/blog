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
};

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(username);
    }
}

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPassword = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
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
const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters, but no more then 15'
    },
    {
        validator: validUsername,
        message: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen'
    }
];

const  passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'password must be at least 8 characters, but not more than 35'
  },
  {
    validator: validPassword,
    message: 'Password must have at least one uppercase, lowercase, special character, and number'

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
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
      validate: passwordValidators
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
});
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
