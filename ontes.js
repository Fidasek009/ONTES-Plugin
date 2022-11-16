// answers url
const url = 'https://raw.githubusercontent.com/Fidasek009/ONTES-Plugin/main/ONTES-Answers.json';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function loadAnswers() {
	await delay(5000); // wait for site to load questions
	
	// download answers
    const response = await fetch(url);
    const answers = await response.json();
	
	var questions = document.querySelectorAll('[typ="single"]'); // get all question DIVs
	for (var i = questions.length - 1; i >= 0; i--)
	{
		let otazka = questions[i].getAttribute("id"); // get id of question
		document.getElementById(answers[otazka]).style.color = "red"; // get answer for question
	}
	console.log("done")
}

//add onclick event when generating test
let generovat = document.getElementById("generovat-test");
if(generovat != null) generovat.onclick = function(){loadAnswers()};
