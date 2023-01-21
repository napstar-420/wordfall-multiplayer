import { getRandomNumber } from "./gameUI.js";
import { app } from "./app.js";

const wordsList = [
  "dispensable",
  "romantic",
  "squirrel",
  "bolt",
  "fixed",
  "winter",
  "many",
  "poke",
  "rhetorical",
  "linen",
  "tempt",
  "sassy",
  "hushed",
  "pathetic",
  "harm",
  "misty",
  "ready",
  "belong",
  "children",
  "quartz",
  "annoyed",
  "puzzled",
  "ritzy",
  "grotesque",
  "acidic",
  "evanescent",
  "name",
  "ruin",
  "questionable",
  "dear",
  "retire",
  "crabby",
  "shallow",
  "attach",
  "doll",
  "raise",
  "fog",
  "rural",
  "ambitious",
  "nine",
  "crook",
  "lavish",
  "prefer",
  "bare",
  "bashful",
  "stupendous",
  "neighborly",
  "elegant",
  "title",
  "assorted",
  "sound",
  "frequent",
  "part",
  "compete",
  "unequaled",
  "grass",
  "strengthen",
  "blink",
  "tiresome",
  "club",
  "divergent",
  "kill",
  "sugar",
  "scribble",
  "rabbit",
  "average",
  "faulty",
  "leather",
  "polish",
  "offbeat",
  "stormy",
  "song",
  "racial",
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

export function startGame(container, loadScoreBoard, level) {

  const normalClouds = container.children[1];
  const livesContainer = container.children[2];
  const wordsContainer = container.children[4];
  const scoreFrame = container.children[5];
  const menuBtn = container.children[6];
  const multiplierText = container.children[7];
  const clockFrame = container.children[8];
  switch (level) {
    case 1:
      multiplierText.x = app.view.width / 2 + scoreFrame.width / 2.7;
      multiplierText.y = (app.view.height * 1.5) / 100;
      break;
    case 2:
      multiplierText.x = app.view.width / 2 + scoreFrame.width / 2.7;
      multiplierText.y = (app.view.height * 1.5) / 100;
      break;
    case 3:
      multiplierText.x = app.view.width / 2 + scoreFrame.width / 2.7;
      multiplierText.y = (app.view.height * 1.5) / 100;
      break;
    default:
      clockFrame.visible = false;
  }
  clockFrame.children[1].text = 60;
  const pauseMenu = container.children[9];

  const brickBreakSound = new Audio(
    "/src/assets/music and sound effects/brickSound.wav"
  );
  
  // Variables to use in the game
  let gamePaused = false;
  let wordFromApi = "";
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
  let time = 0;
  switch (level) {
    case 1:
      time = 60;
      break;
    case 2:
      time = 60;
      break;
    case 3:
      time = 60;
      break;
  }
  let launchSpeed = 2000;

  switch (level) {
    case 1:
      launchSpeed = 2000;
      break;
    case 2:
      launchSpeed = 1500;
      break;
    case 3:
      launchSpeed = 1500;
      break;
  }

  // This Interval updates time and launch speed
  const timeInterval = setInterval(updateTime, 1000);
  function updateTime() {
    clockFrame.children[1].text = time;
    switch (level) {
      case 1:
        time--;
        launchSpeed -= 8.33333;
        break;
      case 2:
        time--;
        break;
      case 3:
        time--;
        break;
      default:
        time++;
        launchSpeed -= 8.33333;
        break;
    }
    if (time === 0) {
      activeWord = null;
      activeWordIndex = null;
      counter = 1;
      activeWord = null;
      activeWordIndex = null;
      counter = 1;
      endGame("COMPLETED");
    }
  }

  // This Code adds resume functionality to pause menu
  pauseMenu.children[pauseMenu.children.length - 1].on("pointerdown", () => {
    setInterval(updateTime, 1000);
    TweenMax.to(pauseMenu, 1, {
      ease: Expo.easeIn,
      y: -(pauseMenu.height + 100),
    });
    setTimeout(() => {
      gamePaused = false;
    }, 500);
  });

  // This Code adds pausing game functionality
  menuBtn.interactive = true;
  menuBtn.cursor = "pointer";
  menuBtn
    .on("pointerover", () => {
      menuBtn.scale.x = (app.view.height * 0.16) / 100;
      menuBtn.scale.y = (app.view.height * 0.16) / 100;
    })
    .on("pointerout", () => {
      menuBtn.scale.x = (app.view.height * 0.15) / 100;
      menuBtn.scale.y = (app.view.height * 0.15) / 100;
    })
    .on("pointerdown", () => {
      clearInterval(timeInterval);
      gamePaused = true;
      TweenMax.to(pauseMenu, 1, { ease: Expo.easeOut, y: 0 });
    });

  // Adding Event Listener for typing
  document.addEventListener("keyup", handleGame);

  // This function getWords from API
  function getWordFromApi() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c33169b7b7mshd4cdd31d9ac58dep1dfd47jsnf4695d416579",
        "X-RapidAPI-Host": "random-word-by-api-ninjas.p.rapidapi.com",
      },
    };

    const word = fetch(
      "https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb",
      options
    )
      .then((response) => response.json())
      .then((response) => (wordFromApi = response.word))
      .catch((err) => console.error(err));
  }

  // This function create new word
  function createWord() {
    const wordContainer = new PIXI.Container();
    // const word = wordFromApi; // uncomment this line when want to use Api
    const word = wordsList[getRandomNumber(wordsList.length - 1, 0)];
    if (word.length > 7) {
      return createWord();
    }
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
    wordsContainer.addChild(wordContainer);
    return wordContainer;
  }

  // This Function launches new words on screen
  (function launchWord() {
    if (!gamePaused) {
      // getWordFromApi(); // uncomment this line when want to use Api
      const word = createWord();
      if (word.children.length > 1) {
        wordsOnScreen.push(word);
        wordSpeed += 0.015;
      }
    }
    setTimeout(() => {
      launchWord();
    }, launchSpeed);
  })();

  // This function will be run when user types
  function handleGame(e) {
    if (!gamePaused) {
      const key = e.key;
      // if there is no active key
      if (!activeWord) {
        // loops through words on screen
        for (let i = 0; i < wordsOnScreen.length; i++) {
          if (wordsOnScreen[i].children[1].text === key) {
            wordsOnScreen[i].active = true;
            activeWord = wordsOnScreen[i];
            activeWordIndex = i;
            counter++;
            typedWords++;
            wordsOnScreen[i].children[1].style = typedLetterStyling;
            return;
          }
        }
        return;
        // if active word exist
      } else if (activeWord.children[counter].text === key) {
        wordsOnScreen[activeWordIndex].children[counter].style =
          typedLetterStyling;
        counter++;
        // if users types the entire word correctly
        if (activeWord.children.length === counter) {
          brickBreakSound.play();
          score += (activeWord.children.length - 1) * multiplier;
          scoreFrame.children[1].text = score;
          wordsContainer.removeChild(activeWord);
          wordsOnScreen.splice(activeWordIndex, 1);
          activeWord = null;
          activeWordIndex = null;
          counter = 1;
          completedWords++;
          streak++;
          if (streak % 5 === 0) {
            multiplier = streak / 5 + 1;
          }
          multiplierText.text = `x${multiplier}`;
        }
      } else {
        // if user mistypes
        switch (level) {
          case 1:
            endGame("FAILED");
            break;
          case 3:
            endGame("FAILED");
            break;
          default: // reset streak
          // decrement multiplier
            streak = 0;
            multiplier -= multiplier > 1 ? 1 : 0;
            // update multiplier on ui
            container.children[7].text = `x${multiplier}`;
            // adding word to troubled array
            let troubledWord = "";
            // changing style from type to regular
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
            break;
        }
      }
    }
  }

  app.ticker.add(gameLoop);

  function gameLoop() {
    if (!gamePaused) {
      updateWords();
    }
    updateTile();
  }
  function updateTile() {
    normalClouds.tilePosition.x += 0.1;
  }

  // This function update words on screen
  function updateWords() {
    wordsOnScreen.forEach((word, index) => {
      if (word) {
        word.y += wordSpeed;
        if (word.y > app.view.height - 300) {
          // this will be collision check
          livesContainer.children.forEach((pumpkin) => {
            const collision = testForCollision(word, pumpkin);
            if (collision) {
              switch (level) {
                case 1:
                  endGame("FAILED");
                  break;
                case 3:
                  endGame("FAILED");
                  break;
                default:
                  livesContainer.children.forEach((life) => {
                    const collision = testForCollision(word, life);
                    if (collision) {
                      livesContainer.removeChild(life);
                      if (livesContainer.children.length === 0) {
                        endGame("FAILED");
                      }
                    }
                  });
                  break;
              }
            }
          });
        }
        // If word reached the ground
        if (word.y > app.view.height - 130) {
          switch (level) {
            case 1:
              endGame("FAILED");
              break;
            case 3:
              endGame("FAILED");
              break;
            default:
              // if the active word is touching the ground
              if (word.active === true) {
                // changing style from type to regular
                word.children.forEach((letter, index) => {
                  if (index > 0) {
                    letter.style = letterStyling;
                  }
                });
                activeWord = null;
                activeWordIndex = null;
                counter = 1;
              }
              // reset streak
              streak = 0;
              // decrement multiplier
              multiplier -= multiplier > 1 ? 1 : 0;
              // update multiplier on ui
              container.children[7].text = `x${multiplier}`;
              let troubledWord = "";
              // Reset Styling
              word.children.forEach((letter, index) => {
                if (index > 0) {
                  troubledWord = troubledWord.concat(letter.text);
                }
              });
              // adding word to troubled array
              troubledWords.push(troubledWord);
              // updating words on screen
              wordsOnScreen.splice(index, 1);
              // updating active word index
              if (activeWord && activeWordIndex > index) {
                activeWordIndex = activeWordIndex - 1;
              }
              // animation
              TweenMax.to(word, 2.5, { ease: Power4.easeOut, alpha: 0 });
              // removing word from screen
              setTimeout(() => {
                container.children[4].removeChild(word);
              }, 1000);
              break;
          }
        }
      }
    });
  }

  function endGame(type) {
    const setOfTroubledWords = [...new Set(troubledWords)];
    const accuracy = Math.round(
      (typedWords === 0
        ? 0
        : typedWords / (setOfTroubledWords.length + typedWords)) * 100
    );
    const wpm = Math.round((completedWords / time !== 0 ? time : 60) * 60);
    const endScore = {
      accuracy,
      wpm,
      score,
      level,
      troubledWords: setOfTroubledWords,
    };
    clearInterval(timeInterval);
    app.ticker.remove(gameLoop);
    document.removeEventListener('keyup', handleGame);
    app.stage.removeChild(container);
    loadScoreBoard(app, endScore, type);
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
