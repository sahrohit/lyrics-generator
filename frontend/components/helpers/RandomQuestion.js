const questions = [
	"you got to give what you take",
	"oh will you ever change your mind",
	"the future may still give you a chanceno more lying friends",
	"subway's no way for a good man to go down",
	"you stand at the edge while people run you through",
	"while mona lisas and mad hatters",
	"well, i read some books and i read some magazines",
	"reality runs up your spine",
	"i'm a bitch, i'm a bitch, oh, the bitch is back",
	"i suppose it's like forgetting, losing who you are",
	"and then i feel a change",
	"something bursting me wide open impossible to hide",
	"i should have listened to my old man",
	"but the sun's been quite kind while i wrote this song",
	"this morning's unprecedented solar eclipse is no cause for alarm",
	"he saves with a mighty hand",
	"oh oh, children of the land",
	"it'll drain the power that's in you",
	"this rage that lasts a thousand years",
	"can you hear me you peers",
	"and a why and a wherefore",
	"if you can't make up your mind",
	"now people come from everywhere",
	"and i've walked her wild and rugged paths",
	"but it opened up the space for us to be",
	"her mama keeps the baby and grandpa rambles on",
	"or sometimes it's the tv or she'll try to write a letter",
	"the same then the morning the same",
	"everyone have tears in their eyes",
];

const randomQuestion = () => {
	return questions[Math.floor(Math.random() * questions.length)];
};

export default randomQuestion;
