var express = require('express');
var app = express();
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.get('/', function(req, res){
    res.send("Hello world - Express");

})

app.get('/test', function(req, res){
    res.send("Hels");

})
app.get('/Calc', function(req, res){
var x = parseInt(req.query.x);
var y = parseInt(req.query.y);
 res.send("X + Y="+(x+y));

});

app.get('/getform', function(req,res){
    var name = req.query.name;
    var quest = req.query.quest;
        res.send("Hi "+name+" I am sure you will "+quest);

});

app.post('/postform', function(req,res){
    var name = req.body.name;
    var quest = req.body.quest;
        res.send("Hi "+name+" I am sure you will "+quest);

});

app.use(function ( req, res, next){
    res.send('this page does not exist!')
})
app.listen(8080);