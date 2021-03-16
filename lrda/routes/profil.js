var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs')

router.get('/', function(req, res, next) {
  const user = {
    username: req.user.username,
    email: req.user.email,
    bio: req.user.bio,
  }
  if (req.user.image)
    user['image'] = req.user.image
  res.render('profil', { user: user });
});

router.post('/update_profil', async function(req, res, next) {
    // console.log(req.files)
    // console.log(req.body.username)
    // console.log(req.body.email)
    // console.log(req.body.bio)
    console.log(__dirname)
    User.findOne({email: req.user.email})
           .then(async user => {
                if (req.body.username)
                    user.username = req.body.username
                if (req.body.email)
                    user.email = req.body.email
                if (req.body.bio)
                    user.bio = req.body.bio
                if (req.files != null) {
                    uploadPath = __dirname + '/../public/images/profiles/' + req.files.photo.name.replace(/\s/g, '');
                    if (user.image != 'default/profile.png')
                      fs.unlink(__dirname + '/../public/images/profiles/' + user.image, (err) => {
                          if (err) {
                            console.error(err)
                            return
                          }
                      })
                    user.image = req.files.photo.name.replace(/\s/g, '')
                    req.files.photo.mv(uploadPath, function(err) {
                        if (err)
                          return res.status(500).send(err);
                    });
                }
                await user.save()
                return res.redirect(302, '/profil');
                })
  });

module.exports = router;
