"use strict";

const mongoose = require('mongoose');
	  //TaskSchema = require('../models/task-schema'),
mongoose.connect('mongodb+srv://dbUser:dbPassword@cluster0.cywgw.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const Schema = mongoose.Schema;
const taskSchema = new Schema({
 	taskName: String,
 	assignee: String,
 	day: String,
 	hour: String,
 	dueDate: Date,
 	comments: String
 });

const Task = mongoose.model('Tasks', taskSchema);

class MongooseController{
	createTask(request, response){
		var task = new Task({
			taskName: request.body.taskName,
		 	assignee: request.body.assignee,
		 	day: request.body.day,
		 	hour: request.body.hour,
		 	dueDate: request.body.dueDate,
		 	comments: request.body.comments
		});
		var res = task.save();
		if(res){
			var notifyController = new NotifyController();
			notifyController.notifyAsignee(res);
		}
		return task.save();
	}

	getAllTasks(request, response){
		 Task.find({}, function(err, tasks) {response.send(tasks);});
	}

	getTaskByID(request, response, id){
		Task.find({_id: id}, function(err, task) {response.send(task[0]);});
	}

	updateTask(request, response){
		var taskID = request.body._id;
		this.isTaskExist(taskID, function(isTaskExist){
			if(isTaskExist){
				var query = {'_id': taskID};
				Task.findOneAndUpdate(query, request.body, {}, function(err, task) {
					if(err){
						response.send({"status": "failed", "message": "There was a problem with the server"});
					}else{
						response.send({"status": "success"});
					}
				});
			} else{
				response.send({"status": "failed", "message": "There is no task with id:" + taskID});
			}
		});
	}

	isTaskExist(id, callback){
		Task.find({_id: id}, function(err, task) {
			callback(task?task.length > 0: false);
		});
	}

	deleteTask(request, response, id){
		this.isTaskExist(id, function(isTaskExist){
			if(isTaskExist){
				Task.findByIdAndRemove({_id: id}, function(err, task){
					response.send({"status": "success"});
				  });
			}else{
				response.send({"status": "failed", "message": "There is no task with id:" + id});
			}
		});
	}
}

module.exports = MongooseController ;