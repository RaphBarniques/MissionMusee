const subtitle = document.querySelector(".title");
const text = document.querySelector(".text");
const image = document.querySelector(".image");
const btnpanel = document.querySelector(".btnpanel");

let chapterObj = {
	LeCommencement: {
		subtitle: "Le commencement",
		text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
		img: "images/image.png",
		options: [
			{
				text: "Une corde",
				goto: "getRope('Hall')",
			},
			{
				text: "Un kit de crochetage",
				goto: "getKit('Hall')",
			},
			{
				text: "Des explosifs",
				goto: "getBomb('Hall')",
			},
			{
				text: "Un spray à cheveux",
				goto: "getSpray('Hall')",
			},
		],
	},

	Hall: {
		subtitle: "Le hall",
		text: "Vous êtes entré dans le hall. Tout semble calme pour l'instant. Plusieurs passages s'offrent à vous.",
		img: "images/image.png",
		options: [
			{
				text: "Partir à gauche",
				goto: "Egypte",
			},
			{
				text: "Monter le grand escalier",
				goto: "",
			},
			{
				text: "Partir à droite",
				goto: "",
			},
			{
				text: "Tenter de désactiver les systèmes d'alarmes",
				goto: "",
				gadget: "kit",
			},
		],
	},
};


function goToChapter(chapter) {
	subtitle.innerHTML = chapterObj[chapter]["subtitle"];
	text.innerHTML = chapterObj[chapter]["text"];
	image.src = chapterObj[chapter]["img"];
	btnpanel.innerHTML = "";
	for(i = 0; i < chapterObj[chapter]["options"].length; i++){
		let button = document.createElement("button")
		let text = document.createTextNode(chapterObj[chapter]["options"][i]["text"]);
		button.appendChild(text);
		button.setAttribute("onclick", chapterObj[chapter]["options"][i]["goto"])
		btnpanel.appendChild(button);
	}
	
}

let hasRope = false;
let hasKit = false;
let hasBomb = false;
let hasSpray = false;

function getRope(chapitre){
	hasRope = true;
	goToChapter(chapitre);
}

function getKit(chapitre){
	hasKit = true;
	goToChapter(chapitre);
}

function getBomb(chapitre){
	hasBomb = true;
	goToChapter(chapitre);
}

function getSpray(chapitre){
	hasSpray = true;
	goToChapter(chapitre);
}

function checkRope(chapitreOui, chapitreNon){
	if(hasRope == true) {
		goToChapter(chapitreOui);
	} else {
		goToChapter(chapitreNon);
	}
}
