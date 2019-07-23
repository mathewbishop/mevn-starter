//============================================================
// Dependencies
//============================================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//============================================================
// PORT
//============================================================
const PORT = process.env.PORT || 3000;
//============================================================
// Middleware
//============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//============================================================
// Serve Client
//============================================================
app.use(express.static("/client/dist"));
//============================================================
// For Heroku Deployment
//============================================================
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
}
//============================================================
// MongoDB Connection
//============================================================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bookwermdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//============================================================
// Get Info On DB Connection
//============================================================
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database.")
});
//============================================================
// Routes
//============================================================

//============================================================
// Listener
//============================================================
app.listen(PORT, () => {
    console.log(`==> API server now on port ${PORT}.`);
});