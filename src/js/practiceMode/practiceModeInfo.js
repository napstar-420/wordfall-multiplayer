import loadMainMenu from "../mainMenu.js";
import { tapSound, hoverSound } from "../music and sounds/index.js";
import loadNormalModeUI from "../normalMode/ui.js";

export default function loadPracticeModeInfo(app) {
  const Container = new PIXI.Container();
  Container.width = app.view.width;
  Container.height = app.view.height;

  let wpm = 25;
  let selectedDifficulty = "MEDIUM";

  PIXI.Assets.load([
    "scoreBoardBg",
    "scoreBoard",
    "incrementWpmBtnTexture",
    "decrementWpmBtnTexture",
    "scoreBoardExtras",
    "menuBtnBack",
    "normalCrossBtn",
  ]).then((textures) => {
    const {
      scoreBoardBg,
      scoreBoard,
      incrementWpmBtnTexture,
      decrementWpmBtnTexture,
      scoreBoardExtras,
      menuBtnBack,
      normalCrossBtn
    } = textures;

    // Background
    const background = new PIXI.Sprite(scoreBoardBg);
    background.width = app.view.width;
    background.height = app.view.height;
    Container.addChild(background);

    const Board = new PIXI.Container();
    const boardWidth = (app.view.height * 90) / 100;
    const boardHeight = (app.view.height * 105) / 100;
    Board.width = boardWidth;
    Board.heigh = boardHeight;
    Board.y = -(boardHeight + 100);
    Board.x = app.view.width / 2 - boardWidth / 2;

    // Board Background
    const boardBg = new PIXI.Sprite(scoreBoard);
    boardBg.width = boardWidth;
    boardBg.height = boardHeight;
    Board.addChild(boardBg);

    // Cross Board Button
    const crossBtn = new PIXI.Sprite(normalCrossBtn);
    crossBtn.anchor.set(0.5);
    crossBtn.x = (boardWidth * 84) / 100;
    crossBtn.y = (boardHeight * 29) / 100;
    let crossBtnScale = (boardHeight * 0.9) / 100 / 10;
    crossBtn.scale.x = crossBtnScale;
    crossBtn.scale.y = crossBtnScale;
    crossBtn.interactive = true;
    crossBtn.cursor = "pointer";
    crossBtn
      .on("pointerover", () => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
        hoverSound.play();
        crossBtn.scale.x = crossBtnScale + 0.1;
        crossBtn.scale.y = crossBtnScale + 0.1;
      })
      .on("pointerout", () => {
        crossBtn.scale.x = crossBtnScale;
        crossBtn.scale.y = crossBtnScale;
      })
      .on("pointerdown", () => {
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(Board, 1, {
            ease: Back.easeIn.config(1.7),
            y: -(boardHeight + 100),
        });
        setTimeout(() => {
            app.stage.removeChild(Container);
            loadMainMenu();
        }, 1200);
      });
    Board.addChild(crossBtn);

    // Heading Text
    const headingText = new PIXI.Text("Setting for Practice ", {
      fontSize: (boardHeight * 6) / 100,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    headingText.anchor.set(0.51);
    headingText.y = (boardHeight * 30) / 100;
    headingText.x = boardWidth / 2;
    Board.addChild(headingText);

    // Words per Minute Text
    const wordsPerMinText = new PIXI.Text("WORDS PER MINUTE", {
      fontSize: (boardHeight * 5.5) / 100,
      fill: "#be6618",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    wordsPerMinText.anchor.y = 0.5;
    wordsPerMinText.anchor.x = 0.53;
    wordsPerMinText.y = (boardHeight * 42) / 100;
    wordsPerMinText.x = boardWidth / 2;
    Board.addChild(wordsPerMinText);

    // WPM NUMBER
    const wpmNumber = new PIXI.Text(wpm, {
      fontSize: (boardHeight * 10) / 100,
      fill: "#7D3B01",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    wpmNumber.anchor.y = 0.5;
    wpmNumber.anchor.x = 0.6;
    wpmNumber.y = (boardHeight * 52) / 100;
    wpmNumber.x = boardWidth / 2;
    Board.addChild(wpmNumber);

    function incrementWpm() {
      tapSound.currentTime = 0;
      tapSound.play();
      if (wpm < 150) {
        wpm = wpm + 5;
      }
    }

    function decrementWpm() {
      tapSound.currentTime = 0;
      tapSound.play();
      if (wpm > 5) {
        wpm = wpm - 5;
      }
    }

    // WPM INCREMENT BUTTON
    const incrementWpmBtn = new PIXI.Sprite(incrementWpmBtnTexture);
    incrementWpmBtn.anchor.x = 0.5;
    incrementWpmBtn.anchor.y = 0.5;
    incrementWpmBtn.scale.x = (boardWidth * 0.08) / 100;
    incrementWpmBtn.scale.y = (boardWidth * 0.08) / 100;
    incrementWpmBtn.y = (boardHeight * 52) / 100;
    incrementWpmBtn.x = (boardWidth * 68) / 100;
    incrementWpmBtn.interactive = true;
    incrementWpmBtn.cursor = "pointer";
    incrementWpmBtn
      .on("pointerover", () => {
        incrementWpmBtn.scale.x = (boardWidth * 0.09) / 100;
        incrementWpmBtn.scale.y = (boardWidth * 0.09) / 100;
      })
      .on("pointerout", () => {
        incrementWpmBtn.scale.x = (boardWidth * 0.08) / 100;
        incrementWpmBtn.scale.y = (boardWidth * 0.08) / 100;
      })
      .on("pointerdown", incrementWpm);
    Board.addChild(incrementWpmBtn);

    // WPM DECREMENT BUTTON
    const decrementWpmBtn = new PIXI.Sprite(decrementWpmBtnTexture);
    decrementWpmBtn.anchor.x = 0.5;
    decrementWpmBtn.anchor.y = 0.5;
    decrementWpmBtn.scale.x = (boardWidth * 0.08) / 100;
    decrementWpmBtn.scale.y = (boardWidth * 0.08) / 100;
    decrementWpmBtn.y = (boardHeight * 52) / 100;
    decrementWpmBtn.x = (boardWidth * 30) / 100;
    decrementWpmBtn.interactive = true;
    decrementWpmBtn.cursor = "pointer";
    decrementWpmBtn
      .on("pointerover", () => {
        decrementWpmBtn.scale.x = (boardWidth * 0.09) / 100;
        decrementWpmBtn.scale.y = (boardWidth * 0.09) / 100;
      })
      .on("pointerout", () => {
        decrementWpmBtn.scale.x = (boardWidth * 0.08) / 100;
        decrementWpmBtn.scale.y = (boardWidth * 0.08) / 100;
      })
      .on("pointerdown", decrementWpm);
    Board.addChild(decrementWpmBtn);

    // WORDS DIFFICULTY TEXT
    const wordDifficultyText = new PIXI.Text("WORDS DIFFICULTY", {
      fontSize: (boardHeight * 5.5) / 100,
      fill: "#be6618",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    wordDifficultyText.anchor.x = 0.53;
    wordDifficultyText.anchor.y = 0.5;
    wordDifficultyText.x = boardWidth / 2;
    wordDifficultyText.y = (boardHeight * 67) / 100;
    Board.addChild(wordDifficultyText);

    // SPRITE SHOWING ACTIVE DIFFICULTY
    const activeDifficultySprite = new PIXI.Sprite(scoreBoardExtras);
    activeDifficultySprite.scale.x = (boardWidth * 0.17) / 100;
    activeDifficultySprite.scale.y = (boardWidth * 0.1) / 100;
    activeDifficultySprite.anchor.set(0.5);
    activeDifficultySprite.y = (boardHeight * 77) / 100;
    activeDifficultySprite.x = boardWidth / 2;
    Board.addChild(activeDifficultySprite);

    const selectedDifficultyStyle = new PIXI.TextStyle({
      fontSize: (boardHeight * 5) / 100,
      fill: "#ffffff",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });

    const difficultyStyle = new PIXI.TextStyle({
      fontSize: (boardHeight * 5) / 100,
      fill: "#7D3B01",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });

    // EASY DIFFICULTY BUTTON
    const easyBtn = new PIXI.Text("EASY", difficultyStyle);
    easyBtn.anchor.x = 0.53;
    easyBtn.anchor.y = 0.5;
    easyBtn.x = (boardWidth * 26) / 100;
    easyBtn.y = (boardHeight * 77) / 100;
    easyBtn.interactive = true;
    easyBtn.cursor = "pointer";
    easyBtn.on("pointerdown", () => changeDifficulty("EASY"));
    Board.addChild(easyBtn);

    // MEDIUM DIFFICULTY BUTTON
    const mediumBtn = new PIXI.Text("MEDIUM", selectedDifficultyStyle);
    mediumBtn.anchor.x = 0.5;
    mediumBtn.anchor.y = 0.5;
    mediumBtn.x = boardWidth / 2;
    mediumBtn.y = (boardHeight * 77) / 100;
    mediumBtn.interactive = true;
    mediumBtn.cursor = "pointer";
    mediumBtn.on("pointerdown", () => changeDifficulty("MEDIUM"));
    Board.addChild(mediumBtn);

    // HARD DIFFICULTY BUTTON
    const hardBtn = new PIXI.Text("HARD", difficultyStyle);
    hardBtn.anchor.x = 0.53;
    hardBtn.anchor.y = 0.5;
    hardBtn.x = (boardWidth * 72) / 100;
    hardBtn.y = (boardHeight * 77) / 100;
    hardBtn.interactive = true;
    hardBtn.cursor = "pointer";
    hardBtn.on("pointerdown", () => changeDifficulty("HARD"));
    Board.addChild(hardBtn);

    function changeDifficulty(difficulty) {
      tapSound.currentTime = 0;
      tapSound.play();
      selectedDifficulty = difficulty;
      easyBtn.style = difficultyStyle;
      mediumBtn.style = difficultyStyle;
      hardBtn.style = difficultyStyle;

      switch (difficulty) {
        case "EASY":
          easyBtn.style = selectedDifficultyStyle;
          activeDifficultySprite.x = (boardWidth * 26) / 100;
          activeDifficultySprite.scale.x = (boardWidth * 0.12) / 100;
          break;
        case "MEDIUM":
          mediumBtn.style = selectedDifficultyStyle;
          activeDifficultySprite.x = boardWidth / 2;
          activeDifficultySprite.scale.x = (boardWidth * 0.17) / 100;
          break;
        case "HARD":
          hardBtn.style = selectedDifficultyStyle;
          activeDifficultySprite.scale.x = (boardWidth * 0.12) / 100;
          activeDifficultySprite.x = (boardWidth * 71.5) / 100;
          break;
      }
    }

    const startGameBtn = new PIXI.Sprite(menuBtnBack);
    startGameBtn.anchor.set(0.5);
    startGameBtn.width = (boardWidth * 40) / 100;
    startGameBtn.height = (boardWidth * 10) / 100;
    startGameBtn.x = boardWidth / 2;
    startGameBtn.y = (boardHeight * 90) / 100;
    startGameBtn.interactive = true;
    startGameBtn.cursor = "pointer";
    Board.addChild(startGameBtn);

    const startGameText = new PIXI.Text("PRACTICE", {
      fontSize: (boardHeight * 5) / 100,
      fill: "#ffffff",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    startGameText.anchor.set(0.5);
    startGameText.x = boardWidth / 2;
    startGameText.y = (boardHeight * 90) / 100;
    Board.addChild(startGameText);

    startGameBtn.on("pointerover", () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
      startGameText.scale.x = 1.1;
      startGameText.scale.y = 1.1;
    });
    startGameBtn.on("pointerout", () => {
      startGameText.scale.x = 1;
      startGameText.scale.y = 1;
    });
    startGameBtn.on("pointerdown", () => {
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(Board, 1, {
            ease: Back.easeIn.config(1.7),
            y: -(boardHeight + 100),
        });
        setTimeout(() => {
            app.stage.removeChild(Container);
            loadNormalModeUI(app, 'PRACTICE', {wpm, selectedDifficulty});
        }, 1200);
    });

    function updateUI() {
      wpmNumber.text = wpm;
    }

    app.ticker.add(updateUI);

    Container.addChild(Board);
    setTimeout(() => {
        TweenMax.to(Board, 1, {
          ease: Elastic.easeOut.config(1, 0.99),
          y: -(boardHeight * 12 / 100),
        });
      }, 750);
  });

  app.stage.addChild(Container);
}
