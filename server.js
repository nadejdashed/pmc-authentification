var express = require('express'),
	async = require('async'),
	pmc = require('./pmc'),
	app = express();	

app.configure(function(){
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(express.bodyParser());
});

app.get('/', function(request, response) {
	response.render('login');
});

app.post('/', function(request, response) {
	var data = request.body;
	
	var callback = function(error, user) {
		if (user) {
			response.render('user', user);
		} else {
			console.log(error);
		}
	}
	pmc.authentication(callback, data.login, data.password);
});

app.post('/user', function(request, response) {
	var data = request.body;
	
	var callback = function(error, users) {
		if (users) {
			response.render('users', {
				users: users
			});
		} else {
			console.log(error);
		}
	}		
	pmc.findUser(callback, data.user);
});

app.listen(3000);