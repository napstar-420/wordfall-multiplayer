import { getRandomNumber } from "./gameUI.js";
import { app } from "./app.js";

const wordsList = [
  "sample",
  "specimen",
  "max",
  "longest",
  "mine",
  "taper",
  "sizing",
  "everest",
  "bo",
  "toe",
];

const letterStyling = new PIXI.TextStyle({
  fontFamily: "Barlow",
  fontSize: 24,
  fill: "#ffffff",
});

const typedLetterStyling = new PIXI.TextStyle({
  fontFamily: "Barlow",
  fontSize: 24,
  fill: "yellow",
});

export function startGame(container, loadScoreBoard) {
  
  let wordsOnScreen = [];
  let activeWord = null;
  let activeWordIndex = null;
  let counter = 1;
  let wordSpeed = 1;
  let score = 0;
  let multiplier = 1;
  let troubledWords = [];

  document.addEventListener("keyup", handleGame);

  // This function create new word
  function createWord() {
    const wordContainer = new PIXI.Container();
    const word = wordsList[getRandomNumber(wordsList.length - 1, 0)];
    const texture = PIXI.Texture.from("/src/assets/images/letters tile 1.png");
    const sprite = new PIXI.Sprite(texture);
    sprite.width = 0;
    sprite.height = 0;
    wordContainer.addChild(sprite);
    let letterWidth = 15;
    // looping letters
    [...word].forEach((l) => {
      let letter = new PIXI.Text(l);
      letter.style = letterStyling;
      letter.x = letterWidth;
      letter.y = 5;
      wordContainer.addChild(letter);
      letterWidth += letter.width + 1;
    });
    sprite.width = wordContainer.width + 15;
    sprite.height = wordContainer.height + 10;
    wordContainer.x = getRandomNumber(900, 50);
    wordContainer.y = -20;
    container.addChild(wordContainer);
    return wordContainer;
  }

  // This Function launches new words on screen
  (function launchWord() {
    const word = createWord(container);
    wordsOnScreen.push(word);
    setTimeout(() => {
      wordSpeed += 0.1;
      launchWord();
    }, 2500);
  })();

  // This function will be run when user types
  function handleGame(e) {
    const key = e.key
    // if there is no active key
    if (!activeWord) {
      // loops through words on screen
      wordsOnScreen.forEach((word, index) => {
        if (key === word.children[1].text) {
          word.active = true;
          activeWord = word;
          activeWordIndex = index;
          counter++;
          word.children[1].style = typedLetterStyling;
          return;
        }
      })
      // if active word exist
    } else if (activeWord.children[counter].text === key) {
      wordsOnScreen[activeWordIndex].children[counter].style = typedLetterStyling;
      counter++;
      // if users types the entire word correctly
      if (activeWord.children.length === counter) {
        score = score + (activeWord.children.length * multiplier);
        container.children[3].children[0].text = score;
        container.removeChild(activeWord);
        wordsOnScreen.splice(activeWordIndex, 1);
        activeWord = null;
        activeWordIndex = null;
        counter = 1;
      }
    } else {
      // if user mistypes
      let troubledWord = '';
      wordsOnScreen[activeWordIndex].children.forEach((letter, index) => {
        if (index > 0) {
          letter.style = letterStyling;
          troubledWord = troubledWord.concat(letter.text);
        }
      });
      troubledWords.unshift(troubledWord);
      activeWord = null;
      activeWordIndex = null;
      counter = 1;
    }
  }

  app.ticker.add(gameLoop);

  function gameLoop() {
    updateWords();
  }

  // This function update words on screen
  function updateWords() {
    wordsOnScreen.forEach((word, index) => {
      if (word) {
        word.y += wordSpeed;
        if (word.y > app.view.height - 300) {
          // this will be collision check
          container.children[2].children.forEach((flower, index) => {
            const collision = testForCollision(word, flower);
            if (collision) {
              container.children[2].removeChild(flower);
              if (container.children[2].children.length === 0) {
                endGame();
              }
            }
          })
        }
        // If word reached the ground
        if (word.y > app.view.height - 140) {
          word.dead = true;
          container.removeChild(word);
          wordsOnScreen.splice(index, 1);
          if (activeWord && activeWordIndex > index) {
            activeWordIndex = activeWordIndex - 1;
          }
          if (word.active === true) {
            activeWord = null;
            activeWordIndex = null;
            counter = 1;
          }
        }
      }
    });
  }

  function endGame() {
    app.ticker.remove(gameLoop);
    document.removeEventListener(document, handleGame);
    app.stage.removeChild(container);
    loadScoreBoard(app, [...new Set(troubledWords)], score)
  }
}

function testForCollision(word, flower) {
  const bounds1 = word.getBounds();
  const bounds2 = flower.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}
