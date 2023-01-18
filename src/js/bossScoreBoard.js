import loadBossModeUI from "./bossModeUI.js";
import { getBackground } from "./gameUI.js";
import loadMainMenu from "./mainMenu.js";

export default function loadBossScoreBoard(app) {

  let slideDown = true;
  let slideUp = false;

  const BossScoreBoard = new PIXI.Container();
  BossScoreBoard.width = app.view.width;
  BossScoreBoard.height = app.view.height;
  const assetsPromise = PIXI.Assets.load([
    "scoreBoardExtras",
    "bossScoreBoard",
    "bossScoreBtnBg",
    "bossScoreBg",
    "bossScoreExtrasBg",
    "bossScoreBoardCross"
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    BossScoreBoard.addChild(getBackground(textures.bossScoreBg));

    // Adding score board
    const boardContainer = new PIXI.Container();
    boardContainer.x = app.view.width / 2;
    boardContainer.width = 550;
    boardContainer.height = 600;

    const bossBoardSprite = new PIXI.Sprite(textures.bossScoreBoard);
    bossBoardSprite.width = 550;
    bossBoardSprite.height = 600;
    bossBoardSprite.anchor.x = 0.5;
    bossBoardSprite.anchor.y = 0;
    bossBoardSprite.x = boardContainer.width / 2;
    bossBoardSprite.y = 0;
    boardContainer.addChild(bossBoardSprite);

    // Adding score board cross btn
    const crossBtn = new PIXI.Sprite(textures.bossScoreBoardCross);
    crossBtn.anchor.set(0.5);
    crossBtn.scale.x = 0.5;
    crossBtn.scale.y = 0.5;
    crossBtn.x = 200;
    crossBtn.y = 80;
    crossBtn.interactive = true;
    crossBtn.cursor = 'pointer';
    crossBtn
      .on('pointerover', () => {crossBtn.scale.x = 0.6; crossBtn.scale.y = 0.6})
      .on('pointerout', () => {crossBtn.scale.x = 0.5; crossBtn.scale.y = 0.5})
      .on('pointerdown', () => handleClick(loadMainMenu))
    boardContainer.addChild(crossBtn);

    // Adding Player Rank Text
    const playerRankText = new PIXI.Text("Rank:1025", {
      fontSize: 45,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerRankText.y = 105;
    playerRankText.anchor.x = 0.56;
    playerRankText.anchor.y = 0.5;
    boardContainer.addChild(playerRankText);

    // Adding Player Score Text
    const playerScoreText = new PIXI.Text("SCORE: 1200", {
      fontSize: 55,
      fill: "#633f5c",
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerScoreText.y = 190;
    playerScoreText.anchor.x = 0.56;
    playerScoreText.anchor.y = 0.5;
    boardContainer.addChild(playerScoreText);

    // Adding Extras
    const extras = [
      {
        extraName: "WPM",
        extraValue: "40",
        extraWidth: -100,
      },
      {
        extraName: "ACCURACY",
        extraValue: "55%",
        extraWidth: 80,
      },
    ];
    const extrasContainer = new PIXI.Container();
    extrasContainer.y = 290;

    extras.forEach((extraObj) => {
      const extra = new PIXI.Sprite(textures.bossScoreExtrasBg);
      extra.width = 180;
      extra.height = 150;
      extra.x = extraObj.extraWidth;
      extra.anchor.x = 0.5;
      extra.anchor.y = 0.5;
      const extraValueText = new PIXI.Text(extraObj.extraValue, {
        fontFamily: "Chewy",
        fontSize: 50,
        fontWeight: "500",
        fill: "0xffffff",
      });
      extraValueText.anchor.set(0.5);
      extraValueText.y -= 15;
      extra.addChild(extraValueText);
      const extraNameText = new PIXI.Text(extraObj.extraName, {
        fontFamily: "Chewy",
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
    restartBtn.y = 385;

    const restartBtnBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    restartBtnBg.width = 200;
    restartBtnBg.height = 65;
    restartBtnBg.anchor.set(0.5);

    const restartBtnText = new PIXI.Text("RESTART", {
      fontFamily: "Chewy",
      fontSize: 25,
      fontWeight: "500",
      fill: "0xffffff",
    });

    restartBtnText.anchor.y = 0.5;
    restartBtnText.anchor.x = 0.5;

    restartBtn.addChild(restartBtnBg);
    restartBtn.addChild(restartBtnText);
    restartBtn.interactive = true;
    restartBtn.cursor = 'pointer';
    restartBtn
      .on('pointerover', () => cursorOver(restartBtnText))
      .on('pointerout', () => cursorOut(restartBtnText))
      .on('pointerdown', () => handleClick(loadBossModeUI))

    boardContainer.addChild(restartBtn);

    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = 460;

    const playAgainBtnBg = new PIXI.Sprite(textures.bossScoreBtnBg);
    playAgainBtnBg.width = 250;
    playAgainBtnBg.height = 70;
    playAgainBtnBg.anchor.set(0.5);

    const playAgainBtnText = new PIXI.Text("PLAY AGAIN", {
      fontFamily: "Chewy",
      fontSize: 30,
      fontWeight: "500",
      fill: "0xffffff",
    });
    playAgainBtnText.anchor.y = 0.5;
    playAgainBtnText.anchor.x = 0.5;

    playAgainBtn.addChild(playAgainBtnBg);
    playAgainBtn.addChild(playAgainBtnText);
    playAgainBtn.interactive = true;
    playAgainBtn.cursor = 'pointer';
    playAgainBtn
      .on('pointerover', () => cursorOver(playAgainBtnText))
      .on('pointerout', () => cursorOut(playAgainBtnText))
      .on('pointerdown', () => handleClick(loadBossModeUI))

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
      slideDown = false;
      slideUp = true;
      
      setTimeout(() => {
        app.ticker.remove()
        slideDown = true;
        slideUp = false;
        callback(app);
        app.stage.removeChild();
      }, 3000)
    }
      // TICKER
    app.ticker.add(animation);
      
    function animation(delta) {
      if(slideDown && boardContainer.y < 0){
        boardContainer.y += delta * 4;
      }
      if(slideUp && boardContainer.y > -600){
        boardContainer.y -= delta * 4;
        setTimeout(() => {
          app.ticker.remove(animation);
        }, 3000);
      }
    }

    app.stage.addChild(BossScoreBoard);
  });
}
