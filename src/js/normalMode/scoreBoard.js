import loadNormalModeUI from "./ui.js";
import loadMainMenu from "../mainMenu.js";
import { getBackground } from "../gameUI.js";
import { hoverSound, normalModeBackMusic, tapSound } from "../music and sounds/index.js";

export default function loadScoreBoard(app, endScore) {
  const { accuracy, wpm, troubledWords, score } = endScore;

  const scoreBoard = new PIXI.Container();
  scoreBoard.width = app.view.width;
  scoreBoard.height = app.view.height;

  const assetsPromise = PIXI.Assets.load([
    "menuBtnBack",
    "scoreBoardBg",
    "scoreBoard",
    "scoreBoardExtras",
    "troubledWordBg",
    "normalCrossBtn",
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    scoreBoard.addChild(getBackground(textures.scoreBoardBg));

    // Adding score board
    const boardContainer = new PIXI.Container();
    const boardWidth = (app.view.height * 90) / 100;
    const boardHeight = (app.view.height * 105) / 100;
    boardContainer.width = boardWidth;
    boardContainer.height = boardHeight;
    boardContainer.x = app.view.width / 2;
    boardContainer.y = -(boardHeight + 50);

    const scoreBoardSprite = new PIXI.Sprite(textures.scoreBoard);
    scoreBoardSprite.width = boardWidth;
    scoreBoardSprite.height = boardHeight;
    scoreBoardSprite.anchor.x = 0.5;
    scoreBoardSprite.anchor.y = 0;
    scoreBoardSprite.x = boardContainer.width / 2;
    scoreBoardSprite.y = 0;
    boardContainer.addChild(scoreBoardSprite);

    // Adding closing scoreboard button
    const crossBtn = new PIXI.Sprite(textures.normalCrossBtn);
    crossBtn.anchor.set(0.5);
    crossBtn.x = (boardWidth * 34) / 100;
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
      .on("pointerdown", () => handleClick(loadMainMenu));
    boardContainer.addChild(crossBtn);

    // Adding Player Rank Text
    const playerRankText = new PIXI.Text("Game Over", {
      fontSize: (boardHeight * 7) / 100,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Boogaloo",
      fontWeight: "500",
    });
    playerRankText.y = (boardHeight * 30) / 100;
    playerRankText.anchor.x = 0.56;
    playerRankText.anchor.y = 0.5;
    boardContainer.addChild(playerRankText);

    // Adding Player Score Text
    const playerScoreText = new PIXI.Text(`SCORE: ${score}`, {
      fontSize: (boardHeight * 8) / 100,
      fill: "#be6618",
      align: "left",
      fontFamily: "Luckiest Guy",
      fontWeight: "500",
    });
    playerScoreText.y = (boardHeight * 41) / 100;
    playerScoreText.anchor.x = 0.56;
    playerScoreText.anchor.y = 0.5;
    boardContainer.addChild(playerScoreText);

    // Adding Extras
    const extras = [
      {
        extraName: "WPM",
        extraValue: wpm,
        extraWidth: 0,
      },
      {
        extraName: "ACCURACY",
        extraValue: `${accuracy} %`,
        extraWidth: (boardWidth * 25) / 100,
      },
    ];
    const extrasContainer = new PIXI.Container();
    extrasContainer.width = boardWidth;
    extrasContainer.x = -((boardWidth * 14) / 100);
    extrasContainer.y = (boardHeight * 54) / 100;

    extras.forEach((extraObj) => {
      const extra = new PIXI.Sprite(textures.scoreBoardExtras);
      extra.width = (boardWidth * 30) / 100;
      extra.height = (boardWidth * 25) / 100;
      extra.x = extraObj.extraWidth;
      extra.anchor.x = 0.5;
      extra.anchor.y = 0.5;
      const extraValueText = new PIXI.Text(extraObj.extraValue, {
        fontFamily: "Boogaloo",
        fontSize: 50,
        fontWeight: "500",
        fill: "0xffffff",
      });
      extraValueText.anchor.set(0.5);
      extraValueText.y -= 15;
      extra.addChild(extraValueText);
      const extraNameText = new PIXI.Text(extraObj.extraName, {
        fontFamily: "Boogaloo",
        fontSize: 20,
        fontWeight: "500",
        fill: "#f2b44e",
      });
      extraNameText.anchor.set(0.5);
      extraNameText.y += 20;
      extra.addChild(extraNameText);
      extrasContainer.addChild(extra);
    });
    boardContainer.addChild(extrasContainer);

    //Adding Troubled Word to scoreboard
    const troubledWordContainer = new PIXI.Container();
    troubledWordContainer.width = (boardWidth * 90) / 100;
    troubledWordContainer.y = (boardHeight * 73) / 100;
    const troubledWordBgSprite = new PIXI.Sprite(textures.troubledWordBg);
    troubledWordBgSprite.anchor.x = 0.535;
    troubledWordBgSprite.anchor.y = 0.48;
    troubledWordBgSprite.height = (boardHeight * 20) / 100;
    troubledWordBgSprite.width = (boardWidth * 65) / 100;
    const troubledWordText = new PIXI.Text("TROUBLED WORDS", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 4) / 100,
      fontWeight: "800",
      fill: "#be6618",
    });
    troubledWordText.anchor.set(0.5);
    troubledWordText.y = -((boardHeight * 6) / 100);

    troubledWordContainer.addChild(troubledWordBgSprite);
    troubledWordContainer.addChild(troubledWordText);

    let height = -((boardHeight * 3) / 100);
    let width = -((boardWidth * 31) / 100);
    let counter = 1;
    troubledWords.forEach((word, index) => {
      if (index < 16) {
        let wordText = new PIXI.Text(`${word}`, {
          fontFamily: "Barlow",
          fontSize: (boardHeight * 2.5) / 100,
          fontWeight: "600",
          fill: "#d19748",
        });

        wordText.y = height;
        wordText.x = width;
        troubledWordContainer.addChild(wordText);
        if (counter % 4 === 0) {
          height = -((boardHeight * 3) / 100);
          width += (boardWidth * 16) / 100;
        } else {
          height += (boardHeight * 3) / 100;
        }
        counter++;
      }
    });
    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = (boardHeight * 90) / 100;

    playAgainBtn.interactive = true;
    playAgainBtn.cursor = "pointer";
    playAgainBtn
      .on("pointerover", () => cursorOver(playAgainBtnText))
      .on("pointerout", () => cursorOut(playAgainBtnText))
      .on("pointerdown", () => handleClick(loadNormalModeUI));

    const playAgainBtnBgSprite = new PIXI.Sprite(textures.menuBtnBack);
    playAgainBtnBgSprite.width = (boardWidth * 45) / 100;
    playAgainBtnBgSprite.height = (boardHeight * 10) / 100;
    playAgainBtnBgSprite.anchor.set(0.5);

    const playAgainBtnText = new PIXI.Text("PLAY AGAIN", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 5) / 100,
      fontWeight: "500",
      fill: "0xffffff",
    });
    playAgainBtnText.anchor.y = 0.6;
    playAgainBtnText.anchor.x = 0.5;

    playAgainBtn.addChild(playAgainBtnBgSprite);
    playAgainBtn.addChild(playAgainBtnText);

    boardContainer.addChild(playAgainBtn);
    boardContainer.addChild(troubledWordContainer);
    scoreBoard.addChild(boardContainer);

    // CURSOR INTERACTIONS
    function cursorOver(button) {
      hoverSound.pause();
    hoverSound.currentTime = 0;
    hoverSound.play();
      button.scale.x = 1.1;
      button.scale.y = 1.1;
    }
    function cursorOut(button) {
      button.scale.x = 1;
      button.scale.y = 1;
    }
    function handleClick(callback) {
      tapSound.pause();
      tapSound.currentTime = 0;
      tapSound.play();
      TweenMax.to(boardContainer, 1, {
        ease: Back.easeIn.config(1.7),
        y: -(boardHeight + 100),
      });
      setTimeout(() => {
        normalModeBackMusic.pause();
        app.stage.removeChild(scoreBoard);
        callback(app);
      }, 1000);
    }
    setTimeout(() => {
      TweenMax.to(boardContainer, 1, {
        ease: Elastic.easeOut.config(1, 0.99),
        y: -60,
      });
    }, 750);
    app.stage.addChild(scoreBoard);
  });
}
