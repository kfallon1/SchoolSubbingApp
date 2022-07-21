const express = require ('express');
const app = express(); //const app calling the function express
const morgan = require('morgan');
const mongoose = require ('mongoose'); //These consts are similar to imports 
const cors = require('cors'); //This allows data to be transferred between front and back end Forbidden without it
require ('dotenv/config'); //uses specifc values for env file to map I think..

app.use(cors());   //Enabling the use of cors which is imported above to load resources from different sources 
app.options("*", cors()); //All the different options: GET, POST..etc. 

//'Middleware' part for accepting JSON transfers objects from front to back and vice versa I think
app.use(express.json());    //replace app.use(bodyParser.json()) with app.use(express.json()) if come across
app.use(morgan('tiny'));  //Morgan logs requests coming from Front End in terminal

//declaring the router
const teachersRouter = require('./routers/teachers');
const teacherCategoriesRouter = require ('./routers/teacherCategories'); //Declare each router or else 404 error
const schoolsRouter = require('./routers/schools');
const bookingsRouter = require ('./routers/bookings');





const api = process.env.API_URL; //This use the env file again mapping...

app.use (`${api}/teachers`, teachersRouter)
app.use (`${api}/teachercategories`, teacherCategoriesRouter) //MAKE SURE to do this part for the different mapping requirements!!
app.use (`${api}/schools`, schoolsRouter)
app.use (`${api}/bookings`, bookingsRouter)



//DB connection done here before the server starts below
//CHANGE THIS TO ENV FILE remove <> for password and db name between /? //TeachereDB
mongoose.connect('mongodb+srv://keith:timcahill17@cluster0.uhjgjo7.mongodb.net/TeachereDB?retryWrites=true&w=majority')
.then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log('Error connection' + err);
  });

 //Server requires to listen to a specifc port 3000 here. Callback is executed when server created and prints message
app.listen(3000, ()=> {
    console.log(api);
    console.log("server is working on http://localhost:3000");
})