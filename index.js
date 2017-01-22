var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('blog', './views');
app.set('portfolio', './views');

var dbURL = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blog';

app.get('/blog', function (req, res) {
	pg.connect(dbURL, function(err, client, done){
		client.query('select * from posts', function(err, result){
			res.render('blog', {data: result.rows})
			done();
			pg.end();
		})
	})
})

app.post('/blog', function(req, res){
	pg.connect(dbURL, function(err, client, done){
		client.query(`insert into posts(title, body) values ('${req.body.title}', '${req.body.body}')`,function(err, result){
			res.redirect('blog');
			done();
			pg.end();
		})
	})
})

app.get('/portfolio', function(req, res){
	res.render('portfolio')
})





app.listen(3000, function(){
	console.log("App listening on port 3000")
})
