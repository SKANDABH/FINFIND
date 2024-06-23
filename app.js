const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 3000;

// Parse JSON requests



// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/finuser");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve the 'index.html' file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});
app.get('/government', (req, res) => {
    res.sendFile(__dirname + '/public/government.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});
// app.post('/login', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');});
app.post("/login", function (req, res) {
  
    if (req.isAuthenticated()) {
        const userId = req.user.id; // Get the user's ID from the session
        User.findById(userId)
            .then(foundUser => {
                if (foundUser) {
                    res.sendFile(__dirname + '/public/index.html');
                } else {
                    throw new Error("User not found");
                }
            })
            
            .catch(err => {
                console.error(err);
                // Handle the error appropriately
            });
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});
    app.post("/signup", function(req, res){
        console.log("Signup request received:", req.body);
    
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save()
        .then(() => {
            console.log("User created successfully");
            res.sendFile(__dirname +'/public/login.html');
        })
        .catch((err) => {
            console.log("Error creating user:", err);
            res.status(500).send("Internal Server Error");
        });
    });
    // Function to show the account icon and username
// function showAccountIcon() {
//     const accountIcon = document.getElementById('account-icon');
//     accountIcon.classList.remove('hidden');
//     accountIcon.classList.add('visible');
// }

// // Function to update the username
// function updateUsername(email) {
//     const firstChar = email.charAt(0).toUpperCase(); // Extract the first character and convert it to uppercase
//     const usernameElement = document.getElementById('username');
//     usernameElement.textContent = firstChar;
// }


// const isLoggedIn = true; // Replace with your actual check for sign-in status
// if (isLoggedIn) {
//     showAccountIcon();
//     const userEmail = 'skandabhebbar@gmail.com'; // Replace with the actual user's email ID
//     updateUsername(userEmail);
// }

    
    
// Start the server
// window.document.addEventListener("DOMContentLoaded", function() {
//     const newsParent = document.getElementById("fetched-news");
// async function getNews(){
//     const news = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=0fe0d38f46664935bf2ea9fc85749a3b");
//     const jsonNEWS = await news.json();
//     Object.values(jsonNEWS.articles).forEach((newsInfo)=>{
//         const currentNews = document.createElement("div");
//         currentNews.classList.add("each-news");
//         const img = document.createElement("img");
//         img.src=newsInfo.urlToImage;
//         const div1 = document.createElement("div");
//         div1.textContent = newsInfo.author;
//         const div2 = document.createElement("div");
//         div2.textContent = newsInfo.title;
//         const div3 = document.createElement("div");
//         div3.textContent = newsInfo.description;
//         const div4 = document.createElement("div");
//         div4.textContent = newsInfo.content;
//         const div5 = document.createElement("div");
//         currentNews.appendChild(img);
//         currentNews.appendChild(div1);
//         currentNews.appendChild(div2);
//         currentNews.appendChild(div3);
//         currentNews.appendChild(div4);
//         currentNews.appendChild(div5);
//         newsParent.appendChild(currentNews);
//         console.log(newsInfo.title);
//     })
//     // console.log(jsonNEWS);
// } 
// getNews()
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
