let LeCommencement = {
	subtitle: "Le commencement",
	text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
	img: "",
	options: bouton = [
		{
			text: "Une corde",
			goto: "Hall",
            action: ""
		},
		{
			text: "Un kit de crochetage",
			goto: "Hall",
            action: ""
		},
		{
			text: "Une corde",
			goto: "Hall",
            action: ""
		},
		{
			text: "Un spray à cheveux",
			goto: "Hall",
            action: ""
		},
	],
}

let Hall = {
	subtitle: "Hall",
	text: "Vous êtes entré dans le hall. Tout semble calme pour l'instant plusieurs passages s'offrent à vous.",
	img: "",
	options: (bouton = [
		{
			text: "Une corde",
			goto: "",
			action: "",
		},
		{
			text: "Un kit de crochetage",
			goto: "",
			action: "",
		},
		{
			text: "Une corde",
			goto: "",
			action: "",
		},
		{
			text: "Un spray à cheveux",
			goto: "",
			action: "",
		},
	]),
};

function goToChapter(chapter){
    let chapitre = chapter
    console.log(chapter.options[0].text)
    let next = chapter.options[0].goto;
    console.log(next);
    goToChapter(next);
}