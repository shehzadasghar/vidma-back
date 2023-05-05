const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    // //console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});
app.listen(7000, () => console.log('Server is running on port 7000'));
