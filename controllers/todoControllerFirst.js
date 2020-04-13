//This is where the JS gonna control out todo list 
let bodyParser = require('body-parser');

let mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://erhan:21210Mak*@cluster0-igbu5.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

//Create a schema - this like a blueprint
let todoSchema = new mongoose.Schema({
    item: String
})

let Todo = mongoose.model('Todo', todoSchema);//we created a collection here

let itemOne = Todo({item:'buy flovers'}).save(function(err) {//we created a dummy item here
    if(err) throw err;
    console.log('item saved')
});


let data = [{item: 'get milk'}, {item:'walk dog'}, {item:'read book'}];

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {//we will declare all request handlers here
    app.get('/todo', function(req, res) {
        res.render('todo', {todos:data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });
   
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};