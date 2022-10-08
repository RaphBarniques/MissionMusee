let takeKit = function () {
	console.log("take");
};
let LeCommencement = {
	subtitle: "Le commencement",
	text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
	img: "",
	options: [
		{
			text: "Une corde",
			goto: "Hall",
			action() {
				console.log("Vous avez pris la corde");
			},
		},
		{
			text: "Un kit de crochetage",
			goto: "Hall",
			action() {
				console.log("Vous avez pris la corde");
			},
		},
		{
			text: "Des explosifs",
			goto: "Hall",
			action() {
				console.log("Vous avez pris la corde");
			},
		},
		{
			text: "Un spray à cheveux",
			goto: "Hall",
			action() {
				console.log("Vous avez pris la corde");
			},
		},
	],
};

let Hall = {
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
};

function goToChapter(chapter) {
	console.log(chapter.subtitle);
	console.log(chapter.text);
	console.log(chapter.options[0].text);
	console.log(chapter.options[0].goto);
	if (chapter.options[0].action) {
		chapter.options[0].action();
	}
}
