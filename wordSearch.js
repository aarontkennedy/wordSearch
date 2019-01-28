const { performance } = require('perf_hooks');

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

// V1 object to read in a file and provide means to see if it has the word
function cDictionaryMap (dictionaryFile) {
    // read in the dictionary file
    // let dt0 = performance.now();
    const fs = require('fs');
    const rawData = fs.readFileSync(dictionaryFile, 'utf8');  

    // convert the dictionary into an array of individual words
    // let dt1 = performance.now();
    // console.log("readFileSync took " + (dt1 - dt0) + " milliseconds.");
    const arrayOfWords = rawData.split(/\s+/);

    // put the words into a map
    // let dt2 = performance.now();
    // console.log("rawData.split took " + (dt2 - dt1) + " milliseconds.");
    mapOfWords = new Map();
    for(let i = 0; i < arrayOfWords.length; i++) {
        mapOfWords.set(arrayOfWords[i].toLowerCase(), 1);
    } 
    // let dt3 = performance.now();
    // console.log("mapOfWords.set took " + (dt3 - dt2) + " milliseconds.");

    this.hasWord = (w) => {    
        return mapOfWords.has(w);
    };
}

// V2 use an array of words + includes - see if this is faster - WAY WORSE
function cDictionaryArray (dictionaryFile) {
    // read in the dictionary file
    // let dt0 = performance.now();
    const fs = require('fs');
    const rawData = fs.readFileSync(dictionaryFile, 'utf8');  

    // convert the dictionary into an array of individual words
    // let dt1 = performance.now();
    // console.log("readFileSync took " + (dt1 - dt0) + " milliseconds.");
    const arrayOfWords = rawData.split(/\s+/);

    // put the words into a map
    // let dt2 = performance.now();
    // console.log("rawData.split took " + (dt2 - dt1) + " milliseconds.");

    this.hasWord = (w) => {    
        return arrayOfWords.includes(w);
    };
}

// V3 use raw file + regex - see if this is faster - WAY WORSE & misses words
function cDictionaryRaw (dictionaryFile) {
    // read in the dictionary file
    // let dt0 = performance.now();
    const fs = require('fs');
    const rawData = fs.readFileSync(dictionaryFile, 'utf8');  

    this.hasWord = (w) => {    
        return !(null === rawData.match(new RegExp(`\s${w}\s`)));
    };
}

function cPuzzle (puzzleText, dictionaryObject, minWordLength=4) {
    // break the puzzle string into array horizontal lines
    let arrayOfLines = puzzleText.split("\n");
    for (let i = 0; i < arrayOfLines.length; i++) {
        arrayOfLines[i] = arrayOfLines[i].replace(/\s+/g, '').toLowerCase();
    }

    // get the vertical lines
    let arrayOfVerticalLines = new Array();
    for (let i = 0; i < arrayOfLines[0].length; i++) {
        let verticalString = "";
        for (let j = 0; j < arrayOfLines.length; j++) {
            verticalString += arrayOfLines[j].charAt(i);
        }
        arrayOfVerticalLines.push(verticalString);
    }
    arrayOfLines = arrayOfLines.concat(arrayOfVerticalLines);

    solutions = []; 
    this.solve = (print = true) => {
        solutions = []; 
        // check all the lines and the reverse of the line
        for (let i = 0; i < arrayOfLines.length; i++) {
            this.findWordsInLine(arrayOfLines[i]);
            this.findWordsInLine(arrayOfLines[i].split('').reverse().join(''));
        }
        if (print) {
            console.log(solutions);
        }
    }
    this.findWordsInLine = (line) => {
        const lastCharPositionToTest = line.length-minWordLength;
        // start finding words from the beginning of the line
        for (let i = 0; i <= lastCharPositionToTest; i++) {
            // work backwards from the full line down
            // break as soon as you find a valid word
            for (let j = line.length; j >= i+minWordLength; j--) {
                let wordToTest = line.substring(i,j);
                // console.log(`i = ${i} j = ${j} ${wordToTest}  (${line})`);
                if (dictionaryObject.hasWord(wordToTest)) {
                    solutions.push(wordToTest);
                    break;
                }
            }
        }
    }
}

function init (puzzleString = null, dictionaryFile = '/usr/share/dict/words') {
    var t0 = performance.now();
    dict = new cDictionaryMap(dictionaryFile);
    // var t1 = performance.now();
    // console.log("Call to new cDictionary took " + (t1 - t0) + " milliseconds.");

    if (!puzzleString) {
        puzzleString = samplePuzzle;
    }
    puzzle = new cPuzzle(puzzleString, dict);

    puzzle.solve();
    var t2 = performance.now();
    // console.log("Call to puzzle.solve took " + (t2 - t1) + " milliseconds.");
    console.log("Total runtime took " + (t2 - t0) + " milliseconds.");
}
init(firstArg, secondArg);



