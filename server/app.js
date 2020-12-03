const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session")
const userRouter = require("./routes/user_routes");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'star wars',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
    // ,
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection
    // })
}))


const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/SOTRPC';

mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database', dbConn);
        }
});



app.listen(port, () => {
    console.log(`SOTRPC app listening on port ${port}`)
})

app.use('/users', userRouter);


app.get('/', (req, res) => {
    res.send('Welcome')
})