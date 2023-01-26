import loadBossModeUI from "./ui.js";
import { getBackground } from "../gameUI.js";
import loadMainMenu from "../mainMenu.js";
import { bossModeBackMusic, failureSound, hoverSound, successSound, tapSound } from "../music and sounds/index.js";

export default function loadBossScoreBoard(app, endScore, type) {
  const { accuracy, wpm, score, level } = endScore;

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
    const boardHeight = (app.view.height * 105) / 100;
    boardContainer.width = boardWidth;
    boardContainer.height = boardHeight;
    boardContainer.x = app.view.width / 2;
    boardContainer.y = -boardHeight;

    const bossBoardSprite = new PIXI.Sprite(textures.bossScoreBoard);
    bossBoardSprite.width = boardWidth;
    bossBoardSprite.height = boardHeight;
    bossBoardSprite.anchor.x = 0.5;
    bossBoardSprite.anchor.y = 0;
    bossBoardSprite.x = boardContainer.width / 2;
    bossBoardSprite.y = -40;
    boardContainer.addChild(bossBoardSprite);

    if (type === "COMPLETED") {
      // Adding Player Rank Text
      const levelStatus = new PIXI.Text(`Level ${level} Completed`, {
        fontSize: (boardHeight * 5) / 100,
        fill: '#27ff00',
        align: "left",
        fontFamily: "Boogaloo",
        fontWeight: "500",
      });
      levelStatus.y = boardHeight > 900 ? (boardHeight * 25) / 100 : (boardHeight * 23.5) / 100;
      levelStatus.anchor.x = 0.56;
      levelStatus.anchor.y = 0.5;
      boardContainer.addChild(levelStatus);
    } else {
      const levelStatus = new PIXI.Text("Level Failed", {
        fontSize: (boardHeight * 7) / 100,
        fill: '#ffffff',
        align: "left",
        fontFamily: "Boogaloo",
        fontWeight: "500",
      });
      levelStatus.y = boardHeight > 900 ? (boardHeight * 25) / 100 : (boardHeight * 23.5) / 100;
      levelStatus.anchor.x = 0.56;
      levelStatus.anchor.y = 0.5;
      boardContainer.addChild(levelStatus);
    }


    // Adding Player Score Text
    const playerScoreText = new PIXI.Text(`SCORE: ${score}`, {
      fontSize: (boardHeight * 8) / 100,
      fill: "#633f5c",
      align: "left",
      fontFamily: "Luckiest Guy",
      fontWeight: "500",
    });
    playerScoreText.y = (boardHeight * 34) / 100;
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
    extrasContainer.y = (boardHeight * 48) / 100;

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

    //adding the main menu btn
    const mainMenu = new PIXI.Container();
    mainMenu.y = (boardHeight * 64) / 100;

    const mainMenuBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    mainMenuBg.width = (boardWidth * 30) / 100;
    mainMenuBg.height = (boardHeight * 8) / 100;
    mainMenuBg.anchor.set(0.5);

    const mainMenuText = new PIXI.Text("MAIN MENU", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 4) / 100,
      fontWeight: "500",
      fill: "0xffffff",
    });

    mainMenuText.anchor.y = 0.5;
    mainMenuText.anchor.x = 0.5;

    mainMenu.addChild(mainMenuBg);
    mainMenu.addChild(mainMenuText);
    mainMenu.interactive = true;
    mainMenu.cursor = "pointer";
    mainMenu
      .on("pointerover", () => cursorOver(mainMenuText))
      .on("pointerout", () => cursorOut(mainMenuText))
      .on("pointerdown", () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(boardContainer, 1, {
          ease: Bounce.easeIn,
          y: -(boardHeight + 100),
        });
        setTimeout(() => {
          bossModeBackMusic.pause();
          app.stage.removeChild(boardContainer);
          loadMainMenu();
        }, 1500);
      });

    boardContainer.addChild(mainMenu);

    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = (boardHeight * 73) / 100;

    const playAgainBtnBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    playAgainBtnBg.width = (boardWidth * 42) / 100;
    playAgainBtnBg.height = (boardHeight * 9) / 100;
    playAgainBtnBg.anchor.set(0.5);

    const playAgainBtnText = new PIXI.Text(type === 'COMPLETED' ? level === 3 ? "PLAY AGAIN" : "NEXT PHASE" : "TRY AGAIN", {
      fontFamily: "Boogaloo",
      fontSize: (boardHeight * 5) / 100,
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
      .on("pointerdown", () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(boardContainer, 1, { ease: Expo.easeIn, y: -(boardHeight + 100)})
        setTimeout(() => {
          bossModeBackMusic.pause();
          app.stage.removeChild(BossScoreBoard);
          switch (type) {
            case 'COMPLETED':
              loadBossModeUI(app, level === 3 ? 1 : level + 1)
              break;
              case 'FAILED':
              loadBossModeUI(app, level)
              break;
          }
        }, 1500);
      });

    boardContainer.addChild(playAgainBtn);
    BossScoreBoard.addChild(boardContainer);

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

    setTimeout(() => {
      if (type === 'COMPLETED') {
        successSound.play();
      } else if (type === 'FAILED') {
        failureSound.play();
      }
      TweenMax.to(boardContainer, 1, { ease: Bounce.easeOut, y: 0 });
    }, 750);

    app.stage.addChild(BossScoreBoard);
  });
}
