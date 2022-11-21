//---ELEMENTS---

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
const settingsmenu = document.querySelector(".settings")
const settingsclose = document.querySelector(".settingsclose");
const soundBtn = document.querySelector("#soundBtn");
const resetBtn = document.querySelector(".resetBtn");
const transitionSound = new Audio("sounds/transition.wav");
const deathSound = new Audio("sounds/death.mp3");
const winSound = new Audio("sounds/win.mp3");

//---STATE VARIABLES---
let activePage;
let hasRope = false;
let hasLockpick = false;
let hasBomb = false;
let hasSpray = false;
let allowSound = true;
let endList = [];
let artList = [];

//---CHAPTER INDEX---
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
				gadget: "Lockpick",
			},
		],
	},
	Zap: {subtitle:'Zap!', text:'Vous avez bien essayé de désactiver les sytèmes dalarmes avec vos outils mais une seconde dinattention a suffit pour que votre crochet court-circuite deux fils et vous électrocute à mort. Ouch…', img:'images/image.png', options:[{text:'Retour au début', goto:'goToChapter("LeCommencement")'}], end:"1"},
};

//---ON LOAD---
window.addEventListener("load", () => {
	if (localStorage.getItem("activePage") != null) {
		activePage = localStorage.getItem("activePage");
		console.log("activePage loaded : " + activePage);
		document.querySelector(".btnpanel button").innerHTML = "Continuer !";
		document.querySelector(".btnpanel button").setAttribute("onclick", "goToChapter('" + activePage + "')");
	}

	if (localStorage.getItem("hasRope") != null) {
		hasRope = localStorage.getItem("hasRope");
		console.log("hasRope loaded : " + hasRope);
	}

	if (localStorage.getItem("hasLockpick") != null) {
		hasLockpick = localStorage.getItem("hasLockpick");
		console.log("hasLockpick loaded : " + hasLockpick);
	}

	if (localStorage.getItem("hasBomb") != null) {
		hasBomb = localStorage.getItem("hasBomb");
		console.log("hasBomb loaded : " + hasBomb);
	}

	if (localStorage.getItem("hasSpray") != null) {
		hasSpray = localStorage.getItem("hasSpray");
		console.log("hasSpray loaded : " + hasSpray);
	}

	if (localStorage.getItem("allowSound") != null) {
		allowSound = localStorage.getItem("allowSound");
		console.log("allowSound loaded : " + allowSound);
	}

	if (localStorage.getItem("endList") != null) {
		endList = JSON.parse(localStorage.getItem("endList"));
		console.log("endList loaded : " + endList);
		endopen.textContent = endList.length + " / 24 fins débloquées";
		for (i = 0; i <= endList.length; i++) {
			endItem = document.querySelector(".end" + endList[i]);
			endItem.classList.add("unlocked");
		}
	}

	if (localStorage.getItem("artList") != null) {
		artList = JSON.parse(localStorage.getItem("artList"));
		console.log("artList loaded : " + artList);
		artopen.textContent = artList.length + " / 3 artéfacts";
		for (i = 0; i <= artList.length; i++) {
			artItem = document.querySelector("." + artList[i]);
			artItem.classList.add("unlocked");
		}
	}
});

	//---DISPLAY CHAPTERS---
	function goToChapter(chapter) {
		//Save active page
		activePage = chapter;
		localStorage.setItem("activePage", chapter);

		//Build page
		subtitle.innerHTML = chapterObj[chapter]["subtitle"];
		text.innerHTML = chapterObj[chapter]["text"];
		image.src = chapterObj[chapter]["img"];
		btnpanel.innerHTML = "";

		//Build button panel
		for (i = 0; i < chapterObj[chapter]["options"].length; i++) {
			let button = document.createElement("button");
			let text = document.createTextNode(
				chapterObj[chapter]["options"][i]["text"]
			);
			button.appendChild(text);
			button.setAttribute(
				"onclick",
				chapterObj[chapter]["options"][i]["goto"]
			);
			//Check for gadgets
			if (chapterObj[chapter]["options"][i]["gadget"]) {
				button.setAttribute(
					"class",
					"action " + chapterObj[chapter]["options"][i]["gadget"]
				);
				if (
					eval("has" + chapterObj[chapter]["options"][i]["gadget"]) ==
					false
				) {
					button.setAttribute("class", "hide");
				}
			}
			btnpanel.appendChild(button);
		}

		//Check for end or win
		if (chapterObj[chapter]["end"]) {
			//Add to the list
			if (!endList.includes(chapterObj[chapter]["end"])) {
				endList.push(chapterObj[chapter]["end"]);
				endListStorage = JSON.stringify(endList);
				localStorage.setItem("endList", endListStorage);
				endopen.textContent = endList.length + " / 24 fins débloquées";
				endItem = document.querySelector(".end" + chapterObj[chapter]["end"]);
				endItem.classList.add("unlocked");
			}
			console.log(endList);
			//Change style
			document.body.classList.add("end");
			//Play sound
			if (allowSound == true) {
				deathSound.volume = 0.2;
				deathSound.currentTime = 0;
				deathSound.play();
			}
		} else if (chapterObj[chapter]["art"]) {
			//Add to list
			if (!artList.includes(chapterObj[chapter]["art"])) {
				artList.push(chapterObj[chapter]["art"]);
				artListStorage = JSON.stringify(artList);
				localStorage.setItem("artList", artListStorage);
				artopen.textContent = artList.length + " / 3 artéfacts";
				artItem = document.querySelector("." + chapterObj[chapter]["art"]);
				artItem.classList.add("unlocked");
			}
			//Change style
			document.body.classList.add("win");
			//Play sound
			if (allowSound == true) {
				winSound.volume = 0.2;
				winSound.currentTime = 0;
				winSound.play();
			}
		} else {
			//Change style
			document.body.classList.remove("end");
			document.body.classList.remove("win");
			//Play sound
			if (allowSound == true) {
				transitionSound.volume = 0.3;
				transitionSound.currentTime = 0;
				transitionSound.play();
			}
		}
	}

	//Item chapters
	function getRope(chapitre){
		hasRope = true;
		hasLockpick = false;
		hasBomb = false;
		hasSpray = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		goToChapter(chapitre);
	}

	function getKit(chapitre){
		hasRope = false;
		hasLockpick = true;
		hasBomb = false;
		hasSpray = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("hasLockpick", hasLockpick);
		goToChapter(chapitre);
		
	}

	function getBomb(chapitre){
		hasRope = false;
		hasLockpick = false;
		hasBomb = true;
		hasSpray = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("hasBomb", hasBomb);
		goToChapter(chapitre);
	}

	function getSpray(chapitre){
		hasRope = false;
		hasLockpick = false;
		hasBomb = false;
		hasSpray = true;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("hasSpray", hasSpray);
		goToChapter(chapitre);
	}

/*function checkRope(chapitreOui, chapitreNon){
	if(hasRope == true) {
		goToChapter(chapitreOui);
	} else {
		goToChapter(chapitreNon);
	}
}*/

//---MENUS---

//Opening menus
endopen.addEventListener("click", toggleEnd);
endclose.addEventListener("click", toggleEnd);

function toggleEnd() {
	endmenu.classList.toggle("hide")
	artmenu.classList.add("hide")
	settingsmenu.classList.add("hide");
}
artopen.addEventListener("click", toggleArt);
artclose.addEventListener("click", toggleArt);

function toggleArt() {
	artmenu.classList.toggle("hide")
	endmenu.classList.add("hide");
	settingsmenu.classList.add("hide");
}

settingsclose.addEventListener("click", toggleSettings);

function toggleSettings() {
	settingsmenu.classList.toggle("hide");
	endmenu.classList.add("hide");
	artmenu.classList.add("hide");
}

//Showing achievements names
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

//Settings
soundBtn.addEventListener("click", toggleSound);

function toggleSound() {
	allowSound = !allowSound;
	localStorage.setItem("allowSound", allowSound);

}

resetBtn.addEventListener("click", reset);

function reset() {
	localStorage.clear();
	window.location.reload();
}