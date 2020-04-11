//This is where the JS gonna control out todo list 
let bodyParser = require('body-parser');

let data = [{item: 'get milk'}, {item:'walk dog'}, {item:'read book'}];

let urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {//we will declare all request handlers here
    app.get('/todo', function(req, res) {
        res.render('todo', {todos:data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        debugger;
        res.render('todo', {todos: data});
        res.json(data);
    });

   
    app.delete('/todo', function(req, res) {

    });
};