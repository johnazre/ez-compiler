'use strict'

const FS = require('fs'),
		  options = process.argv,
			stream = FS.createWriteStream('./.gitignore'),
			exec = require('child_process').exec;


function createFilesAndDirs(dirs, files){

		// Change file extensions based on flags used in the command line
		if (options.indexOf('create') > -1 && options.indexOf('--pug') > -1) files[0] = './src/index.jade'
		if (options.indexOf('create') > -1 && options.indexOf('--stylus') > -1) files[1] = './src/css/style.styl'
		if (options.indexOf('create') > -1 && options.indexOf('--scss') > -1) files[1] = './src/css/style.scss'
		if (options.indexOf('create') > -1 && options.indexOf('--sass') > -1) files[1] = './src/css/style.sass'
		if (options.indexOf('create') > -1 && options.indexOf('--less') > -1) files[1] = './src/css/style.less'
		if (options.indexOf('create') > -1 && options.indexOf('--coffee') > -1) files[2] = './src/app.coffee'

	// Create the directories
	dirs.forEach((dir) => {
		FS.mkdirSync(dir);
	})

	// Create the files for the directories
	files.forEach((file) => {
		FS.writeFileSync(file, ' ');
	});

	stream.write('node_modules/\n.DS_Store\n');
	stream.close();

	FS.readFile('package.json', 'utf8', (error, data) => {
		let pkgFile = JSON.parse(data),
		    scripts = pkgFile.scripts;
				pkgFile.devDependencies = {};
		let devDeps = pkgFile.devDependencies;


		console.log('pkgFile: ', pkgFile)
		// console.log('devDeps: ', devDeps)

		if (options.indexOf('create') > -1 && options.indexOf('--pug') > -1){
			scripts.pug = 'pug ./src -o ./dist -w';
			devDeps["pug-cli"] = '^1.0.0-alpha5';
		}
		if (options.indexOf('create') > -1 && options.indexOf('--stylus') > -1){
			scripts.stylus = 'stylus ./src/css -o ./dist/css -w';
			devDeps.stylus = '^0.54.5';
		}
		if (options.indexOf('create') > -1 && options.indexOf('--scss') > -1){
			scripts['node-sass'] = 'node-sass src dist -w';
			devDeps['node-sass'] = '^3.7.0'
		}
		if (options.indexOf('create') > -1 && options.indexOf('--sass') > -1){
			scripts['node-sass'] = 'node-sass src dist -w';
			devDeps['node-sass'] = '^3.7.0';
		}
		if (options.indexOf('create') > -1 && options.indexOf('--less') > -1){
			scripts.less = 'lessc ./src/style.less ./dist/styles.css -w';
			devDeps.less = '^2.7.1';
		}
		if (options.indexOf('create') > -1 && options.indexOf('--coffee') > -1){
			scripts.coffee = 'coffee -o ./dist -c ./src -w';
			devDeps['coffee-script'] = '^1.10.0';
		}

		FS.writeFile('package.json', JSON.stringify(pkgFile, null, 2), (err) => {
			err ? console.log(err) : null
		})
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
