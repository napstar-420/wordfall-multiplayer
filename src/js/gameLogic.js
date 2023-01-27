import { getBrickAnimation, getRandomNumber } from "./gameUI.js";
import { app } from "./app.js";
import { tapSound, brickBreakSound, normalModeBackMusic, bossModeBackMusic, gameOverSound } from "./music and sounds/index.js";
import {words as wordsList} from './words.js';
import loadBossModeUI from "./boss mode/ui.js";
import loadPracticeModeInfo from "./practiceMode/practiceModeInfo.js";
import loadNormalModeUI from "./normalMode/ui.js";

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

const brickTexture = PIXI.Texture.from("/src/assets/images/gameUI/letters tile 1.png");

export function startGame(container, loadScoreBoard, level, data) {  
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

  const restartBtn = pauseMenu.children[2];

  switch (level) {
    case 1:
      restartBtn.on('pointerdown', () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(container);
        loadBossModeUI(app, level);
      })
      break;
    case 2:
      restartBtn.on('pointerdown', () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(container);
        loadBossModeUI(app, level);
      })
      break;
    case 3:
      restartBtn.on('pointerdown', () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(container);
        loadBossModeUI(app, level);
      })
      break;
    case 'PRACTICE':
      restartBtn.on('pointerdown', () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(container);
        loadPracticeModeInfo(app);
      })
      break;
    default:
      restartBtn.on('pointerdown', () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        bossModeBackMusic.pause();
        normalModeBackMusic.pause();
        app.stage.removeChild(container);
        loadNormalModeUI(app, 'NORMAL')
      })
      break;
  }

  let rulesBoard = null;
  let startGameBtn
  
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
    default:
      time = 0;
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
    case "PRACTICE":
      launchSpeed = (60 / data.wpm) * 1000
      break;
  }

  // This Interval updates time and launch speed
  let timeInterval = setInterval(updateTime, 1000);
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
      case 'PRACTICE':
        time++;
        break;
      default:
        time++;
        launchSpeed -= 8.33333;
        break;
    }
    if (time === 0) {
      switch (level) {
        case 1:
          endGame("COMPLETED");
          break;
        case 2:
          if (getWpm(completedWords, time) > 45) {
            endGame("COMPLETED");
          } else {
            endGame("FAILED");
          }
          break;
        case 3:
          if (getWpm(completedWords, time) > 45) {
            endGame("COMPLETED");
          } else {
            endGame("FAILED");
          }
          break;
      }
    }
  }

  // This Code adds resume functionality to pause menu
  pauseMenu.children[4].on("pointerdown", () => {
    timeInterval = setInterval(updateTime, 1000);
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
  if (level !== 1 && level !== 2 && level !== 3) {
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
  }

  if (level && level !== 'PRACTICE' && level !== 'NORMAL') {
    gamePaused = true;
    clearInterval(timeInterval);
    rulesBoard = container.children[10];
    startGameBtn = rulesBoard.children[3];
    startGameBtn.on('pointerdown', () => {
      tapSound.pause();
      tapSound.currentTime = 0;
      tapSound.play();
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
      TweenMax.to(rulesBoard, 1, { ease: Expo.easeIn, y: -(app.view.height * 90 / 100) });
      setTimeout(() => {
        gamePaused = false;
        timeInterval = setInterval(updateTime, 1000);
      }, 1000)
    })
    
    TweenMax.to(rulesBoard, 1, { ease: Expo.easeOut, y: 0 });
  }

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
    if (level && level === 'PRACTICE') {
      if (data.selectedDifficulty === 'EASY') {
        if (word.length > 3) {
          return createWord();
        }
      } else if (data.selectedDifficulty === 'MEDIUM') {
        if (word.length > 5 || word.length < 3) {
          return createWord();
        }
      } else if (data.selectedDifficulty === 'HARD') {
        if (word.length > 7 || word.length < 5) {
          return createWord();
        }
      }
    } else if (word.length > 7) {
      return createWord();
    }
    
    const sprite = new PIXI.Sprite(brickTexture);
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
    wordContainer.scale.x = app.view.width * 0.1 / 100;
    wordContainer.scale.y = app.view.width * 0.1 / 100;
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
          } else if (i === wordsOnScreen.length - 1) {
            // reset streak
            streak = 0;
            // decrement multiplier
            multiplier -= multiplier > 1 ? 1 : 0;
            // update multiplier on ui
            container.children[7].text = `x${multiplier}`;
          switch (level) {
            case 1:
              endGame("FAILED");
              break;
            case 3:
              endGame("FAILED");
              break;
            default: 
              break;
          }
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
          console.log({w: activeWord.width, h: activeWord.height})
          brickBreakSound.play();
          score += (activeWord.children.length - 1) * multiplier;
          scoreFrame.children[1].text = score;
          wordsContainer.removeChild(activeWord);
          wordsOnScreen.splice(activeWordIndex, 1);
          const width = activeWord.width;
          const height = activeWord.height;
          const x = activeWord.x;
          const y = activeWord.y;
          (async () => {
            const brickAnim = await getBrickAnimation();
            brickAnim.width =  width + (app.view.width * 2.5 / 100);
            brickAnim.height = height + (app.view.height * 22 / 100);
            brickAnim.play();
            brickAnim.x = x - (app.view.width * 1.3 / 100);
            brickAnim.y = y - (app.view.height * 11 / 100);
            container.addChild(brickAnim);
            setTimeout(() => {
              container.removeChild(brickAnim);
            }, 800)
          })()
          activeWord = null;
          activeWordIndex = null;
          counter = 1;
          completedWords++;
          streak++;
          if (streak % 5 === 0) {
            if (multiplier < 3) {
              multiplier = streak / 5 + 1;
              multiplierText.text = `x${multiplier}`;
            }
          }
        }
      } else {
        // if user mistypes
          // reset streak
          streak = 0;
          // decrement multiplier
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
        switch (level) {
          case 1:
            endGame("FAILED");
            break;
          case 3:
            endGame("FAILED");
            break;
          default: 
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
      // Descend words on screen
      if (word) {
        word.y += wordSpeed;
      } else {
        return;
      }
      // collision check
      if (word.y > app.view.height - 300) {
        livesContainer.children.forEach((life) => {
          const collision = testForCollision(word, life);
          if (collision) {
            switch (level) {
              case 1:
                endGame("FAILED");
                break;
              case 3:
                endGame("FAILED");
                break;
              default:
                // if (word.active === true) {
                //   // changing style from type to regular
                //   word.children.forEach((letter, letterIndex) => {
                //     if (letterIndex > 0) {
                //       letter.style = letterStyling;
                //     }
                //   });
                //   activeWord = null;
                //   activeWordIndex = null;
                //   counter = 1;
                // }
                // // reset streak
                // streak = 0;
                // // decrement multiplier
                // multiplier -= multiplier > 1 ? 1 : 0;
                // // update multiplier on ui
                // container.children[7].text = `x${multiplier}`;
                // let troubledWord = "";
                // // adding word to troubled array
                // troubledWords.push(troubledWord);
                livesContainer.removeChild(life);
                if (livesContainer.children.length === 0) {
                  endGame("FAILED");
                }
            }
          }
        });
      }
      // If word reached the ground
      if (word.y > app.view.height - 130) {
        resetStats(word, index);
        switch (level) {
          case 1:
            endGame("FAILED");
            break;
          case 3:
            endGame("FAILED");
            break;
          default:
            // animation
            TweenMax.to(word, 2.5, { ease: Power4.easeOut, alpha: 0 });
            // removing word from screen
            setTimeout(() => {
              container.children[4].removeChild(word);
            }, 1000);
            break;
        }
      }
    });
  }

  function resetStats(word, index) {
    // if active word is touching the ground
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
    } else if (activeWord && activeWordIndex > index) {
        activeWordIndex = activeWordIndex - 1;
    }
    // reset streak
    streak = 0;
    // decrement multiplier
    multiplier -= multiplier > 1 ? 1 : 0;
    // update multiplier on ui
    container.children[7].text = `x${multiplier}`;
    let troubledWord = "";
    // Reset Styling
    word.children.forEach((letter, letterIndex) => {
      if (letterIndex > 0) {
        troubledWord = troubledWord.concat(letter.text);
      }
    });
    // adding word to troubled array
    troubledWords.push(troubledWord);
    // updating words on screen
    wordsOnScreen.splice(index, 1);
  }

  function endGame(type) {
    gamePaused = true;
    normalModeBackMusic.pause();
    normalModeBackMusic.currentTime = 0;
    bossModeBackMusic.pause();
    bossModeBackMusic.currentTime = 0;
    gameOverSound.play();
    const setOfTroubledWords = [...new Set(troubledWords)];
    const endScore = {
      accuracy: getAccuracy(completedWords, setOfTroubledWords.length),
      wpm: getWpm(completedWords, time),
      score,
      level,
      troubledWords: setOfTroubledWords,
    };
    clearInterval(timeInterval);
    app.ticker.remove(gameLoop);
    document.removeEventListener('keyup', handleGame);
    setTimeout(() => {
      app.stage.removeChild(container);
      loadScoreBoard(app, endScore, type);
    }, 3000)
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

function getWpm(words, time) {
  if (time) {
    return words;
  } else {
    return (words / time) * 60;
  }
}

function getAccuracy(words, troubledWords) {
  if (words === 0) {
    return 0;
  } else if (troubledWords === 0) {
    return 100;
  } else {
    return Math.floor(words / (troubledWords + words) * 100);
  }
}
