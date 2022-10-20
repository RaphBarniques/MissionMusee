const subtitle = document.querySelector(".title");
const text = document.querySelector(".text");
const image = document.querySelector(".image");
const btnpanel = document.querySelector(".btnpanel");

let chapterObj = {
	LeCommencement: {
		subtitle: "Le commencement",
		text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
		img: "",
		options: [
			{
				text: "Une corde",
				goto: "goToChapter('Hall')",
				action() {
					console.log("Vous avez pris la corde");
				},
			},
			{
				text: "Un kit de crochetage",
				goto: "goToChapter('Hall')",
				action() {
					console.log("Vous avez pris la corde");
				},
			},
			{
				text: "Des explosifs",
				goto: "goToChapter('Hall')",
				action() {
					console.log("Vous avez pris la corde");
				},
			},
			{
				text: "Un spray à cheveux",
				goto: "goToChapter('Hall')",
				action() {
					console.log("Vous avez pris la corde");
				},
			},
		],
	},

	Hall: {
		subtitle: "Le hall",
		text: "Vous êtes entré dans le hall. Tout semble calme pour l'instant. Plusieurs passages s'offrent à vous.",
		img: "",
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

function getRope(chapitre){
	hasRope = true;
	goToChapter(chapitre);
}

function checkRope(chapitreOui, chapitreNon){
	if(hasRope == true) {
		goToChapter(chapitreOui);
	} else {
		goToChapter(chapitreNon);
	}
}
