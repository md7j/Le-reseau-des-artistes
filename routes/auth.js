const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res, next) => {
    return res.render('auth');
});

router.post('/register', (req, res, next) => {
    const password = req.body.password;
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        image: "default/profile.png",
        friends: []
    });
    if (!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required',
            },
        });
    }
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if (!password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    // const newUser = new User(user);
    user.setPassword(password);
    user.save();
    res.cookie("jwt",user.generateJWT(),{httpOnly:true});
    res.redirect(302, '/');
});
/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('user')
        console.log(user)
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = user.generateJWT();
            res.cookie("jwt",token,{httpOnly:true});
            res.redirect(302, '/');
        });
    })(req, res);
});

router.get('/logout', function (req, res, next) {
    res.clearCookie("jwt");
    res.redirect(302, '/auth');
});

module.exports = router;    