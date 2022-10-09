require('dotenv').config();
let express = require('express');
let path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('cookie-session');

const users = require('./models/User')


let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'mysecret',
    resave: false,
    httpOnly: true,
    maxAge: 30 * 60 * 1000,
    saveUninitialized: true,
}));

const databaseConn = 'mongodb+srv://manu_shaju_mongo:626688@cluster0.rgqoc.mongodb.net/parkspaceDB';
mongoose.connect(databaseConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.get('/', (req, res) => {
    req.session.alerts = {
        data: "",
        type: ""
    }
    users.find((err, data) => {
        if (data) {
            console.log(data)
        }
    })
    res.send("Hello")
})



app.listen(process.env.PORT || 3500, function () {
    console.log("Server started on port 3500");
});