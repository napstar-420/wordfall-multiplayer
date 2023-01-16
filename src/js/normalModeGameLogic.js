import { getRandomNumber, getWordBg } from "./gameUI.js";
import { app } from "./app.js";

const wordsList = [
  "max",
  "longest",
  "mine",
  "taper",
  "sizing",
  "everest",
  "bo",
  "t",
];

const wordsOnScreen = [];
let activeWord = null;
let activeWordIndex = null;
let counter = 0;

export function startGame(app) {
  launchWord();
  app.ticker.add(gameLoop);
}

function launchWord() {
  const word = createWord();
  wordsOnScreen.push(word);
  setTimeout(() => {
    launchWord();
  }, 2500);
}
function createWord() {
  const wordContainer = new PIXI.Container();
  const word = wordsList[getRandomNumber(wordsList.length - 1, 0)];
  const tileTexture = PIXI.Texture.from('/src/assets/images/letters tile 1.png');
  const tileSprite = new PIXI.Sprite(tileTexture);
  tileSprite.height = 40;
  wordContainer.addChild(tileSprite);

  let letterWidth = 0;
  [...word].forEach((l, i) => {
    let letter = new PIXI.Text(l);
    letter.x = letterWidth;
    wordContainer.addChild(letter);
    letterWidth += letter.width + 1;
  });

  wordContainer.x = getRandomNumber(app.view.width - 100, 100);
  wordContainer.y = -20;
  wordContainer.children[0].width = wordContainer.width
  wordContainer.speed = (1 * 10) / wordContainer.children.length;
  app.stage.addChild(wordContainer);
  return wordContainer;
}

function gameLoop() {
  updateWords();
}

function updateWords() {
  wordsOnScreen.forEach((word, index) => {
    if (word) {
      word.y += word.speed;
      if (word.y > app.view.height) {
        word.dead = true;
        app.stage.removeChild(word);
        wordsOnScreen.splice(index, 1);
        if (word.active === true) {
            activeWord = null;
            activeWordIndex = null;
            counter = 0;
        }
      }
    }
  });
}

const typedLetterStyle = new PIXI.TextStyle({
    fill: 'red'
})

const letterStyle = new PIXI.TextStyle({
    fill: 'black'
})

document.addEventListener("keyup", function (e) {
    const key  = e.key;
    if (!activeWord) {
        wordsOnScreen.forEach((word, index) => {
            if (key === word.children[0].text) {
                word.active = true;
                activeWord = word;
                activeWordIndex = index
                counter++;
                wordsOnScreen[index].children[0].style = typedLetterStyle;
                return;
            }
        })
    } else if (activeWord.children[counter].text === key) { // if active word exist
        wordsOnScreen[activeWordIndex].children[counter].style = new PIXI.TextStyle({
            fill: "red",
          });
        counter++;
        if (activeWord.children.length === counter) {
            app.stage.removeChild(activeWord);
            wordsOnScreen.splice(activeWordIndex, 1);
            activeWord = null;
            activeWordIndex = null;
            counter = 0;
        }
    } else {
        wordsOnScreen[activeWordIndex].children.forEach((letter) => {
            letter.style = letterStyle;
        })
        activeWord = null;
        activeWordIndex = null;
        counter = 0;
    }
});
