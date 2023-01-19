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
  let streak = 0;
  let troubledWords = [];
  let typedWords = 0;
  let completedWords = 0;
  let mistypedWords = 0;
  let time = 0;
  let tileCounter = 0;

  function updateTime() {
    time++;
  }
  const timeInterval = setInterval(updateTime, 1000);
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
    wordContainer.x = getRandomNumber(app.view.width - sprite.width, 0);
    wordContainer.y = -20;
    container.children[3].addChild(wordContainer);
    return wordContainer;
  }

  // This Function launches new words on screen
  (function launchWord() {
    const word = createWord(container);
    wordsOnScreen.push(word);
    setTimeout(() => {
      wordSpeed += 0.1;
      launchWord();
    }, 500);
  })();

  // This function will be run when user types
  function handleGame(e) {
    const key = e.key;
    // if there is no active key
    if (!activeWord) {
      // loops through words on screen
      wordsOnScreen.forEach((word, index) => {
        if (key === word.children[1].text) {
          word.active = true;
          activeWord = word;
          activeWordIndex = index;
          counter++;
          typedWords++;
          word.children[1].style = typedLetterStyling;
          return;
        }
      });
      // if active word exist
    } else if (activeWord.children[counter].text === key) {
      wordsOnScreen[activeWordIndex].children[counter].style =
        typedLetterStyling;
      counter++;
      // if users types the entire word correctly
      if (activeWord.children.length === counter) {
        score += (activeWord.children.length - 1) * multiplier;
        container.children[4].children[1].text = score;
        container.children[3].removeChild(activeWord);
        wordsOnScreen.splice(activeWordIndex, 1);
        activeWord = null;
        activeWordIndex = null;
        counter = 1;
        completedWords++;
        streak++;
        if (streak % 10 === 0) {
          multiplier = streak / 10 + 1;
        }
        container.children[4].children[3].text = multiplier;
      }
    } else {
      // if user mistypes
      mistypedWords++;
      let troubledWord = "";
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
      streak = 0;
      multiplier -= multiplier > 1 ? 1 : 0;
      container.children[4].children[3].text = multiplier;
    }
  }

  app.ticker.add(gameLoop);

  function gameLoop() {
    updateWords();
    updateTile();
  }
  function updateTile() {
    container.children[6].tilePosition.x += 0.1;
  }

  // This function update words on screen
  function updateWords() {
    wordsOnScreen.forEach((word, index) => {
      if (word) {
        word.y += wordSpeed;
        if (word.y > app.view.height - 300) {
          // this will be collision check
          container.children[1].children.forEach((flower) => {
            const collision = testForCollision(word, flower);
            if (collision) {
              container.children[1].removeChild(flower);
              if (container.children[1].children.length === 0) {
                endGame();
              }
            }
          });
        }
        // If word reached the ground
        if (word.y > app.view.height - 130) {
          streak = 0;
          multiplier -= multiplier > 1 ? 1 : 0;
          container.children[4].children[3].text = multiplier;
          word.dead = true;
          let troubledWord = "";
          word.children.forEach((letter, index) => {
            if (index > 0) {
              troubledWord = troubledWord.concat(letter.text);
            }
          });
          troubledWords.push(troubledWord);
          TweenMax.to(word, 2.5, { ease: Power4.easeOut, alpha: 0 });
          setTimeout(() => {
            container.children[3].removeChild(4);
          }, 1000);
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
    const nanCheck = isNaN(typedWords / mistypedWords);
    const accuracy = Math.round(
      (nanCheck ? 0 : typedWords / mistypedWords) * 100
    );
    const wpm = Math.round((completedWords / time) * 60);
    const endScore = {
      accuracy,
      wpm,
      troubledWords: [...new Set(troubledWords)],
      score,
    };
    clearInterval(timeInterval);
    app.ticker.remove(gameLoop);
    document.removeEventListener(document, handleGame);
    app.stage.removeChild(container);
    loadScoreBoard(app, endScore);
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
