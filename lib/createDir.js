'use strict'

const FS = require('fs'),
		  options = process.argv,
			stream = FS.createWriteStream('./.gitignore'),
			exec = require('child_process').exec;
		   

function createFilesAndDirs(dirs, files){
	
	// Change file extensions based on flags used in the command line
		if (options.indexOf('create') > -1 && options.indexOf('--pug') > -1) files[0] = './src/index.jade'
		else if (options.indexOf('create') > -1 && options.indexOf('--stylus') > -1) files[0] = './src/css/style.styl'
		else if (options.indexOf('create') > -1 && options.indexOf('--scss') > -1) files[0] = './src/css/style.scss'
		else if (options.indexOf('create') > -1 && options.indexOf('--sass') > -1) files[0] = './src/css/style.sass'
		else if (options.indexOf('create') > -1 && options.indexOf('--less') > -1) files[0] = './src/css/style.less'
		else if (options.indexOf('create') > -1 && options.indexOf('--coffee') > -1) files[2] = './src/app.coffee'
	
	// Create the directories
	dirs.forEach((dir) => {
		FS.mkdir(dir, (err) => {
			err ? console.log('err: ', err) : null;
		})
	})
	
	// Create the files for the directories
	files.forEach((file) => {
		FS.writeFile(file, '', (err) => {
			err ? console.log('err: ', err) : null;
		});
	});
	
	stream.write('node_modules/\n.DS_Store\n', 'utf8', function(err){
		console.log(err);
	})
	stream.close();
	
	FS.readFile('package.json', 'utf8', (error, data) => {
		let pkgFile = JSON.parse(data),
		    scripts = pkgFile.scripts;
		
		
		console.log('pkgFile: ', pkgFile.scripts)
		
		if (options.indexOf('create') > -1 && options.indexOf('--pug') > -1) scripts.pug = 'pug ./src -o ./dist -w'
		else if (options.indexOf('create') > -1 && options.indexOf('--stylus') > -1) scripts.stylus = 'stylus ./src/css -o ./dist/css -w'
		// else if (options.indexOf('create') > -1 && options.indexOf('--scss') > -1) scripts.node-sass = './src/css/style.scss'
		// else if (options.indexOf('create') > -1 && options.indexOf('--sass') > -1) scripts.sass = './src/css/style.sass'
		else if (options.indexOf('create') > -1 && options.indexOf('--less') > -1) scripts.less = 'lessc ./src/style.less ./dist/styles.css -w"'
		
		FS.writeFile('./package.json', JSON.stringify(pkgFile, null, 4), (err) => {
			err ? console.log(err) : true;
		});
	});
	
}

module.exports = {
	default: function() {
		let dirs = ['./src', './src/css', './src/js', './src/assets'],
			  files = ['./src/index.html',  './src/css/style.css', './src/app.js', './.gitignore', './ezconfig.json'];
			  
		createFilesAndDirs(dirs, files);
	},
	
	angular1: function() {
		let dirs = ['./src', './src/controllers', './src/directives', './src/services', './src/css', './src/templates'],
		    files = ['./src/index.html', './src/css/style.css', './src/app.js', './.gitignore', './ezconfig.json'];
		
		createFilesAndDirs(dirs, files);
	}
}