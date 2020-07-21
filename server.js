const express = require('express');
const app = express();
const port = 4000;
const MongooseController = require("./controllers/mongoose-controller");
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));  // to support URL-encoded bodies

app.get('/', function(request,response){ // All tasks
	response.send('Hello World!')
});
 
app.post('/createTask', function(request,response){
	var controller = new MongooseController();
	var res = controller.createTask(request, response);
	response.send({"status" : res? "success": "failed"});
});

app.get('/getTaskByID/:taskID', function(request,response){ // Task By ID
	var controller = new MongooseController();
	controller.getTaskByID(request, response, request.params.taskID);
});

app.get('/getAllTasks', function(request,response){ // All tasks
	var controller = new MongooseController();
	controller.getAllTasks(request, response);
});

app.post('/updateTask', function(request,response){
	var controller = new MongooseController();
	controller.updateTask(request, response);
});

app.get('/deleteTask/:taskID', function(request,response){ // All tasks
	var controller = new MongooseController();
	controller.deleteTask(request, response, request.params.taskID);
});

app.listen(port, function(){
	console.log("The server is running on port: " + port);
});