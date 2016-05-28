#!/usr/bin/env node
'use strict'

const FS = require('fs'),
	  fsExtra = require('fs-extra'),
	  exec = require('child_process').exec,
	  createDir = require('./lib/create/createDir'),
	  createFiles = require('./lib/create/createFiles');


// argv = ['node', 'ez-compiler', task]
let task = process.argv[2];

// read ez.complr
FS.readFile('ez.complr', 'utf8', (error, data) => {
	error ? console.log(error) : true;
	
	FS.readFile('package.json', 'utf8', (error, data) => {
		var scripts = require('./lib/scripts');
		var result = data.replace(scripts.originalScript, scripts.nextScript);
		FS.writeFile('./package.json', result, (err) => {
			err ? console.log(err) : true;
		});
	})

	// Declare empty command string
	let command = '';
	
	// Create project template
	if(task === 'create'){
		let projectType = process.argv[3];
		
		if (projectType === "default" || projectType === "") createDir.default();
		if (projectType === "angular1" || projectType === "") createDir.angular1();
	}
	
	// Compile to html/css/js using "compile" task
	if (task === 'compile'){
		
		let commandParts = (() => {
		let bits = data.toLowerCase()
			.replace(/\s+/g, '')
			.split("]");
			return bits;
		})(task, data);
		
		console.log('datas: ', data);
		
		const reqMods = commandParts[0].slice(9).split(',') // Required modules to use while creating a compile command
		const source = commandParts[1].slice(8); // Where the file is
		const destination = commandParts[2].slice(13) // Where it's going
		
		let commandCreator = reqMods.forEach((val) => {
			command = command.concat("npm run " + val + " && ") // Okay for now. Need to figure out better option
		})
		command = command.slice(0, -3); // Trim the end of the last command.concat to remove "&& ".

	} // end compile task
	
	// Wants to lint the file with Jshint
	else if (task === "lint"){
		let fileNameOrPath = process.argv[3]
		command += ("jshint " + fileNameOrPath);
	}
	
	// Wants to lint the file with Jshint
	else if (task === "test"){
		let fileNameOrPath = process.argv[3]
		command += ("mocha " + fileNameOrPath);
	}

	// What creates and executes the command
	console.log("command: ", command);
	const child = exec(command, (error, stdout, stderr) => {
		console.log("stdout: ", stdout);
		console.log("stderr: ", stderr);
		if (error !== null) {
			console.log("execution error: ", error);
		}
	});
	
}); // FS.readFile
