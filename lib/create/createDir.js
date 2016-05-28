'use strict'

const FS = require('fs'),
		   options = process.argv;
		   

function createFilesAndDirs(dirs, files){
	
	// Change HTML to Jade/Pug if user puts in "--pug" option
		if (options.indexOf('create') > -1 && options.indexOf('--pug') > -1) files[0] = './src/index.jade'
		else if (options.indexOf('create') > -1 && options.indexOf('--stylus') > -1) files[0] = './src/css/style.styl'
		else if (options.indexOf('create') > -1 && options.indexOf('--scss') > -1) files[0] = './src/css/style.scss'
		else if (options.indexOf('create') > -1 && options.indexOf('--sass') > -1) files[0] = './src/css/style.sass'
		else if (options.indexOf('create') > -1 && options.indexOf('--less') > -1) files[0] = './src/css/style.less'
	
	// Create the directories
	dirs.forEach((dir) => {
		FS.mkdir(dir, (err) => {
			err ? console.log('err: ', err) : null;
		})
	})
	
	// Create the files for the directories
	files.forEach((file) => {
		FS.writeFile(file, 'thankssssssssss you', (err) => {
			err ? console.log('err: ', err) : null;
		});
	});
}

module.exports = {
	default: function() {
		let dirs = ['./src', './src/css', './src/js', './src/assets'],
			files = ['./src/index.html',  './src/css/style.css', './src/app.js', './.gitignore'];
			  
		createFilesAndDirs(dirs, files);
	},
	
	angular1: function() {
		let dirs = ['./src', './src/controllers', './src/directives', './src/services', './src/css', './src/templates'],
		    files = ['./src/index.html', './src/css/style.css', './src/app.js', './.gitignore'];
		
		createFilesAndDirs(dirs, files);
	}
}