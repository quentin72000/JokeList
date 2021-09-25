const { api_key, debug, export_format} = require('./config.json')
const BlaguesAPI = require('blagues-api');
const blagues = new BlaguesAPI(api_key);
const fs = require('fs');
const moment = require('moment');


// system for only one category, not implemented.
// const joke = async () => { 
// 	let jokeViewed = []
// 	const reponse = await await blagues.Jokes.random({
// 		disallow: [blagues.categories.DARK, BlaguesAPI.categories.DEV, BlaguesAPI.categories.BEAUF, BlaguesAPI.categories.BLONDES]
// 	});
// 	console.log(reponse)
// }
// const reponse = joke()

//joke()
//getAllJoke()
// console.log(fs.existsSync("results/"))
if(!fs.existsSync("results/")){
	fs.mkdirSync("results/")
}


const getAllJoke = async () => {
	let notFoundJokeNumber = 0;
	let jokeNumberReaded = 0;
	var date = moment()
	var jokeFileName = "results/" + date.format('YYYY[-]MM[-]DD[-]hh[-]mm')
	if(fs.existsSync(jokeFileName + ".txt")){
		jokeFileName = jokeFileName + "(2).txt"
		fs.writeFileSync(jokeFileName, "")
	}else{
		jokeFileName = jokeFileName + ".txt"
		fs.writeFileSync(jokeFileName, "")
		
	}
	
	
	for (let i = 1; ; i++) {
		try {
			const reponse = await blagues.fromId(i);
				if(reponse.status === 404) { // if joke is not found, add 1 to notFoundJokeNumber
					notFoundJokeNumber ++;
					console.log("Blague non trouvé (" + (i+1) + "), nombre de blague non trouvé: " + notFoundJokeNumber);
					if(notFoundJokeNumber = 5){ // if joke number not found is 5, stop the process
						let now = moment()
						console.log("Done ! Readed " + jokeNumberReaded + " blagues, finished in " + moment(now.diff(date)).format("mm [minutes et ] ss [secondes]"));
						break;
					}
				}else{
					var jokeReaded = fs.readFileSync(jokeFileName, 'utf8');
					// fs.writeFileSync(jokeFileName, `${jokeReaded}\n${reponse.joke} : ${reponse.answer} (id: ${reponse.id}, type: ${reponse.type})`, {encoding: 'utf8', flags: 'wx'});
					fs.writeFileSync(jokeFileName, jokeReaded + "\n" + export_format.replace("%joke%", reponse.joke).replace("%answer%",reponse.answer).replace("%id%", reponse.id).replace("%type%", reponse.type), {encoding: 'utf8', flags: 'wx'});
					jokeNumberReaded++;
					console.log(i);
				if(debug){
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
getAllJoke()






function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }