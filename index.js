const express = require('express');
const app = express();
const boyParser = require('body-parser');
const mongoose = require('mongoose');

const company = require('./routes/company.route')

mongoose.connect("mongodb://localhost/Companies").then(res => {
    console.log("mongodb successfully connected");
}).catch(res => {
    console.log("something went wrong");
})

app.use(boyParser.json());
app.use(boyParser.urlencoded({
    extended: true
}));


app.use('/v1/api/company', company);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server running on port number ${port}`);
});