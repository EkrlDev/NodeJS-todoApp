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


//let data = [{item: 'get milk'}, {item:'walk dog'}, {item:'read book'}];

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {//we will declare all request handlers here
    app.get('/todo', function(req, res) {
        //get data from mongoDB and paste it to the view
        Todo.find({}, function(err, data) {// we want all the items so we left it empty object.
            if(err) throw err;
            res.render('todo', {todos:data});
        }) 
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from input and paste it to the data base and view
        let newTodo = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });
   
    app.delete('/todo/:item', function(req, res) {
        Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });
};