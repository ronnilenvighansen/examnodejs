var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = __dirname + '/wwwroot/html';

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('wwwroot'));
app.get('/', function (req, res)
{
    res.sendfile(path + '/index.html', function (err)
    {

    });    
});

app.get('/index', function (req, res)
{
    res.sendfile(path + '/index.html', function (err)
    {

    });    
});

app.get('/videos', function(req, res)
{
    res.sendfile(path + '/videos.html', function (err)
    {

    });
});

app.get('/about', function(req, res)
{
    res.sendfile(path + '/about.html', function (err)
    {

    });
});

app.listen(process.env.PORT || 3000, function()
{
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});