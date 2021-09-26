const {api_key, debug, export_format} = require('./config.json')
const BlaguesAPI = require('blagues-api');
const blagues = new BlaguesAPI(api_key);
const fs = require('fs');
const moment = require('moment');
const prompts = require('prompts')


const start = (async () => {
	const reponse = await prompts({
		type: 'select',
		name: 'value',
		message: 'Pick a category of jokes',
		hint: "Press Enter to select, arrow-key to navigate.",
		choices: [{
				title: 'ALL',
				description: 'Return all jokes of all category',
				value: 'all'
			},
			{title: "GLOBAL", value: 'global'},
			{
				title: 'DEV',
				value: 'dev'
			},
			{
				title: 'DARK',
				value: 'dark'
			},
			{
				title: 'LIMIT (18+)',
				value: 'limit',
				description: "DONT CHOOSE THIS IF YOUR NOT 18+ !!!"
			},
			{title: 'BEAUF',value: 'beauf'},
			{title: 'BLONDES',value: 'blondes'},

		],
		initial: 0
	});
	console.log(reponse.value);

	switch (reponse.value) {
		case "ALL":
			getAllJoke();
			break;
		case "global":
		case "dev":
		case "dark":
		case "limit":
		case "beauf":
		case "blondes":
			getAllJokeCategories(reponse.value);
			break;
		default:
			console.error("Unknown type ! Process stopped.")
			process.exit(9);


	}
})
start()

const getAllJoke = async () => {
	let notFoundJokeNumber = 0;
	let jokeNumberReaded = 0;
	var date = moment()

	const jokeFileName = createFile()
	for (let i = 1;; i++) {
		try {
			const reponse = await blagues.fromId(i);

			if (reponse.status === 404) { // if joke is not found, add 1 to notFoundJokeNumber
				notFoundJokeNumber++;
				console.log("Blague non trouvé (" + (i + 1) + "), nombre de blague non trouvé: " + notFoundJokeNumber);
				if (notFoundJokeNumber === 5) { // if joke number not found is 5, stop the process
					let now = moment()
					console.log("Done ! Readed " + jokeNumberReaded + " blagues, finished in " + moment(now.diff(date)).format("mm [minutes et ] ss [secondes]"));
					break;
				}
			} else {
				var jokeReaded = fs.readFileSync(jokeFileName, 'utf8');
				// fs.writeFileSync(jokeFileName, `${jokeReaded}\n${reponse.joke} : ${reponse.answer} (id: ${reponse.id}, type: ${reponse.type})`, {encoding: 'utf8', flags: 'wx'});
				fs.writeFileSync(jokeFileName, jokeReaded + "\n" + export_format.replace("%joke%", reponse.joke).replace("%answer%", reponse.answer).replace("%id%", reponse.id).replace("%type%", reponse.type), {
					encoding: 'utf8',
					flags: 'wx'
				});
				jokeNumberReaded++;
				//console.log(i);
				if (debug) {
					console.log(reponse);
				}

			}
			sleep(3)
		} catch (err) {
			console.error("Une erreur est survenue.")
			console.error(err)
			process.exit(1)
		}
	}
}

const getAllJokeCategories = async (type) => {
	console.log("type:" + type)
	let notFoundJokeNumber = 0;
	let jokeNumberReaded = 0;
	var date = moment()

	const jokeFileName = createFile(type)

	console.log("starting...")
	for (let i = 1;; i++) {
		try {
			
			const reponse = await blagues.fromId(i);
			// console.log(reponse);
			

			if (reponse.status === 404) { // if joke is not found, add 1 to notFoundJokeNumber
				console.log("not found")
				notFoundJokeNumber++;
				console.log("Blague non trouvé (" + (i + 1) + "), nombre de blague non trouvé: " + notFoundJokeNumber);
				if (notFoundJokeNumber === 5) { // if joke number not found is 5, stop the process
					let now = moment()
					console.log("Done ! Readed " + jokeNumberReaded + " jokes, finished in " + moment(now.diff(date)).format("mm [minutes et ] ss [secondes]"));
					break;
				}
			} else {
				if(reponse.type == type){
					console.log("finded ! Number of jokes finded: " + (jokeNumberReaded +1) + " ID: " + reponse.id)
				var jokeReaded = fs.readFileSync(jokeFileName, 'utf8');
				// fs.writeFileSync(jokeFileName, `${jokeReaded}\n${reponse.joke} : ${reponse.answer} (id: ${reponse.id}, type: ${reponse.type})`, {encoding: 'utf8', flags: 'wx'});
				fs.writeFileSync(jokeFileName, jokeReaded + "\n" + export_format.replace("%joke%", reponse.joke).replace("%answer%", reponse.answer).replace("%id%", reponse.id).replace("%type%", reponse.type), {
					encoding: 'utf8',
					flags: 'wx'
				});
				jokeNumberReaded++;
				if (debug) {
					console.log(reponse);
				}

			}
			sleep(3)
			}
		} catch (err) {
			console.error("Une erreur est survenue.")
			console.error(err)
			process.exit(1)
		}
		
	}
}





function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}


function createFile(suffix){
	if (!fs.existsSync("results/")) {
		fs.mkdirSync("results/")
	}
	let addsuffix = ''
	if(suffix) addsuffix =  "-" + suffix
	var date = moment()
	var jokeFileName = "results/" + date.format('YYYY[-]MM[-]DD[-]hh[-]mm')
	if (fs.existsSync(jokeFileName + ".txt")) {
		jokeFileName = jokeFileName + "(2)" + addsuffix +".txt"
		fs.writeFileSync(jokeFileName, "")
	} else {
		jokeFileName = jokeFileName + addsuffix +".txt"
		fs.writeFileSync(jokeFileName, "")
	}
	return(jokeFileName)
}