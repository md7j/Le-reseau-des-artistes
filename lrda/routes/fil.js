var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Publication = mongoose.model('Publication');

router.get('/', async function(req, res, next) {
  const user = {
    username: req.user.username,
    email: req.user.email,
    image: req.user.image,
    bio: req.user.bio
  }
  friends = req.user.friends
  publications = []
  for (var k = 0; k < friends.length; k++) {
    var pubs = await Publication.find({owner: friends[k]})
    for (var i = 0; i < pubs.length; i++) {
      pubs[i].views = pubs[i].views + 1
      await pubs[i].save()
      author = await User.findOne({_id: friends[k]})
      var liked = false
      if (pubs[i].likes.indexOf(friends[k]) != -1)
        liked = true
      publications.push({
        _id: pubs[i]._id,
        author: author.email,
        liked: liked,
        type: pubs[i].type,
        description: pubs[i].description,
        content: pubs[i].content,
        likes: pubs[i].likes.length,
        views: pubs[i].views
      })
    }
  }
  res.render('fil', { user: user, publications: publications });
});

router.post('/like', async function(req, res, next) {
  id = req.body.value

  publication = await Publication.findOne({ _id: id })
  publication.likes.push(req.user._id)
  await publication.save()
  res.send("ok");
});

router.post('/dislike', async function(req, res, next) {
  id = req.body.value

  publication = await Publication.findOne({ _id: id })
  console.log(publication.likes)
  publication.likes.splice(publication.likes.indexOf(req.user._id), 1)
  console.log(publication.likes, publication.likes.indexOf(req.user._id))
  await publication.save()
  res.send("ok");
});

module.exports = router;
