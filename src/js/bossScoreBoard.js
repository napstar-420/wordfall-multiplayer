import loadBossModeUI from "./bossModeUI.js";
import { getBackground } from "./gameUI.js";
import loadMainMenu from "./mainMenu.js";

export default function loadBossScoreBoard(app, endScore) {
  const { accuracy, wpm, troubledWords, score } = endScore;

  const BossScoreBoard = new PIXI.Container();
  BossScoreBoard.width = app.view.width;
  BossScoreBoard.height = app.view.height;

  const assetsPromise = PIXI.Assets.load([
    "scoreBoardExtras",
    "bossScoreBoard",
    "bossScoreBtnBg",
    "bossScoreBg",
    "bossScoreExtrasBg",
    "bossScoreBoardCross",
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    BossScoreBoard.addChild(getBackground(textures.bossScoreBg));

    // Adding score board
    const boardContainer = new PIXI.Container();
    const boardWidth = (app.view.height * 90) / 100;
    const boardHeight = (app.view.height * 100) / 100;
    boardContainer.width = boardWidth;
    boardContainer.height = boardHeight;
    boardContainer.x = app.view.width / 2;
    boardContainer.y = -(boardHeight + 50);

    const bossBoardSprite = new PIXI.Sprite(textures.bossScoreBoard);
    bossBoardSprite.width = boardWidth;
    bossBoardSprite.height = boardHeight;
    bossBoardSprite.anchor.x = 0.5;
    bossBoardSprite.anchor.y = 0;
    bossBoardSprite.x = boardContainer.width / 2;
    bossBoardSprite.y = -90;
    boardContainer.addChild(bossBoardSprite);

    // Adding score board cross btn
    const crossBtn = new PIXI.Sprite(textures.bossScoreBoardCross);
    crossBtn.anchor.set(0.5);
    crossBtn.x = (boardWidth * 34) / 100;
    crossBtn.y = (boardHeight * 15) / 100;
    const crossBtnScale = (boardHeight * 0.8) / 100 / 10;
    crossBtn.scale.x = crossBtnScale;
    crossBtn.scale.y = crossBtnScale;
    crossBtn.interactive = true;
    crossBtn.cursor = "pointer";
    crossBtn
      .on("pointerover", () => {
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
    playerRankText.y = (boardHeight * 17) / 100;
    playerRankText.anchor.x = 0.56;
    playerRankText.anchor.y = 0.5;
    boardContainer.addChild(playerRankText);

    // Adding Player Score Text
    const playerScoreText = new PIXI.Text("SCORE: 1200", {
      fontSize: (boardHeight * 8) / 100,
      fill: "#633f5c",
      align: "left",
      fontFamily: "Luckiest Guy",
      fontWeight: "500",
    });
    playerScoreText.y = (boardHeight * 30) / 100;
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
    extrasContainer.y = (boardHeight * 44) / 100;

    extras.forEach((extraObj) => {
      const extra = new PIXI.Sprite(textures.bossScoreExtrasBg);
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
        fill: "#ecd7b8",
      });
      extraNameText.anchor.set(0.5);
      extraNameText.y += 20;
      extra.addChild(extraNameText);
      extrasContainer.addChild(extra);
    });
    boardContainer.addChild(extrasContainer);

    //adding the restart btn
    const restartBtn = new PIXI.Container();
    restartBtn.y = (boardHeight * 59) / 100;

    const restartBtnBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    restartBtnBg.width = (boardWidth * 30) / 100;
    restartBtnBg.height = (boardHeight * 8) / 100;
    restartBtnBg.anchor.set(0.5);

    const restartBtnText = new PIXI.Text("RESTART", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 4) / 100,
      fontWeight: "500",
      fill: "0xffffff",
    });

    restartBtnText.anchor.y = 0.5;
    restartBtnText.anchor.x = 0.5;

    restartBtn.addChild(restartBtnBg);
    restartBtn.addChild(restartBtnText);
    restartBtn.interactive = true;
    restartBtn.cursor = "pointer";
    restartBtn
      .on("pointerover", () => cursorOver(restartBtnText))
      .on("pointerout", () => cursorOut(restartBtnText))
      .on("pointerdown", () => handleClick(loadBossModeUI));

    boardContainer.addChild(restartBtn);

    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = (boardHeight * 68) / 100;

    const playAgainBtnBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    playAgainBtnBg.width = (boardWidth * 40) / 100;
    playAgainBtnBg.height = (boardHeight * 8) / 100;
    playAgainBtnBg.anchor.set(0.5);

    const playAgainBtnText = new PIXI.Text("PLAY AGAIN", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 4) / 100,
      fontWeight: "500",
      fill: "0xffffff",
    });
    playAgainBtnText.anchor.y = 0.5;
    playAgainBtnText.anchor.x = 0.5;

    playAgainBtn.addChild(playAgainBtnBg);
    playAgainBtn.addChild(playAgainBtnText);
    playAgainBtn.interactive = true;
    playAgainBtn.cursor = "pointer";
    playAgainBtn
      .on("pointerover", () => cursorOver(playAgainBtnText))
      .on("pointerout", () => cursorOut(playAgainBtnText))
      .on("pointerdown", () => handleClick(loadBossModeUI));

    boardContainer.addChild(playAgainBtn);
    BossScoreBoard.addChild(boardContainer);

    // CURSOR INTERACTIONS
    function cursorOver(button) {
      button.scale.x = 1.1;
      button.scale.y = 1.1;
    }
    function cursorOut(button) {
      button.scale.x = 1;
      button.scale.y = 1;
    }
    function handleClick(callback) {
      TweenMax.to(boardContainer, 1, {
        ease: Bounce.easeIn,
        y: -(boardHeight + 100),
      });
      setTimeout(() => {
        app.stage.removeChild(boardContainer);
        callback(app);
      }, 1500);
    }

    setTimeout(() => {
      TweenMax.to(boardContainer, 1, { ease: Bounce.easeOut, y: 0 });
    }, 750);

    app.stage.addChild(BossScoreBoard);
  });
}
