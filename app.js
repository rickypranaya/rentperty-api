const { response } = require("express");
const express = require("express");
const cors = require('cors')
const app = express();
const expresshbs = require("express-handlebars");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.engine("handlebars",expresshbs({defaultLayout:"main"}));
app.set("view engine","handlebars");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

const apiRouter = require('./routes');
app.use('/api', apiRouter);

app.listen(port,()=> console.log('Listening on port ' + port));

