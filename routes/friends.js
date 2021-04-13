var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs')

router.get('/', async function (req, res, next) {
  const userr = {
    username: req.user.username,
    email: req.user.email,
    bio: req.user.bio,
    friends: []
  }
  if (req.user.friends)
    userr['friends'] = await User.getFriendsJson(req.user.friends)
  if (req.user.image)
    userr['image'] = req.user.image
  res.render('friends', { user: userr });
});

router.get('/search', async function (req, res, next) {
  var response = []
  users = await User.find(
      { "email": { "$regex": req.query.value} }
  );
  users.forEach(element => {
      response.push(element.email)
  });
  res.json(response);
});

router.post('/addFriend', async function (req, res, next) {
  user = await User.findOne(
    { "email": req.body.name }
  );
  req.user.friends.push(user._id);
  console.log(req.user.friends)
  await req.user.save()
  res.json("ez");
});

module.exports = router;
