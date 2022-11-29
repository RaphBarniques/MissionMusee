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
let wallExploded = false;
let hasKeycard = false;
let allowSound = true;
let endList = [];
let artList = [];

//---CHAPTER INDEX---
let chapterObj = {
	LeCommencement: {
		subtitle: "Le commencement",
		text: "Bienvenue dans Mission Musée, Mission musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
		img: "images/musee.jpg",
		options: [
			{ text: "Une corde", goto: 'getRope("Hall")' },
			{ text: "Un kit de crochetage", goto: 'getKit("Hall")' },
			{ text: "Des explosifs", goto: 'getBomb("Hall")' },
			{ text: "Un spray à cheveux", goto: 'getSpray("Hall")' },
		],
	},

	Hall: {
		subtitle: "Le hall",
		text: "Vous êtes entré dans le hall. Tout semble calme pour l'instant. Plusieurs passages s'offrent à vous.",
		img: "images/hall.jpg",
		options: [
			{ text: "Partir à gauche ", goto: "goToChapter('Egypte')" },
			{ text: "Monter le grand escalier", goto: "goToChapter('Romains')", },
			{ text: "Partir à droite", goto: "goToChapter('Dino')" },
			{ text: "Tenter de désactiver les systèmes d'alarme", goto: "goToChapter('Zap')", gadget: "Lockpick", },
		],
	},

	Zap: {
		subtitle: "Zap!",
		text: "Vous avez bien essayé de désactiver les systèmes d'alarme avec vos outils, mais une seconde d'inattention a suffi pour que votre crochet court-circuite deux fils et vous électrocute à mort. Ouch…",
		img: "images/alarme.jpg",
		options: [{ text: "Retour au début", goto: "LeCommencement" }],
		end: "1",
	},

	Egypte: {
		subtitle: "L'Égypte ancienne",
		text: "Vous entrez dans l'exposition sur l'Égypte ancienne. Autour de vous se trouvent plusieurs momies, une énorme pyramide, et BEAUCOUP de sable. Au fond de la pièce se trouve une statue du sphinx. Vous apercevez également sur le mur de droite se trouve un bouton rouge qui semble hors de place.",
		img: "images/egypte.jpg",
		options: [
			{ text: "Chatouiller les momies", goto: 'goToChapter("Momies")' },
			{ text: "Grimper au sommet de la pyramide", goto: 'goToChapter("Pyramide")',},
			{ text: "Appuyer sur le bouton rouge", goto: 'goToChapter("TempeteSable")',},
			{ text: "Aller discuter avec le sphinx", goto: 'goToChapter("EnigmeSphinx")',},
		],
	},

	TempeteSable: {
		subtitle: "Tempête de sable",
		text: "Vous appuyer sur le bouton et la salle se met à trembler. Un vent qui semble venir de partout et nulle part à la fois se met à jeter le sable dans tous les sens. C'est une tempête de sable! Incrédule, vous oubliez de fermer votre bouche et vous mangez donc une pelletée de sable. Meilleure chance la prochaine fois!",
		img: "images/sable.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "2",
	},

	Pyramide: {
		subtitle: "Pierre qui roule…",
		text: "Arrivez au sommet de la pyramide, vous admirez la vue. Mais soudain, votre pied glisse et vous roulez jusqu'en bas de la pyramide. Vous arrivez en bas sans trop de dommages, mais il semblerait que vos cris aient affaibli la structure et un éboulis des pierres de la pyramide vous tombe dessus.",
		img: "images/eboulis.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "3",
	},

	Momies: {
		subtitle: "Guili Guili!",
		text: "Vous vous approchez des momies et, vous trouvant vraiment drôle, vous mettez à les chatouiller. De toute façon, elles sont mortes depuis très longtemps, elles ne peuvent rien faire. Ou en tout cas, c'est ce que vous pensiez! La dernière momie se réveille et vous pourchasse partout dans le musée. Vous n'avez pas d'autres choix que de vous enfuir du musée.",
		img: "images/momie.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "4",
	},

	EnigmeSphinx: {
		subtitle: "L'énigme du Sphinx",
		text: "Vous vous approchez du Sphinx et celui-ci vous pose une énigme : Quel être, pourvu d'une seule voix, a d'abord quatre jambes le matin, puis deux jambes à midi, et trois jambes le soir ?",
		img: "images/sphynx.jpg",
		options: [
			{ text: "L'Homme", goto: 'goToChapter("MoyenAge")' },
			{ text: "Mardi", goto: 'goToChapter("EnigmeMauvais")' },
			{ text: "Orange", goto: 'goToChapter("EnigmeMauvais")' },
			{ text: "Oui", goto: 'goToChapter("EnigmeMauvais")' },
		],
	},

	EnigmeMauvais: {
		subtitle: "Franchement…",
		text: "Je commence à croire que vous faites exprès!",
		img: "images/ane.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "5",
	},

	MoyenAge: {
		subtitle: "Le Moyen-Âge",
		text: "Vous arrivez dans la salle d'exposition sur le Moyen-Âge. C'est franchement impressionnant. Autour de vous vous pouvez voir des armures, un dragon et une statue d'un roi et même la tombe d'un chevalier.",
		img: "images/moyenage.jpg",
		options: [
			{ text: "Courir vers la porte de l'autre côté de la salle", goto: 'goToChapter("Brochette")', },
			{ text: "Partager votre lunch avec le dragon", goto: 'goToChapter("Dragon")', },
			{ text: "Ouvrir le tombeau", goto: 'goToChapter("Peste")' },
			{ text: "Arroser le roi", goto: 'goToChapter("Roi")', gadget: "Spray", },
		],
	},

	Brochette: {
		subtitle: "Une brochette de voyou",
		text: "Les règles du Moyen-Âge sont les mêmes qu'à la piscine… On ne court pas! Et comme de fait, vous glissez et tombez contre la lance d'une des armures. ",
		img: "images/lance.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "6",
	},

	Peste: {
		subtitle: "Le grand retour de la peste",
		text: "Pas de doute, le chevalier à l'intérieur est bel et bien mort. Mais le virus de la peste, lui, est bien vivant! Non seulement vous en mourrez, mais vous forcez toute la planète à porter des masques pendant plusieurs années. Pas cool…",
		img: "images/peste.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "7",
	},

	Roi: {
		subtitle: "Qu'on lui coupe la tête!",
		text: "Vous n'êtes toujours pas certain de pourquoi, mais une folle envie vous prend d'asperger la statue du roi avec votre spray. Seul problème, c'est qu'au même moment où vous arrosez le visage du roi, celui-ci ouvre les yeux et se met à bouger. Furieux, il vous envoie à la guillotine. ",
		img: "images/roi.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "8",
	},

	Dragon: {
		subtitle: "Piquenique avec le dragon",
		text: "Vous vous approchez du grand dragon et lui offrez un bout de votre sandwich. Celui-ci paraît flatté et accepte. Vous discutez donc pendant de longues heures avec l'amical dragon. Vous lui expliquez votre plan et cela semble l'amuser. Celui-ci vous offre de vous escorter jusqu'à la salle suivante.",
		img: "images/dragon.jpg",
		options: [{ text: "Suivre le dragon", goto: "checkLasers()" }],
	},

	Rayons: {
		subtitle: "Une salle comme une autre",
		text: "Vous arrivez dans une grande salle vide. Tout est calme. Seul le bruit de la ventilation vient perturber le silence. Au bout de la salle, le tableau est accroché au mur. Vous y êtes presque!",
		img: "images/piecetableau.png",
		options: [
			{ text: "Marcher vers le tableau", goto: 'goToChapter("RayonsMort")',},
			{ text: "Arroser vos alentours", goto: 'goToChapter("RayonsSpray")', gadget: "Spray",},
			{ text: "Grimper dans la ventilation.", goto: 'goToChapter("Ventilation")', gadget: "Rope", },
		],
	},

	RayonsSpray: {
		subtitle: "Comme dans les films d'espion",
		text: "Votre instinc d'agent secret vous dicte de vous méfier. Vous sortez donc votre spray et arrosez vos alentours. sous vos yeux, des centaines de rayons laser apparraissent. Vous commencez à vous tortiller entre les rayons et finissez par arriver de l'autre côté sans même accrocher en accrocher un seul.",
		img: "images/piecelaser.png",
		options: [
			{ text: "Emparez-vous du tableau", goto: 'goToChapter("Tableau")' },
		],
	},

	RayonsEau: {
		subtitle: "Petite inondation…",
		text: "Vous arrivez dans une grande salle vide. Ou presque! L'eau de l'aquarium semble avoir coulé jusqu'ici! La bonne nouvelle c'est que le tableau ne semble pas mouillé. Encore mieux, l'eau s'est infiltrée dans les murs et a court-circuité les systèmes de rayons laser invisibles! ",
		img: "images/inondation.jpg",
		options: [
			{ text: "Patauger jusqu'au tableau", goto: 'goToChapter("Tableau")', },
		],
	},

	RayonsMort: {
		subtitle: "Il n'en restât que des poussières",
		text: "Vous avancez dans la pièce, mais à peine avez-vous fait quelques pas que votre jambe rencontre un laser invisible. En moins de quelques secondes, votre jambe se désintègre, suivie rapidement par le reste de votre corps. Vous formez un petit tas de cendres par terre. Je crains bien que ce soit la fin pour vous!",
		img: "images/piecelaser.png",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "9",
	},

	Ventilation: {
		subtitle: "Comme James Bond",
		text: "À l'aide de votre corde, vous vous hissez dans les canaux de ventilations. Ceux-ci sont pleins de poussière et de crottes de rats. Miam! Mais soudain, le conduit s'affaisse et vous tombez… dans le coffre-fort du musée! Quelle chance! Et voilà le diamant juste devant vous!",
		img: "images/vent.jpg",
		options: [
			{ text: "Prendre le diamant", goto: 'goToChapter("Diamant")' },
		],
	},

	Tableau: {
		subtitle: "Félicitations!",
		text: "Vous avez trouvé le tableau! Celui-ci fera le grand bonheur des collectionneurs qui paieront le prix fort pour en prendre possession. Mais ne fêtons pas trop vite! Il vous reste encore des objets à trouver!",
		img: "images/tableau.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		art: "peinture",
	},

	Romains: {
		subtitle: "Les Ro-ro, les Ro-ro, les Romaiiiiins!",
		text: "Vous entrez dans l'exposition permanente sur les Romains. La salle est pleine d'objets représentant cette époque. Une catapulte, une représentation du Colisée de Rome, une statue de cire représentant Jules César sur un trône et un chaudron de potion magique(?). Que faire?",
		img: "images/romains.jpg",
		options: [
			{ text: "Examiner la catapulte", goto: 'goToChapter("Catapulte")' },
			{ text: "Se rendre dans le Colisée", goto: 'goToChapter("Fauves")', },
			{ text: "Saluer Jules César", goto: 'goToChapter("Cesar")' },
			{ text: "Boire la potion magique", goto: 'goToChapter("Potion")' },
		],
	},

	Fauves: {
		subtitle: "Qu'on fasse entrer les fauves!",
		text: "Vous vous rendez au centre du Colisée. C'est franchement intimidant. Au loin, vous entendes des trompettes. Sans même avoir le temps de vous demander d'où ce bruit provient, vous vous retrouvez nez à nez avec des fauves affamés qui entrent dans l'arène. Je ne donne pas cher de votre peau!",
		img: "images/colisee.png",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "10",
	},

	Potion: {
		subtitle: "Un peu de guis",
		text: "Votre intuition vous guide vers cette grande marmite de potion magique. Le panneau explicatif relate comment elle a servi à certains peuples à garder les troupes romaines éloignées. Vous décidez d'en prendre une gorgée. Est-ce que je vous avais parlé de la règle qui dit : Ne pas manger ni boire les choses qui sont vieilles de plus de 2000 ans? Ouais, ça aurait pu éviter de vous empoisonner bêtement.",
		img: "images/chaudron.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "11",
	},

	Cesar: {
		subtitle: "Avé, César!",
		text: "Avé César! C'est ce que vous auriez dû dire. Pourtant vous y êtes allé d'un simple \"Salut, Jules!\". Celui-ci, furieux de ce manque de respect, prend vie et demande à ses gardes de s'emparer de vous. Il décide que pour vous punir, vous serez mis dans une boite et envoyé à sa douce Cléopâtre. Bon voyage!",
		img: "images/cesar.jpg",
		options: [{ text: "Accrochez-vous!", goto: 'goToChapter("Egypte")' }],
	},

	Catapulte: {
		subtitle: "À la une! À la deux! À la troiiiiis!",
		text: "Grand amateur de catapulte que vous êtes, vous examinez ce magnifique artéfact. Il semble avoir été plutôt bien conservé! Vous en faites plusieurs fois le tour, résistant l'envie d'y toucher. Mais vos pieds se prennent dans un bout de corde au sol et la tension sur celle-ci active la catapulte. Seulement, vous y êtes maintenant attaché par la cheville! La force de la catapulte vous fait défoncer le plafond avant de retomber et de passer au travers du plancher des deux étages sous vous.  ",
		img: "images/catapulte.jpg",
		options: [{ text: "Ouch…", goto: 'goToChapter("SousSol")' }],
	},

	SousSol: {
		subtitle: "Dans les profondeurs",
		text: "Vous vous écrasez donc sur le béton du sous-sol. C'est plutôt sombre, mais vous êtes tout de même en mesure de voir que vous vous trouvez dans la salle des fournaises. Un grondement sourd venant d'un couloir non loin se fait entendre. Près du couloir, une porte verrouillée attire votre attention.",
		img: "images/soussol.jpg",
		options: [
			{ text: "Suivre le grondement", goto: "goToChapter('CoffreFort')" },
			{ text: "Est-ce qu'il y a quelqu'un?", goto: 'goToChapter("Fantome")', },
			{ text: "Faire sauter la fournaise", goto: 'goToChapter("Fournaise")', gadget: "Bomb", },
			{ text: "Crocheter la porte", goto: 'goToChapter("Garda")', gadget: "Lockpick", },
		],
	},

	Fournaise: {
		subtitle: "Kaboom!",
		text: "Bon… J'ai beaucoup de difficultés à m'expliquer ce qui vous a passé par la tête… Qu'est-ce que vous pensiez qui allait vraiment se passer? Donc… Le musée complet a sauté, avec vous à l'intérieur, bien évidemment! Je crois que vous devriez recommencer… En pensant avec votre tête cette fois!",
		img: "images/***",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("FauxDebut")' },
		],
		end: "12",
	},

	FauxDebut: {
		subtitle: "Le commencement",
		text: "Bienvenue dans Mission Musée, Mission, musée, Mission Musée. Votre mission est de dérober 3 items du musée, soit une toile d'une valeur inestimable, une statue ancienne et le plus gros diamant du monde! Mais avant de commencer, vous pouvez choisir un objet pour vous aider. Choisissez bien, votre sort pourrait dépendre de cet objet! Bonne chance!",
		img: "images/musee.jpg",
		options: [
			{ text: "Une corde", goto: 'goToChapter("Loop")' },
			{ text: "Un kit de crochetage", goto: 'goToChapter("Loop")' },
			{ text: "Des explosifs", goto: 'goToChapter("Loop")' },
			{ text: "Un spray à cheveux", goto: 'goToChapter("Loop")' },
		],
	},

	Loop: {
		subtitle: "My bad!",
		text: "Oups! Mon erreur! Je crois que j'ai oublié de réinitialiser le jeu… Donnez-moi un instant… Voilà! Ça devrait être réglé maintenant!",
		img: "images/ruines.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "13",
	},

	Fantome: {
		subtitle: "Boo!",
		text: "En posant cette question à voix autres, avez-vous réfléchi au fait que vous pouvez avoir une réponse? Eh oui, vous avez réveillé un fantôme de la place! Vous vous mettez à crier et à courir vers la sortie. Peut-être reviendrez-vous durant la journée lorsqu'il n'y aura plus de fantômes dans les parages!",
		img: "images/fantome.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "14",
	},

	Garda: {
		subtitle: "Le local de la Garda",
		text: "Vous crochetez la serrure et arrivez dans le local de la sécurité. Heureusement, celui-ci est vide. Vous jetez un œil aux caméras de sécurité, mais une carte sur le bureau attire votre attention. Il s'agit d'une carte magnétique de niveau 3. Voilà qui pourrait être utile! vous empochez la carte et montez l'escalier au fond de la pièce.",
		img: "images/garda.jpg",
		options: [{ text: "On monte!", goto: 'getKeycard("Dino")' }],
	},

	CoffreFort: {
		subtitle: "Le coffre-fort",
		text: "Vous vous retrouvez devant l'énorme porte du coffre-fort du musée. C'est à l'intérieur que se trouve le légendaire diamant. Mais comment entrer?",
		img: "images/coffre.jpg",
		options: [
			{ text: "Faire sauter la porte", goto: 'goToChapter("Diamant")', gadget: "Bomb", },
			{ text: "Tenter de forcer la porte", goto: 'goToChapter("CoffreFortMort")' },
		],
	},

	CoffreFortMort: {
		subtitle: "J'ai faim!",
		text: "Vous tentez de forcer la porte, mais cela enclenche un piège et toutes les issues de la salle. Ça y est, vous êtes pris au piège. Les jours passent et personne ne se rend compte de votre présence. Vous finissez par mourir de faim. Dommage, vous étiez si près! ",
		img: "images/pain.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "15",
	},

	Diamant: {
		subtitle: "Félicitations!",
		text: "Voilà le diamant! Il est encore plus beau que ce que vous aviez imaginé! Mais n'oubliez pas, il vous reste encore des objets à trouver!",
		img: "images/diamant.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		art: "diamant",
	},

	Dino: {
		subtitle: "L'ère préhistorique",
		text: "Vous arrivez dans la salle d'exposition sur l'ère préhistorique. Autour de vous, du feuillage, des lianes, des herbes hautes, une grande montagne et surtout, au centre de la pièce, un énorme squelette de dinosaure trônant sur un piedestal  donne son allure intimidante à la pièce.",
		img: "images/dinoexpo.jpg",
		options: [
			{ text: "Prendre le dinosaure au lasso", goto: 'goToChapter("Lasso")', gadget: "Rope", },
			{ text: "Se promener dans les herbes hautes", goto: 'goToChapter("Plantes")', },
			{ text: "Sauter de liane en liane", goto: 'goToChapter("Liane")' },
			{ text: "Escalader la montagne", goto: 'goToChapter("Volcan")' },
		],
	},

	Lasso: {
		subtitle: "Comme Lucky Luke… ou à peu près",
		text: "Vous vous rappelez le passage d'un cowboy à votre école primaire pour faire un atelier de lasso. Depuis cette journée charnière de votre vie, vous ne pouvez vous empêcher de vous entraîner avec tout ce qui vous entoure. Et hop! Du premier coup! Mais votre célébration ne durera pas longtemps puisque l'énorme dinosaure se met à bouger et tire d'un grand coup sur la corde. Celle-ci, accrochée à votre poignet, vous propulse si fort que vous êtes éjecté du batîment. Bon vol!",
		img: "images/laisse.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "16",
	},

	Plantes: {
		subtitle: "L'heure du lunch",
		text: "Vous vous aventurez dans les herbes hautes. Vous vous interrogez à savoir ce qui peut bien se trouver de l'autre côté. Mais il semble que vous ne le saurez jamais puisque vous marchez sur une racine qui se met à vibrer sous votre pied. L'origine de cette racine, une grosse plante préhistorique se met à crier... et vous croque la tête. La prochaine fois, regardez où vous mettez les pieds!",
		img: "images/plante.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "17",
	},

	Volcan: {
		subtitle: "C'est chaud, c'est chaud, c'est chaud!",
		text: "Vous vous mettez à ecalader de façon enthousiaste la montagne. Cela prendra des heure mais ce que la vue en vaudra la peine! Arrivé au sommet, vous êtes essouflé et avez très chaud. Très chaud. TROP chaud! Vous baissez les yeux et appercevez un énorme lac de lave. Ce n'est pas une montagne! C'est un volcan! Dans la panique, vous vous mettez à crier. Le volcan gronde puis explose. Aïe!",
		img: "images/volcan.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "18",
	},

	Liane: {
		subtitle: "George de la jungle",
		text: "Pris d'une pulsion animale, vous grimpez dans un arbre et, tout en agrippant une liane, vous jetez dans le vide. Un cri tribal sort de votre bouche. Vous n'avez plus le contrôle, c'est votre instinc qui vous garde en vie, en vous balançant de liane en lianes. Mais vous arrivez rapidement à la fin de la petite jungle et avec tout votre momentum, volez jusqu'à la porte de la prochaine salle.",
		img: "images/liane.jpg",
		options: [
			{ text: "OOOOOoooOOOoooooooo", goto: 'goToChapter("Aquarium")' },
		],
	},

	Aquarium: {
		subtitle: "L'Aquarium",
		text: "Vous arrivez tant bien que mal dans cette grande pièce remplie de grands aquariums. Des lumières bleutées bougent lentement donnant l'impression de marcher sous l'eau. Dans les murs, des centaines de poissons nagent dans tout les sens. Au centre de la pièce, un grand bassin de raie avec une inscription vous invitant à les flatter. Autour de vous se trouvent différents aquariums. L'un est rempli de poissons rouges, l'autre semble vide et le dernier contient une énorme perle. Une echelle est accotée sur la vitre de ce dernier.",
		img: "images/aqua.png",
		options: [
			{ text: "Aller voir les poissons clowns", goto: 'goToChapter("Nemo")', },
			{ text: "Grimper l'échelle et nager vers la perle", goto: 'goToChapter("Pirhana")', },
			{ text: "Flatter les raies", goto: 'goToChapter("Anguille")' },
			{ text: "Faire exploser l'aquarium vide", goto: 'explodeWall("Mur")', gadget: "Bomb",},
		],
	},

	Mur: {
		subtitle: "Mine sous-marine",
		text: "Vous décidez de lancer votre paquet d'explosifs dans l'aquarium vide, vous n'êtes pas un monstre non plus. L'onde de choc fissure le mur du fond et l'eau commence à se vider. Vous attrapez l'échelle, sautez dans le fond d'eau et vous glissez dans la fissure du mur.",
		img: "images/mur.jpg",
		options: [{ text: "Ça passe!", goto: 'goToChapter("MoyenAge")' }],
	},

	Pirhana: {
		subtitle: "Plouf",
		text: "Vous montez l'échelle et vous jetez vers la grosse perle. Mais quelque chose vous retient. Vous regardez derrière vous et voyez une bande de pirhanas qui vous retiennent et se jettent sur vous. En moins de quelques secondes, vous vous faites dévorer de la tête aux pieds.",
		img: "images/poisson.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "19",
	},

	Anguille: {
		subtitle: "Toucher électrique",
		text: "Vous vous approchez du bassin et tendez votre main dans l'eau. Vous êtes surpris par la douceur du dos des raies qui se promènnent. Mais, tout d'un coup, Vous effleurez quelques chose d'un peu moins agréable. Des anguilles! Il y a des anguilles électriques dans le bassin! Avant même d'avoir pu faire un geste, elles s'agrippent à vous et vous électrocutent.",
		img: "images/electric.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "20",
	},

	Nemo: {
		subtitle: "Trouver Némo",
		text: "Vous vous approchez de l'aquarium rempli de poissons clowns. L'un d'entre eux s'adresse à vous. Il se prénomme Martin et cherche son fils. Confus, vous lui pointez un groupe de jeunes poissons clowns. Celui-ci verse une larme (?) et vous remercie de tout coeur de l'avoir aidé. Il vous guide jusqu'à la porte au fond de la salle tout en lui souhaitant bonne chance.",
		img: "images/nemo.jpg",
		options: [{ text: "Eh bien!", goto: 'goToChapter("Bureau")' }],
	},

	Bureau: {
		subtitle: "Le bureau",
		text: "Vous arrivez devant la porte d'un bureau, qui, au petit écriteau sur la porte, semble appartenir au bureau du directeur du musée. C'est là que se trouve la légendaire statue. Mais comment entrer? Sur la porte, une serrure électronique vous bloque l'accès.",
		img: "images/door.jpg",
		options: [
			{ text: "Révéler les empreintes sur le clavier", goto: 'goToChapter("Statue")', gadget: "Spray", },
			{ text: "Utiliser la carte d'accès", goto: 'goToChapter("Statue")', gadget: "Keycard", },
			{ text: "Essayer des codes au hasard", goto: 'goToChapter("BureauMort")',}
		],
	},

	BureauMort: {
		subtitle: "Whaaaat!?",
		text: "Vous arrivez devant la porte d'un bureau, qui, au petit écriteau sur la porte, semble appartenir au bureau du directeur du musée. C'est là que se trouve la légendaire statue. Mais comment entrer? Sur la porte, une serrure électronique vous bloque l'accès. Vous tentez de forcer la serrure mais en vain. Un bruit sourd derrière vous se fait entendre. Puis, plus rien. Puis tout d'un coup le mur explose et laisse passer... l'énorme squelette de dinosaure qui semble furieux. Celui-ci vous réduit en boullie en l'espace de quelque secondes. Si près du but!",
		img: "images/dino.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		end: "21",
	},

	Statue: {
		subtitle: "Félicitations!",
		text: "Voilà la statue! Le buste imposant semble vieux… et précieux! Voilà qui vous vaudra une petite fortune! Mais n'oubliez pas, il vous reste encore des objets à trouver!",
		img: "images/buste.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		art: "statue",
	},

	Win: {
		subtitle: "Victoire !",
		text: "Wow… Il semble que vous ayez rammassé tout les objets… Félicitations! Mais avez-vous débloqué toute les fins? Il vous reste encore à faire! Vous pouvez regarder quelles fin vous avez débloquées en cliquant sur le compteur au bas de la page. Bonne chasse!",
		img: "images/victoire.jpg",
		options: [
			{ text: "Retour au début", goto: 'goToChapter("LeCommencement")' },
		],
		art: "",
	},

	WinEnd: {
		subtitle: "Ok, là c'est fini!",
		text: "Félicitations. Je ne sais même pas quoi dire. Vous avez tout trouvé. En fait, je dit tout… Pas tout exactement… Il ne vous manque qu'une seule chose…",
		img: "images/interr.jpg",
		options: [
			{ text: "Découvrir ce qu'il vous manque !", goto: "rickroll()" },
		],
		art: "",
	},
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
		for (i = 0; i < endList.length; i++) {
			endItem = document.querySelector(".end" + endList[i]);
			endItem.classList.add("unlocked");
			console.log(".end" + endList[i])
		}
	}

	if (localStorage.getItem("artList") != null) {
		artList = JSON.parse(localStorage.getItem("artList"));
		console.log("artList loaded : " + artList);
		artopen.textContent = artList.length + " / 3 artéfacts";
		for (i = 0; i < artList.length; i++) {
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
		wallExploded = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("wallExploded", wallExploded);
		goToChapter(chapitre);
	}

	function getKit(chapitre){
		hasRope = false;
		hasLockpick = true;
		hasBomb = false;
		hasSpray = false;
		wallExploded = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("wallExploded", wallExploded);
		goToChapter(chapitre);
		
	}

	function getBomb(chapitre){
		hasRope = false;
		hasLockpick = false;
		hasBomb = true;
		hasSpray = false;
		wallExploded = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("wallExploded", wallExploded);
		goToChapter(chapitre);
	}

	function getSpray(chapitre){
		hasRope = false;
		hasLockpick = false;
		hasBomb = false;
		hasSpray = true;
		wallExploded = false;
		localStorage.setItem("hasRope", hasRope);
		localStorage.setItem("hasLockpick", hasLockpick);
		localStorage.setItem("hasBomb", hasBomb);
		localStorage.setItem("hasSpray", hasSpray);
		localStorage.setItem("wallExploded", wallExploded);
		goToChapter(chapitre);
	}

	function explodeWall(chapitre){
		wallExploded = true;
		localStorage.setItem("wallExploded", wallExploded);
		goToChapter(chapitre);
	}

	function getKeycard(chapitre) {
		hasKeycard = true;
		localStorage.setItem("hasKeycard", hasKeycard);
		goToChapter(chapitre);
	}

	function checkLasers() {
		wallExploded = localStorage.getItem(wallExploded);
		if (wallExploded == true) {
			goToChapter("RayonsEau");
		} else {
			goToChapter("Rayons");
		}
	}

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