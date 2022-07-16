document.getElementById('btngvup').onclick = function() {
    location.href = 'index.html';
}
const wordContainer = document.getElementById('wordContainer');
const usedLettersElement = document.getElementById('usedLetters');
const startGameButton = document.getElementById('btnnwgame');

let canvas = document.getElementById('canvas');
let c = canvas.getContext("2d");
c.canvas.width = 0;
c.canvas.height = 0;

//Drawing the hang of the hangman
const drawHangMan = () => {
    c.canvas.width  = 120;
    c.canvas.height = 160;
    c.scale(20, 20);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#d95d39';
    c.fillRect(0, 7, 4, 1);
    c.fillRect(1, 0, 1, 8);
    c.fillRect(2, 0, 3, 1);
    c.fillRect(4, 1, 1, 1);
};


//body parts of the hangman
const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

//vars
let selectedWord;
let usedLetters;
let mistakes;
let hits;


//start game button
const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML= '';
    usedLettersElement.innerHTML = '';
    startGameButton.style.display = 'none';
    drawHangMan();
    pickRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);

};
startGameButton.addEventListener('click', startGame);

//words
var words = ["Hello", "HTML", "CSS", "React", "Javascript", "C","Go", "NET", "NETCORE", "JAVA", "PYTHON", "Swift", "Kotlin"];

//Pick a random word
const pickRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

//draw word
const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    } )
};

const addBodyPart = bodyPart => {
    c.fillStyle = '#fff';
    c.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
};

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startGameButton.style.display = 'block';
}

const correctLetter = letter => {
    const {children} = wordContainer;
    for (let i = 0; i < children.length; i++){
        if(children[i].innerHTML === letter){
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame();
};

const letterInput = letter => {
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    }
    else{
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-z]$/i) && !usedLetters.includes(newLetter)){
        letterInput(newLetter);
    }
};

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}