const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

// removes __v property from user when sending user as json
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

// has password on save
UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// rehash password on update
UserSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  const user = this;
  bcrypt.hash(user._update.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user._update.password = hash;
    next();
  });
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) return callback(err);
    else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };
