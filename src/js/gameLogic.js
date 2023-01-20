import { getPauseMenu, getRandomNumber } from "./gameUI.js";
import { app } from "./app.js";

const wordsList = [
  "dispensable",
  "romantic",
  "squirrel",
  "bolt",
  "fixed",
  "winter",
  "many",
  'poke',
  'rhetorical',
  'linen',
  'tempt',
  'sassy',
  'hushed',
  'pathetic',
  'harm',
  'misty',
  'ready',
  'belong',
  'children',
  'quartz',
  'annoyed',
  'puzzled',
  'ritzy',
  'grotesque',
'acidic',
'evanescent',
'name',
'ruin',
'questionable',
'dear',
'retire',
'crabby',
'shallow',
'attach',
'doll',
'raise',
'fog',
'rural',
'ambitious',
'nine',
'crook',
'lavish',
'prefer',
'bare',
'bashful',
'stupendous',
'neighborly',
'elegant',
'title',
'assorted',
'sound',
'frequent',
'part',
'compete',
'unequaled',
'grass',
'strengthen',
'blink',
'tiresome',
'club',
'divergent',
'kill',
'sugar',
'scribble',
'rabbit',
'average',
'faulty',
'leather',
'polish',
'offbeat',
'stormy',
'song',
'racial',
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
  let gamePaused = false;
  const menuBtn = container.children[6];
  const pauseMenu = container.children[8];

  pauseMenu.children[pauseMenu.children.length - 1]
    .on('pointerdown', () => {
      TweenMax.to(pauseMenu, 1, {ease: Expo.easeIn, y: -(pauseMenu.height + 100)});
      setTimeout(() => {
        gamePaused = false;
      }, 500)
    })

  menuBtn.interactive = true;
  menuBtn.cursor = 'pointer';
  menuBtn
    .on('pointerover', () => {
      menuBtn.scale.x = (app.view.height * 0.16) / 100;
      menuBtn.scale.y = (app.view.height * 0.16) / 100;
    })
    .on('pointerout', () => {
      menuBtn.scale.x = (app.view.height * 0.15) / 100;
      menuBtn.scale.y = (app.view.height * 0.15) / 100;
    })
    .on('pointerdown', () => {
      gamePaused = true;
      TweenMax.to(pauseMenu, 1, {ease: Expo.easeOut, y: 0});
    });

  let wordFromApi = ''
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
  let tileCounter = 0;
  var brickBreakSound = new Audio("/src/assets/music and sound effects/brickSound.wav");
  
function getWordFromApi() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c33169b7b7mshd4cdd31d9ac58dep1dfd47jsnf4695d416579',
      'X-RapidAPI-Host': 'random-word-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  const word = fetch('https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb', options)
    .then(response => response.json())
    .then(response => wordFromApi = response.word)
    .catch(err => console.error(err));

  return word;
}

  function updateTime() {
    time++;
  }
  const timeInterval = setInterval(updateTime, 1000);
  document.addEventListener("keyup", handleGame);

  // This function create new word
  function createWord() {
    const wordContainer = new PIXI.Container();
    // const word = wordFromApi; // uncomment this line when want to use Api 
    const word = wordsList[getRandomNumber(wordsList.length - 1, 0)]
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
    container.children[4].addChild(wordContainer);
    return wordContainer;
  }

  // This Function launches new words on screen
  (function launchWord() {
    if (!gamePaused) {
      // getWordFromApi(); // uncomment this line when want to use Api
      const word = createWord();
      if (word.children.length > 1) {
        wordsOnScreen.push(word);
      }
      wordSpeed += 0.03;
    }
    setTimeout(() => {
      launchWord();
    }, (5000 / wordSpeed) < 1000 ? 1000 : 5000 / wordSpeed);
  })();

  // This function will be run when user types
  function handleGame(e) {
    if (!gamePaused) {
      const key = e.key;
      // if there is no active key
      if (!activeWord) {
        // loops through words on screen
        for(let i = 0; i < wordsOnScreen.length; i++) {
          if (wordsOnScreen[i].children[1].text === key) {
            wordsOnScreen[i].active = true;
            activeWord = wordsOnScreen[i];
            activeWordIndex = i;
            counter++;
            typedWords++;
            wordsOnScreen[i].children[1].style = typedLetterStyling;
            return;
          }
          return;
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
          container.children[5].children[1].text = score;
          container.children[4].removeChild(activeWord);
          wordsOnScreen.splice(activeWordIndex, 1);
          activeWord = null;
          activeWordIndex = null;
          counter = 1;
          completedWords++;
          streak++;
          console.log(streak)
          if (streak % 10 === 0) {
            multiplier = streak / 10 + 1;
            console.log(multiplier)
          }
          container.children[7].text = `x${multiplier}`;
        }
      } else {
        // if user mistypes
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
        container.children[7].text = `x${multiplier}`;
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
    container.children[1].tilePosition.x += 0.1;
  }

  // This function update words on screen
  function updateWords() {
    wordsOnScreen.forEach((word, index) => {
      if (word) {
        word.y += wordSpeed;
        if (word.y > app.view.height - 300) {
          // this will be collision check
          container.children[2].children.forEach((flower) => {
            const collision = testForCollision(word, flower);
            if (collision) {
              container.children[2].removeChild(flower);
              if (container.children[2].children.length === 0) {
                endGame();
              }
            }
          });
        }
        // If word reached the ground
        if (word.y > app.view.height - 130) {
          streak = 0;
          multiplier -= multiplier > 1 ? 1 : 0;
          container.children[7].text = `x${multiplier}`;
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
            container.children[4].removeChild(word);
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
    const setOfTroubledWords = [...new Set(troubledWords)];
    const accuracy = Math.round((typedWords === 0 ? 0 : typedWords / setOfTroubledWords.length) * 100);
    const wpm = Math.round((completedWords / time) * 60);
    const endScore = {
      accuracy,
      wpm,
      troubledWords: setOfTroubledWords,
      score
    }
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
