var fs = require('fs'),
	path = require('path'),
	child_process = require('child_process');

exports.compress = function() {
	//arguments -prefix -suffix -replaceOriginal
	var prefix = '',
		suffix = '-min',
		replaceOriginal = true,
		jsList = [],
		currentDir = process.cwd();

	if (arguments.length > 0) {
		var argv0 = arguments[0],
			argv1 = arguments[1],
			argv2 = arguments[2];
		if (argv0 !== undefined && argv0 !== null)
			prefix = argv0;
		if (argv1 !== undefined && argv1 !== null)
			suffix = argv1;
		if (argv2 !== undefined && argv2 !== null)
			replaceOriginal = argv2;

		if (prefix === '' && suffix === '')
			suffix = '-min';
	}

	//Save all js files recursively
	dir(currentDir, jsList);

	//Compress all files recursively
	setTimeout(function() { compressSingleFile(0, jsList, jsList.length); }, 1000);

	return 'Starting to compress: ' + currentDir;

	function dir(p, jsList) {
		var filelist = fs.readdirSync(p),
			len = filelist.length,
			i = 0,
			f,
			fpath,
			stat;

		for (;i < len; i++) {
			f = filelist[i],
			fpath = path.join(p, f),
			stat = fs.statSync(fpath);

			if (stat.isFile() && path.extname(fpath) === '.js') {
				jsList.push(fpath);
			} else if (stat.isDirectory()) {
				dir(fpath, jsList);
			}
		}
	}

	function compressSingleFile(j, jsList, bound) {
		if (j >= bound) {
			console.log('All done!')
			return;
		}

		var f = jsList[j],
			output = path.join(path.dirname(f), prefix + path.basename(f, '.js') + suffix + '.js'),
			cmd = 'java -jar ' + __dirname + '/compiler.jar --js=' + f + ' --js_output_file=' + output;

		console.log('Compressing ' + f + ' ...');
		child_process.exec(cmd, function(err, stdout, stderr) {
			if (err) {
				console.log('Exec error: ' + err);
			} else {
				console.log(stdout);
				console.log(stderr);
				if (replaceOriginal) fs.unlinkSync(f);
				console.log('Done!');
				compressSingleFile(++j, jsList, bound);
			}
		});
	}
}