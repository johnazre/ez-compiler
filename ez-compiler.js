#!/usr/bin/env node
'use strict'

const FS = require('fs'); 
const fsExtra = require('fs-extra');
const exec = require('child_process').exec;

// argv = ['node', 'ez-compiler', task]
let task = process.argv[2];

// read ez.complr
FS.readFile('ez.complr', 'utf8', (error, data) => {
	error ? console.log('INVALID FILE') : true;

	let command = '';
	
	
	// Compile to html/css/js using "compile" task
	if (task === 'compile'){
		
		let commandParts = (() => {
		let bits = data.toLowerCase()
			.replace(/\s+/g, '')
			.split("]");
			return bits;
		})(task, data);
		
		const reqMods = commandParts[0].slice(9).split(',')
		const source = commandParts[1].slice(8);
		const destination = commandParts[2].slice(13)
		
		let commandCreator = reqMods.forEach((val) => {
			if (val === "babel") {
				command = command.concat(val + ' ' + source + ' -out-file ' + destination + " && ")
			} else if (val === "coffee") {
				command = command.concat(val + ' --out ' + destination + ' -c ' +  source + " && ")
			} else {
				command = command.concat(val + ' ' + source + ' -o ' + destination + " && ")
			}

		})
		command = command.slice(0, -3);
		fsExtra.copy('./src/test', './dist/test', function (err) {
			if (err) return console.error(err)
			console.log("success!")
		})
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
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		if (error !== null) {
			console.log(`execution error: ${error}`);
		}
	}); // exec()
}); // readFile()
