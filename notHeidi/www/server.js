const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/connect', function (req, res) {
    
    var con = mysql.createConnection({
        host: req.query.host,
        user: req.query.username,
        password: req.query.pw
    });
    
    con.connect(function (err) {
        if (err){
            res.status(500).send(err);
            console.error(err);
        } else {
            res.status(200).send('Connected!');
        }
    });
    
});
app.get('/query', function (req, res) {
    
    var con = mysql.createConnection({
        host: req.query.host,
        user: req.query.username,
        password: req.query.pw,
        database: req.query.db
    });
    
    con.query(req.query.sqlQuery, function (err, result) {
        if (err){
            res.status(500).send(err);
            console.error(err);
        } else {
            res.status(200).send(result);
        }
    });
    
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
