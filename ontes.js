// answers url
const SingeURL = 'https://raw.githubusercontent.com/Fidasek009/ONTES-Plugin/main/answers/.ONTES-Single-Answers.json';
const MultiURL = 'https://raw.githubusercontent.com/Fidasek009/ONTES-Plugin/main/answers/.ONTES-Multi-Answers.json';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function loadAnswers() {
	await delay(2000); // wait for site to load questions
	
	// download answers
    const response = await fetch(SingeURL);
    const SingleAnswers = await response.json();
	
	var single = document.querySelectorAll('[typ="single"]'); // get all single questions
	for (let i = single.length - 1; i >= 0; i--)
	{
		let otazka = single[i].getAttribute("id"); // get id of question
		document.getElementById(SingleAnswers[otazka]).style.color = "red"; // get answer for question
	}
	
	var multi = document.querySelectorAll('[typ="multi"]'); // get all multi questions
	if(multi.length > 0){
		// download multi answers
		const response = await fetch(MultiURL);
		const MultiAnswers = await response.json();
	
		for (let i = multi.length - 1; i >= 0; i--)
		{
			let otazka = multi[i].getAttribute("id"); // get id of question
			for(let j = 0; j < MultiAnswers[otazka].length; j++) {
				document.getElementById(MultiAnswers[otazka][j]).style.color = "red"; // get answer for question
			}
		}
	}
	
	console.log("done")
}

//add onclick event when generating test
let generovat = document.getElementById("generovat-test");
if(generovat != null) generovat.onclick = function(){loadAnswers()};
