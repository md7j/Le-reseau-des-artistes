const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  image: String,
  hash: String,
  salt: String,
  friends: [String],
  publications: [String]
}, {timestamps: true});

UserSchema.statics.getFriendsJson = async function(friendsList) {
  var friends = []

  for (var i = 0; i < friendsList.length; i++) {
    friend = await this.findOne({_id: friendsList[i]})
    friends.push({
      username: friend.username,
      email: friend.email,
      bio: friend.bio,
      image: friend.image
    });
  }
  return friends
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    bio: this.bio,
    image: this.image,
    friends: this.friends,
    token: this.generateJWT(),
  };
};

mongoose.model('User', UserSchema);