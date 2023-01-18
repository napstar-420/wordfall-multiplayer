import loadNormalModeUI from "./normalModeUI.js";
import loadMainMenu from "./mainMenu.js";

export default function loadScoreBoard(app, troubledWords, score) {

  const scoreBoard = new PIXI.Container(); 
  scoreBoard.width = app.view.width;
  scoreBoard.height = app.view.height;

  // VARIABLES
   let slideDown = true;
   let slideUp = false;

  const assetsPromise = PIXI.Assets.load([
    "menuBtnBack",
    "scoreBoardBg",
    "scoreBoard",
    "scoreBoardExtras",
    "troubledWordBg",
    "normalCrossBtn"
  ]);
  assetsPromise.then((textures) => {
    // Adding score board background
    const scoreBoardBgSprite = new PIXI.Sprite(textures.scoreBoardBg);
    scoreBoardBgSprite.width = app.view.width;
    scoreBoardBgSprite.height = app.view.height;
    scoreBoardBgSprite.anchor.set(0.5);
    scoreBoardBgSprite.x = app.view.width / 2;
    scoreBoardBgSprite.y = app.view.height / 2;
    scoreBoard.addChild(scoreBoardBgSprite);

    // Adding score board
    const boardContainer = new PIXI.Container();
    boardContainer.width = 650;
    boardContainer.height = 650;
    boardContainer.x = app.view.width / 2;
    boardContainer.y = -600
    const scoreBoardSprite = new PIXI.Sprite(textures.scoreBoard);
    scoreBoardSprite.width = 650;
    scoreBoardSprite.height = 650;
    scoreBoardSprite.anchor.x = 0.5;
    scoreBoardSprite.anchor.y = 0;
    scoreBoardSprite.x = boardContainer.width / 2;
    scoreBoardSprite.y = 0;
    boardContainer.addChild(scoreBoardSprite);

    // Adding closing scoreboard button
    const crossBtn = new PIXI.Sprite(textures.normalCrossBtn);
    crossBtn.anchor.set(0.5);
    crossBtn.x = 220;
    crossBtn.y = 120;
    crossBtn.scale.x = 0.7;
    crossBtn.scale.y = 0.7;
    crossBtn.interactive = true;
    crossBtn.cursor = 'pointer';
    crossBtn
      .on('pointerover', () => {crossBtn.scale.x = 0.8; crossBtn.scale.y = 0.8;})
      .on('pointerout', () => {crossBtn.scale.x = 0.7; crossBtn.scale.y = 0.7;})
      .on('pointerdown', () => handleClick(loadMainMenu))
    boardContainer.addChild(crossBtn);

    // Adding Player Rank Text
    const playerRankText = new PIXI.Text("Rank: 1025", {
      fontSize: 40,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerRankText.y = 140;
    playerRankText.anchor.x = 0.56;
    playerRankText.anchor.y = 0.5;
    boardContainer.addChild(playerRankText);

    // Adding Player Score Text
    const playerScoreText = new PIXI.Text(`SCORE: ${score}`, {
      fontSize: 55,
      fill: "#be6618",
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playerScoreText.y = 225;
    playerScoreText.anchor.x = 0.56;
    playerScoreText.anchor.y = 0.5;
    boardContainer.addChild(playerScoreText);

    // Adding Extras
    const extras = [
      {
        extraName: "WPM",
        extraValue: "40",
        extraWidth: -80,
      },
      {
        extraName: "ACCURACY",
        extraValue: "55%",
        extraWidth: 60,
      },
    ];
    const extrasContainer = new PIXI.Container();
    extrasContainer.y = 310;

    extras.forEach((extraObj) => {
      const extra = new PIXI.Sprite(textures.scoreBoardExtras);
      extra.width = 160;
      extra.height = 130;
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
    troubledWordContainer.y = 430;
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
    troubledWords.forEach((word, index) => {
      if (index < 16) {
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
          height = -20;
          width += 75;
        } else {
          height += 20;
        }
        counter++;
      };
    });
    // adding play again btn
    const playAgainBtn = new PIXI.Container();
    playAgainBtn.y = 570;

    playAgainBtn.interactive = true;
    playAgainBtn.cursor = 'pointer';
    playAgainBtn
      .on('pointerover', () => cursorOver(playAgainBtnText))
      .on('pointerout', () => cursorOut(playAgainBtnText))
      .on('pointerdown', () => handleClick(loadNormalModeUI))

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
    scoreBoard.addChild(boardContainer);

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
        app.stage.removeChild(scoreBoard);
      }, 3000)
    }

     // TICKER
    app.ticker.add(animation);
    
    function animation(delta) {
      if(slideDown && boardContainer.y < -60){
        boardContainer.y += delta * 5;
      }
      if(slideUp && boardContainer.y > -700){
        boardContainer.y -= delta * 5;
        setTimeout(() => {
          app.ticker.remove(animation);
        }, 3000);
      }
    }

    app.stage.addChild(scoreBoard);
  });
}
