const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        // console.log("Email")
        // console.log(email)
        // console.log("Passowrd")
        // console.log(password)
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({email: email})
           .then(user => {
               console.log("USER")
               console.log(user)
               if (!user || !user.validatePassword(password)) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: req=>req.cookies.jwt,
    secretOrKey   : 'secret'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));