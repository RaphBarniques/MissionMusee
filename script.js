const subtitle = document.querySelector(".title");
const text = document.querySelector(".text");
const image = document.querySelector(".image");
const btnpanel = document.querySelector(".btnpanel");
const endmenu = document.querySelector(".end");
const endclose = document.querySelector(".endclose");
const endopen = document.querySelector(".endopen");
const artmenu = document.querySelector(".artefact");
const artclose = document.querySelector(".artclose");
const artopen = document.querySelector(".artopen");
const artname = document.querySelector(".artname");
const endname = document.querySelector(".endname");


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
				goto: "goToChapter('Zap')",
				gadget: "kit",
			},
		],
	},
	Zap: {subtitle:'Zap!', text:'Vous avez bien essayé de désactiver les sytèmes dalarmes avec vos outils mais une seconde dinattention a suffit pour que votre crochet court-circuite deux fils et vous électrocute à mort. Ouch…', img:'images/image.png', options:[{text:'Retour au début', goto:'LeCommencement'}]},
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

endopen.addEventListener("click", toggleEnd);
endclose.addEventListener("click", toggleEnd);

function toggleEnd() {
	endmenu.classList.toggle("hide")
}
artopen.addEventListener("click", toggleArt);
artclose.addEventListener("click", toggleArt);

function toggleArt() {
	artmenu.classList.toggle("hide")
}

function showArtName(element, name){
	if(element.classList.contains("unlocked")){
		artname.innerHTML = name;
	} else {
		artname.innerHTML = "???";
	}
}

function showEndName(element, name){
	if(element.classList.contains("unlocked")){
		endname.innerHTML = name;
	} else {
		endname.innerHTML = "???";
	}
}