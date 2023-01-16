function createScoreBoard(app) {
  const assetsPromise = PIXI.Assets.load([
    "menuBtnBack",
    "scoreBoardBg",
    "scoreBoard",
    "scoreBoardExtras",
    "troubledWordBg",
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    const scoreBoardBgSprite = new PIXI.Sprite(textures.scoreBoardBg);
    scoreBoardBgSprite.width = app.view.width;
    scoreBoardBgSprite.height = app.view.height;
    scoreBoardBgSprite.anchor.set(0.5);
    scoreBoardBgSprite.x = app.view.width / 2;
    scoreBoardBgSprite.y = app.view.height / 2;
    app.stage.addChild(scoreBoardBgSprite);

    // Adding score board
    const boardContainer = new PIXI.Container();
    boardContainer.width = 550;
    boardContainer.height = 550;
    boardContainer.x = app.view.width / 2;
    const scoreBoardSprite = new PIXI.Sprite(textures.scoreBoard);
    scoreBoardSprite.width = 700;
    scoreBoardSprite.height = 700;
    scoreBoardSprite.anchor.x = 0.5;
    scoreBoardSprite.anchor.y = 0;
    scoreBoardSprite.x = boardContainer.width / 2;
    scoreBoardSprite.y = 0;
    boardContainer.addChild(scoreBoardSprite);

    // Adding Player Rank Text
    const playerRankText = new PIXI.Text("Rank:1025", {
      fontSize: 45,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerRankText.y = 155;
    playerRankText.anchor.x = 0.56;
    playerRankText.anchor.y = 0.5;
    boardContainer.addChild(playerRankText);

    // Adding Player Score Text
    const playerScoreText = new PIXI.Text("SCORE: 1200", {
      fontSize: 55,
      fill: "#be6618",
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerScoreText.y = 250;
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
    extrasContainer.y = 340;

    extras.forEach((extraObj) => {
      const extra = new PIXI.Sprite(textures.scoreBoardExtras);
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
    troubledWordContainer.y = 470;
    const troubledWordBgSprite = new PIXI.Sprite(textures.troubledWordBg);
    troubledWordBgSprite.anchor.set(0.53);

    const troubledWordText = new PIXI.Text("TROUBLED WORDS", {
      fontFamily: "Chewy",
      fontSize: 30,
      fontWeight: "500",
      fill: "#be6618",
    });
    troubledWordText.anchor.set(0.5);
    troubledWordText.y = -40;

    let troubledWordArr = [
      "desire",
      "delay",
      "perpetual",
      "pizzas",
      "mess",
      "abrupt",
      "acoustic",
      "sore",
      "realize",
      "instinctive",
      "wry",
      "dogs",
      "kindly",
      "board",
      "beg",
    ];

    // adding practice btn
    const practiceBtn = new PIXI.Container();
    practiceBtn.y = 70;

    const practiceBtnBgSprite = new PIXI.Sprite(textures.menuBtnBack);
    practiceBtnBgSprite.width = 200;
    practiceBtnBgSprite.height = 50;
    practiceBtnBgSprite.anchor.set(0.5);

    const practiceBtnText = new PIXI.Text("PRACTICE", {
      fontFamily: "Chewy",
      fontSize: 25,
      fontWeight: "500",
      fill: "0xffffff",
    });
    practiceBtnText.anchor.y = 0.6;
    practiceBtnText.anchor.x = 0.5;

    practiceBtn.addChild(practiceBtnBgSprite);
    practiceBtn.addChild(practiceBtnText);

    troubledWordContainer.addChild(troubledWordBgSprite);
    troubledWordContainer.addChild(troubledWordText);
    troubledWordContainer.addChild(practiceBtn);

    let height = -20;
    let width = -180;
    let counter = 1;
    troubledWordArr.forEach((word) => {
      let wordText = new PIXI.Text(`${word}`, {
        fontFamily: "Chewy",
        fontSize: 15,
        fontWeight: "500",
        fill: "#d19748",
      });

      wordText.y = height;
      wordText.x = width;
      troubledWordContainer.addChild(wordText);
      if (counter % 3 === 0) {
        console.log("match");
        height = -20;
        width += 75;
      } else {
        height += 20;
      }
      counter++;
    });
    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = 620;

    const playAgainBtnBgSprite = new PIXI.Sprite(textures.menuBtnBack);
    playAgainBtnBgSprite.width = 250;
    playAgainBtnBgSprite.height = 70;
    playAgainBtnBgSprite.anchor.set(0.5);

    const playAgainBtnText = new PIXI.Text("PLAY AGAIN", {
      fontFamily: "Chewy",
      fontSize: 30,
      fontWeight: "500",
      fill: "0xffffff",
    });
    playAgainBtnText.anchor.y = 0.6;
    playAgainBtnText.anchor.x = 0.5;

    playAgainBtn.addChild(playAgainBtnBgSprite);
    playAgainBtn.addChild(playAgainBtnText);

    boardContainer.addChild(playAgainBtn);
    boardContainer.addChild(troubledWordContainer);
    app.stage.addChild(boardContainer);
  });
}
