let ChapterObj = {
    LeCommencement: {
        subtitle: "Le commencement",
        text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
        img: "",
        options: [
            "Une corde", "Un kit de crochetage", "Des explosifs", "Un spray à cheveux"
        ],
        gadget: null
    },
}

function GoToChapter(chapter){
    let chapitre = chapter
    console.log(ChapterObj.LeCommencement.subtitle)
}