//help
function helpfn(dirPath) {
	console.log(`
	List of all the commands:
		node main.js tree "directoryPath"
 		ode main.js organize "directoryPath"
 		node main.js help`);

}
module.exports= {
	helpKey : helpfn
}