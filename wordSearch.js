/*
node wordSearch.js "A T L L F U V D E Y O B Z V D 
W F B N E D X G H E A N P O R 
O T V B Y L A L G T D K E A A 
D O O W D R A H H E L A S P Y 
A P P E A K H R O F X W L X O 
W B R G A T O M M B R O K E R 
M C X G X O U I E O K L Y K W 
A O E F M R S L S N L R S I I 
S N O D B C E Q P R I U K U P 
T E G R I P E B O Q U I Q T C 
B P A S D Q P E T X J P S E R 
B R K R R E U E T T D Z D K L 
L A J B C B B L E U B I U R F 
L N H S F H T K R K G H Y A M 
O J H D N Q A J S Q P L R M U" /usr/share/dict/words
*/

const samplePuzzle = `A T L L F U V D E Y O B Z V D 
W F B N E D X G H E A N P O R 
O T V B Y L A L G T D K E A A 
D O O W D R A H H E L A S P Y 
A P P E A K H R O F X W L X O 
W B R G A T O M M B R O K E R 
M C X G X O U I E O K L Y K W 
A O E F M R S L S N L R S I I 
S N O D B C E Q P R I U K U P 
T E G R I P E B O Q U I Q T C 
B P A S D Q P E T X J P S E R 
B R K R R E U E T T D Z D K L 
L A J B C B B L E U B I U R F 
L N H S F H T K R K G H Y A M 
O J H D N Q A J S Q P L R M U`;

const firstArg = process.argv[2];
const secondArg = process.argv[3];

function cDictionary (dictionaryFile) {
    this.mapOfWords = null;

    const fs = require('fs');
    const rawData = fs.readFileSync(dictionaryFile, 'utf8');  
    const arrayOfWords = rawData.split(/\s+/);
    this.mapOfWords = new Map();
    for(let i = 0; i < arrayOfWords.length; i++) {
        this.mapOfWords.set(arrayOfWords[i].toLowerCase(), 1);
    } 

    this.hasWord = (w) => {    
        return this.mapOfWords.has(w);
    };
}

function cPuzzle (puzzleText, dictionaryObject) {
    let arrayOfLines = puzzleText.split("\n");
    for (let i = 0; i < arrayOfLines.length; i++) {
        arrayOfLines[i] = arrayOfLines[i].replace(/\s+/g, '').toLowerCase();
    }

    let arrayOfVerticalLines = new Array();
    for (let i = 0; i < arrayOfLines[0].length; i++) {
        let verticalString = "";
        for (let j = 0; j < arrayOfLines.length; j++) {
            verticalString += arrayOfLines[j].charAt(i);
        }
        arrayOfVerticalLines.push(verticalString);
    }
    arrayOfLines.concat(arrayOfVerticalLines);

    solutions = []; 
    this.solve = (print = true) => {
        solutions = []; 
        for (let i = 0; i < arrayOfLines.length; i++) {
            this.findWordsInLine(arrayOfLines[i]);
            // this.findWordsInLine(arrayOfLines[i].reverse());
        }
        if (print) {
            console.log(solutions);
        }
    }
    this.findWordsInLine = (line) => {
        solutions.push(line);
    }
}

function init (puzzleString = null, dictionaryFile = '/usr/share/dict/words') {

    dict = new cDictionary(dictionaryFile);

    if (!puzzleString) {
        puzzleString = samplePuzzle;
    }
    puzzle = new cPuzzle(puzzleString, dict);

    puzzle.solve();
}
init(firstArg, secondArg);



