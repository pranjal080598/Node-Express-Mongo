var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next){
    if(req.decoded._doc.admin){
        next();
    }else{
        var err = new Error('You are not authorized!');
        err.status = 403;
        return next(err);
    }
};

//previous

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var User = require('./models/user');
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//
// var config = require('./config.js');
// exports.getToken = function(user) {
//     return jwt.sign(user, config.secretKey,
//         {expiresIn: 3600});
// };
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secretKey;
//
// exports.jwtPassport = passport.use(new JwtStrategy(opts,
//     (jwt_payload, done) => {
//         console.log("JWT payload: ", jwt_payload);
//         User.findOne({_id: jwt_payload._id}, (err, user) => {
//             if (err) {
//                 return done(err, false);
//             }
//             else if (user) {
//                 return done(null, user);
//             }
//             else {
//                 return done(null, false);
//             }
//         });
//     }));
//
// exports.verifyUser = passport.authenticate('jwt', {session: false});
//
//
//
//
// // passport.use(new LocalStrategy(User.authenticate()));
// // passport.serializeUser(User.serializeUser()); //session related
// // passport.deserializeUser(User.deserializeUser()); //session related
