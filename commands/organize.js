let fs = require("fs");
let path = require("path");
function organizefn(dirPath) {
	//console.log("organize");
	let destPath;
	if (dirPath == undefined) {
		dirPath = process.cwd();
		
	} else {
		let doesExist = fs.existsSync(dirPath);
		if (doesExist) {
			destPath = path.join(dirPath, "organised_files");
			//if directory not exist then create it 
			if (fs.existsSync(destPath) == false) {
				fs.mkdirSync(destPath);
			}

		} else {
			console.log("Kindly enter the correct path");
			return;
		}

	}

	organiseHelper(dirPath, destPath);





}

function organiseHelper(src, dest) {

	//src -> dirpath dest -> organised directory 
	let childNames = fs.readdirSync(src);
	//console.log(childNames);
	for (let i = 0; i < childNames.length; i++) {
		let childAddress = path.join(src, childNames[i]);
		let isFile = fs.lstatSync(childAddress).isFile();
		if (isFile) {
			let category = getCategory(childNames[i]);
			//console.log(childNames[i], "belong to ->.....",cataegory);
			sendFiles(childAddress, dest, category);

		}
	}
}

function sendFiles(srcFilePath, dest, category) {
	let categoryPath = path.join(dest, category);
	if (fs.existsSync(categoryPath) == false) {
		fs.mkdirSync(categoryPath);
	}
	let fileName = path.basename(srcFilePath);
	let destFilePath = path.join(categoryPath, fileName);
	fs.copyFileSync(srcFilePath, destFilePath);
	fs.unlinkSync(srcFilePath);
	console.log(fileName, "copied to ->", category);

}

function getCategory(name) {
	let ext = path.extname(name);
	ext = ext.slice(1);
	for (let type in types) {
		let cTypeArray = types[type];
		for (let i = 0; i < cTypeArray.length; i++) {
			if (ext == cTypeArray[i]) {
				return type;
			}
		}
	}
	return "others";
}

module.exports = {
    organizeKey: organizefn
}