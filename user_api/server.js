const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

const userService = require("./user-service.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

jwtOptions.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    if (jwt_payload) {
        next(null, { 
            _id: jwt_payload._id, 
            userName: jwt_payload.userName}); 
    } else {
        next(null, false);
    }
});

passport.use(strategy);
app.use(passport.initialize());

app.use(express.json());
app.use(cors());

app.post("/api/user/register", (req, res) => {
    userService.registerUser(req.body)
    .then((successMsg) => {
        res.json({"message": successMsg});
    }).catch((err) => {
        res.status(422).json({"message":err});
    });
});

app.post("/api/user/login", (req, res) => {
    userService.checkUser(req.body)
    .then((user) => {
        const payload = {
            _id: user._id,
            userName: user.userName
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({"message":"login successful", "token":token});
    }).catch((err) => {
        res.status(422).json({"message":err});
    });
});

app.get("/api/user/favourites", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.getFavourites(req.user._id)
    .then(data => res.json(data))
    .catch(err => res.json({"error": err}));
});

app.put("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.addFavourite(req.user._id, req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json({"error":err}));
});

app.delete("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.removeFavourite(req.user._id, req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json({"error":err}));
});

app.use((req, res) => {
    res.status(404).end();
});

userService.connect()
.then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
.catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
});
