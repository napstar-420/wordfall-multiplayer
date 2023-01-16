function createBossScoreBoard(app) {
  const assetsPromise = PIXI.Assets.load([
    "scoreBoardExtras",
    "bossScoreBoard",
    "bossScoreBtnBg",
    "bossScoreBg",
    "bossScoreExtrasBg",
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    const bossBoardBgSprite = new PIXI.Sprite(textures.bossScoreBg);
    bossBoardBgSprite.width = app.view.width;
    bossBoardBgSprite.height = app.view.height;
    bossBoardBgSprite.anchor.set(0.5);
    bossBoardBgSprite.x = app.view.width / 2;
    bossBoardBgSprite.y = app.view.height / 2;
    app.stage.addChild(bossBoardBgSprite);

    // Adding score board
    const boardContainer = new PIXI.Container();
    boardContainer.x = app.view.width / 2;

    const bossBoardSprite = new PIXI.Sprite(textures.bossScoreBoard);
    bossBoardSprite.width = 700;
    bossBoardSprite.height = 700;
    bossBoardSprite.anchor.x = 0.5;
    bossBoardSprite.anchor.y = 0;
    bossBoardSprite.x = boardContainer.width / 2;
    bossBoardSprite.y = 0;
    boardContainer.addChild(bossBoardSprite);

    // Adding Player Rank Text
    const playerRankText = new PIXI.Text("Rank:1025", {
      fontSize: 45,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerRankText.y = 120;
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
    playerScoreText.y = 220;
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
    extrasContainer = new PIXI.Container();
    extrasContainer.y = 325;

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
    restartBtn.y = 435;

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

    boardContainer.addChild(restartBtn);

    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = 525;

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

    boardContainer.addChild(playAgainBtn);
    app.stage.addChild(boardContainer);
  });
}
