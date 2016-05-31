#!/usr/bin/env node
'use strict'

const FS = require('fs'),
	  fsExtra = require('fs-extra'),
	  exec = require('child_process').exec,
	  createDir = require('./lib/createDir'),
		options = process.argv;

// Declare command
let command = 'concurrently ';

// argv = ['node', 'ez-compiler', task]
let task = process.argv[2];

// Create project template
if(task === 'create'){
	let projectType = process.argv[3];

	if (projectType === "default") createDir.default();
	if (projectType === "angular1") createDir.angular1();
}

// Wants to lint the file with Jshint
else if (task === "lint"){
	let fileNameOrPath = process.argv[3]
	command += ("jshint " + fileNameOrPath);
}

// Wants to test files with Mocha/Chai
else if (task === "test"){
	let fileNameOrPath = process.argv[3]
	command += ("mocha " + fileNameOrPath);
}

else if (task === 'compile'){

	FS.readFile('ezconfig.json', 'utf8', (error, data) => {
		error ? console.log(error) : true;

		let config = JSON.parse(data);
		console.log(config);

		const reqMods = config.preprocessors; // Required modules to use while creating a compile command
		const source = config.source; // Where the file is
		const destination = config.destination; // Where it's going


		// Adds npm run command to each preprocessor
		let commandCreator = reqMods.forEach((val) => {
			command = command.concat("\"npm run " + val + "\" ")
		})

		if (options.indexOf('compile') > -1 && options.indexOf('--babel') > -1) command = command.concat("\"npm run babel\"")


		// What executes the command
		console.log("command: ", command);
		const child = exec(command, (error, stdout, stderr) => {
			console.log("stdout: ", stdout);
			console.log("stderr: ", stderr);
			if (error !== null) {
				console.log("execution error: ", error);
			}
		});

	}); // readFile()

}
