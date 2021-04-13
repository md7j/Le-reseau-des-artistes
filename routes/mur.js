var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Publication = mongoose.model('Publication');

router.get('/', async function(req, res, next) {
  const user = {
    username: req.user.username,
    email: req.user.email,
    bio: req.user.bio,
    publications: []
  }
  if (req.user.image)
    user['image'] = req.user.image
  publications = await Publication.find({owner: req.user._id})
  publications.forEach(element => {
    var liked = false
    if (element.likes.indexOf(req.user._id) != -1)
      liked = true
    user.publications.push({
      _id: element._id,
      type: element.type,
      description: element.description,
      content: element.content,
      likes: element.likes.length,
      views: element.views,
      liked: liked
    })
  });
  res.render('mur', { user: user });
});

router.get('/mur/:user', async function(req, res, next) {
  requested = await User.findOne({email: req.params.user})
  if (!requested)
    return res.redirect('/')
  const user = {
      username: req.user.username,
      email: req.user.email,
      image: req.user.image
  }
  const publications = await Publication.find({owner: requested._id})
  var other = {
    username: requested.username,
    bio: requested.bio,
    publications: []
  }
  publications.forEach(element => {
    var liked = false
    if (element.likes.indexOf(req.user._id) != -1)
      liked = true
    other['publications'].push({
      _id: element._id,
      author: requested.username,
      type:element.type,
      description:element.description,
      content:element.content,
      likes: element.likes.length,
      views: element.views,
      liked: liked
    })
  });
  res.render('mur_friend', { user: user, other: other });
});


router.post('/addPublication', async function(req, res, next) {
  const publication = new Publication({
    type: req.body.type,
    description: req.body.description,
    owner: req.user._id,
    likes: [],
    views: 1
  })
  if (req.files && req.files.media) {
    publication.content = req.files.media.name.replace(/\s/g, '')
    req.files.media.mv(__dirname + '/../public/images/publications/' + publication.content.replace(/\s/g, ''), function(err) {
      if (err)
        return res.status(500).send(err);
    });
  }
  console.log(publication)
  await publication.save()
  res.json("ok")
  // res.render('mur', { user: user });
});

module.exports = router;
