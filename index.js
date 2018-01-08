var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = __dirname + '/wwwroot/html';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoDbUrl = 'mongodb://ronnilenvighansen:ronni721@examnodejscluster-shard-00-00-cif7m.mongodb.net:27017,examnodejscluster-shard-00-01-cif7m.mongodb.net:27017,examnodejscluster-shard-00-02-cif7m.mongodb.net:27017/CommentsDatabase?replicaSet=ExamNodeJSCluster-shard-0&ssl=true';

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

app.get('/videos', function(req, res)
{
    res.sendfile(path + '/videos.html', function (err)
    {
        
    });
});

app.get('/comments', function(req, res)
{
    res.sendfile(path + '/comments.html', function(err)
    {
        MongoClient.connect(mongoDbUrl, function(err, db)
        {
            var col = db.Comments;
            col.find().toArray(function (err, result){
                res.json(result);
            });
            
            db.close();
        });
    });

});

app.post('/comments', function(req, res){
    
    MongoClient.connect(mongoDbUrl, function(err, db){
        var col = db.Comments;
        
        col.insertOne(req.body, function(err, result){
            res.status(201);
            res.json({msg : 'Comment created'});
        });

        db.close();
    });
});

app.listen(process.env.PORT || 3000, function()
{
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});