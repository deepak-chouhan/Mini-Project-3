require("dotenv").config()
const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const FacebookStrategy = require('passport-facebook').Strategy;

// Data
const interests = require("./data/interests")

// App
const app = express();

// ssl keys
const privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
const certificate = fs.readFileSync("./sslcert/server.crt", "utf8");
const credentials = {
    key: privateKey,
    cert: certificate
};

// config
const httpsServer = https.createServer(credentials, app);

// -------------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Mongoose
mongoose.connect(`mongodb://localhost:27017/ally`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userschema = new mongoose.Schema({
    name: String,
    profile: String,
    username: String,
    password: String,
    googleId: String,
    uid: String,
    rank: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    recent: [],
    interests: []
});

const activitySchema = new mongoose.Schema({
    name: String,
    points: Number
})

userschema.plugin(passportLocalMongoose);
userschema.plugin(findOrCreate);

const User = mongoose.model("User", userschema);
const Activity = mongoose.model("Activity", activitySchema);

passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// FacebookStrategy
passport.use(new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "displayName", "name", "gender", "picture.type(large)", "email"]
    },
    function (accessToken, refreshToken, profile, done) {
        // find the user in the database based on their Facebook id
        User.findOrCreate({
            uid: profile.id,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails[0].value,
            profile: profile.photos[0].value
        }, function (err, user) {
            done(err, user);
        });

    }));

// GoogleStrategy
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://localhost:3000/auth/google/user/dashboard",

        // This option tells the strategy to use the userinfo endpoint instead
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        // find the user in the database based on their Google id
        User.findOrCreate({
            username: profile.emails[0].value,
            googleId: profile.id,
            name: profile.name.givenName + " " + profile.name.familyName,
            profile: profile.photos[0].value
        }, function (err, user) {
            return cb(err, user);
        });
    }

));

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', "email"]
    })
);

app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: "email"
}));

app.get('/auth/google/user/dashboard',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect(`/user/interests`);
    });

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`/user/interests`);
    });

// Routes
app.get("/", (req, res) => {
    res.render("index")
})

app.route("/user/interests")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            User.findById(req.user.id, (err, user) => {
                if (!err) {
                    if (user.interests.length == 0) {
                        res.render("interests", {
                            interests: interests
                        })
                    } else {
                        res.redirect("/user/dashboard");
                    }
                } else {
                    console.log(err);
                }
            })
        }
    })

    .post((req, res) => {
        let curr_int = req.body.interest;
        User.findById(req.user.id, (err, user) => {
            if (!err) {
                user.interests.push(...curr_int);
                user.save();
                res.redirect("/user/dashboard");
            } else {
                console.log(err);
            }
        })

    })

app.route("/user/dashboard")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            User.findById(req.user.id, (err, user) => {
                res.render("dashboard", {
                    user: user
                })
            })
        }
    })

app.route("/user/dashboard/:page")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            User.findById(req.user.id, (err, user) => {
                let route = req.params.page;
                switch (route) {
                    case "3dvr":
                        res.render("3dvr", {
                            user: user
                        });
                        break;

                    case "benchmark":
                        res.render("benchmark", {
                            user: user
                        })
                        break;

                    case "reading":
                        res.render("reading", {
                            user: user
                        })
                        break;

                    case "courses":
                        res.render("courses", {
                            user: user
                        })
                        break;

                    case "leaderboard":
                        res.render("leaderboard", {
                            user: user
                        })
                        break

                }
            })
        }
    })

app.route("/login")
    .get((req, res) => {
        res.render("login")
    })

    .post((req, res) => {
        const user = {
            username: req.body.email,
            password: req.body.password
        }

        req.logIn(user, (err, user) => {
            if (!err) {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/user/interests")
                })
            } else {
                console.log(err);
                res.redirect("/signup");
            }
        })

    })

app.route("/signup")
    .get((req, res) => {
        res.render("signup")
    })

    .post((req, res) => {
        const user = new User({
            name: req.body.name,
            username: req.body.username
        })

        User.register(user, req.body.password, (err, user) => {

            console.log("inside register")

            if (!err) {
                console.log("no error")
                passport.authenticate("local")(req, res, () => {
                    console.log("inside passport authenticate")
                    res.redirect("/user/interests")
                })
            } else {
                console.log("error!!!")
                console.log(err)
            }


        })

    })

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
})

app.get("/graph", (req, res)=>{
    res.render("graph")
})


// Port
let port = process.env.PORT;
if (port == "" || port == null) {
    port = 3000;
}

httpsServer.listen(port, (req, res) => {
    console.log("Started!!!")
})