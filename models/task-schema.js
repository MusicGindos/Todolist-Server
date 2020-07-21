"use strict";

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
 	taskName: String,
 	assignee: String,
 	day: String,
 	hour: String,
 	dueDate: Date,
 	comments: String
 });

module.exports = taskSchema;