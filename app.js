let express = require('express');

let todoController = require('./controllers/todoController');


let app = express();

//define view engine
app.set('view engine', 'ejs');

//define routing for static files
app.use(express.static('./public'));

todoController(app);

//listen to the port
app.listen(3000);
console.log('You re listening port 3000');
