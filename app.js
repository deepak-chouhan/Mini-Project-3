require("dotenv").config
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

// Routes
const index = require("./routes/index");
const exp = require("constants");
//

const app = express();

// -------------
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
    extended: true
}));

//--------------
app.use("/", index);

// Port
let port = process.env.PORT;
if (port == "" || port == null) {
    port = 3000;
}

app.listen(3000, (req, res) => {
    console.log("Started!!!")
})