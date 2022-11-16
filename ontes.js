// answers
const url = 'https://raw.githubusercontent.com/Fidasek009/ONTES-Plugin/main/ONTES-Answers.json';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function loadAnswers() {
	await delay(5000); // wait for site to load questions
    const response = await fetch(url); // download answers
    const answers = await response.json();
	
	const keys = Object.keys(answers);
	for (let i = 0; i < keys.length; i++) { // cycle through all answers
		const key = keys[i];
		let question = await document.getElementById(answers[key]); // find right answer
		if(question != null) question.style.color = "red"; // mark the right answer
	}
	console.log("done")
}

//add onclick event when generating test
let generovat = document.getElementById("generovat-test");
if(generovat != null) generovat.onclick = function(){loadAnswers()};
