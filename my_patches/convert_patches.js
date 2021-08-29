const fs = require('fs');
// const os = require('os');
const minimistParse = require('minimist');
const booleanArgs = ['--back'];
const cliArgs = minimistParse(process.argv.slice(2), { boolean: booleanArgs });

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const files = fs.readdirSync('./');
const diffFiles = [];

for (const file of files) {
	const stats = fs.lstatSync(file);

	if (stats.isFile() && file.endsWith('.diff')) {
		diffFiles.push(file);
	}
}

// Список взят отсюда: https://github.com/react-native-community/cli/blob/df55a78f2d27e3443f15b15b87459b54a78e2c47/packages/cli/src/commands/init/editTemplate.ts#L87
const UNDERSCORED_DOTFILES = [
  'buckconfig',
  'eslintrc.js',
  'flowconfig',
  'gitattributes',
  'gitignore',
  'prettierrc.js',
  'watchmanconfig',
  'editorconfig',
];

let convertBack = !!cliArgs.back;

if (convertBack) {
	// console.log('convertBack detected');
}
// console.log(`projectName == ${cliArgs.projectName}`);

for (const patchFile of diffFiles) {
	try {
		const data = fs.readFileSync(patchFile, 'utf8');
		let result = data;

		for (const file of UNDERSCORED_DOTFILES) {
			const toFind = (convertBack ? '_' : '\\.') + file;
			const toReplace = (convertBack ? '.' : '_') + file;

			// diff --git a/abc/_gitignore b/abc/_gitignore
			const rx = new RegExp(`diff --git a/(.*?)${toFind} b/(.*?)${toFind}`, 'g');
			result = result.replace(rx, `diff --git a/$1${toReplace} b/$2${toReplace}`);

			// +++ a(или b)/abc/_gitignore
			// или
			// --- a(или b)/abc/_gitignore
			const rx2 = new RegExp(`(---|\\+\\+\\+)( .*?)${toFind}`, 'g');
			result = result.replace(rx2, `$1$2${toReplace}`);
		}

		if (typeof cliArgs.projectName === 'string') {
			const toFind = (convertBack ? 'HelloWorld' : cliArgs.projectName);
			const toReplace = (convertBack ? cliArgs.projectName : 'HelloWorld');

			result = replaceAll(result, toFind, toReplace);
			result = replaceAll(result, toFind.toLowerCase(), toReplace.toLowerCase());
		}

		fs.writeFileSync(patchFile, result, 'utf8');
	} catch(e) {
		console.error(e);
	}
}