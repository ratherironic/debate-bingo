var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

// setup handlebars
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars',  handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/dist'));

// homepage
app.get('/', function(req, res){
    res.render();
});



app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press CTRL+C to terminate...');
});