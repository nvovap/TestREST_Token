var express = require('express')
var app = express() 
var busboy = require('connect-busboy')


require('dotenv').config();


console.log(process.env.HOSTNAME);




//Setup parser file from POST request
app.use(busboy());
app.use(busboy({ immediate: true }));

app.use(express.static(__dirname+'/public')); //it is DIR for content

//Cross-Origin Resource Sharing 
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
//Cross-Origin Resource Sharing 


var authenticationFile = require('./authentication_file');
var items_file = require('./items_file');

//connect to database
var datamodel = require('./datamodel');
datamodel.connnectToDatabase()
//


app.use('/api/me', authenticationFile.checkToken);
app.use('/api/user/', authenticationFile.checkToken);
app.use('/api/item/', authenticationFile.checkToken);



app.post('/api/login', authenticationFile.login);
app.post('/api/register', authenticationFile.register);

app.post('/api/item/:id/image',items_file.uploadItemImage);

app.put('/api/me', authenticationFile.meUpdate);

app.put('/api/item', items_file.createItem);
app.put('/api/item/:id', items_file.updateItem);


app.delete('/api/item/:id/image',items_file.deleteItemImage);
app.delete('/api/item/:id',items_file.deleteItem);


app.get('/api/me', authenticationFile.me);
app.get('/api/user/:id', authenticationFile.getUserById); 
app.get('/api/user?', authenticationFile.getUsersByNameOrMail); 

app.get('/api/item/:id', items_file.getItemByID); 
app.get('/api/item?', items_file.getItems); 



app.listen(process.env.PORT || 3000);