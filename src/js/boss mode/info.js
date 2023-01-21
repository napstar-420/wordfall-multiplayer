import loadBossModeUI from "./ui.js";

export default function loadBossModeInfo(app) {
  // Container
  const bossModeInfoContainer = new PIXI.Container();
  bossModeInfoContainer.width = app.view.width;
  bossModeInfoContainer.height = app.view.height;

  // Board Container
  const board = new PIXI.Container();
  const boardWidth = (app.view.height * 110) / 100;
  const boardHeight = (app.view.height * 140) / 100;
  board.width = boardWidth;
  board.height = boardHeight;
  board.pivot.x = 0.5;
  board.x = app.view.width / 2 - boardWidth / 2;
  board.y = -(boardHeight + 200);

  PIXI.Assets.load(["bossScoreBg", "bossScoreBoard", "bossScoreBtnBg"]).then((textures) => {
    const { bossScoreBg, bossScoreBoard, bossScoreBtnBg } = textures;

    // Background
    const background = new PIXI.Sprite(bossScoreBg);
    background.width = app.view.width;
    background.height = app.view.height;
    bossModeInfoContainer.addChild(background);

    // Board Sprite
    const boardSprite = new PIXI.Sprite(bossScoreBoard);
    boardSprite.width = boardWidth;
    boardSprite.height = boardHeight;
    board.addChild(boardSprite);

    // Phases Text
    const phasesText = new PIXI.Text("PHASES", {
      fontSize: (boardHeight * 8) / 100,
      fill: "#ff8316",
      fontWeight: "600",
      fontFamily: "Boogaloo",
    });
    phasesText.anchor.set(0.5)
    phasesText.x = boardWidth / 2 - boardWidth * 1 / 100;
    phasesText.y = boardHeight * 28 / 100;

    board.addChild(phasesText);

    const phases = [
      {
        name: 'ACCURACY',
        nameColor: '#77c627',
        info: 'Type with precision and attention as every letter count to \npass this stage. One mistake and you\'re out.',
        nameY: boardHeight * 38 / 100,
        paraY: boardHeight * 42 / 100,
      },
      {
        name: 'ENDURANCE',
        nameColor: '#fe8c27',
        info: 'Keep your fingers moving and your mind focused.\nSurvive by typing as many words as possible.\nSpeed matters.',
        nameY: boardHeight * 51 / 100,
        paraY: boardHeight * 55 / 100,
      },
      {
        name: 'SKILL CRUSHER',
        nameColor: '#cf0c12',
        info: 'Race against the clock to type every word with accuracy.\nYou won\'t be able to feel your fingers after this.',
        nameY: boardHeight * 66 / 100,
        paraY: boardHeight * 70 / 100,
      },
    ]

    phases.map((phase, index) => {
      const {name, nameColor, info, nameY, paraY} = phase;

      // LEVEL TEXT
      const levelText = new PIXI.Text(`LEVEL ${index + 1} -`, {
        fontSize: (boardWidth * 4) / 100,
        fill: "#441559",
        fontWeight: "600",
        fontFamily: "Boogaloo",
      })
      levelText.x = boardWidth * 19 / 100;
      levelText.y = nameY;
      board.addChild(levelText)

      // LEVEL NAME TEXT
      const nameText = new PIXI.Text(name, {
        fontSize: (boardWidth * 4) / 100,
        fill: nameColor,
        fontWeight: "600",
        fontFamily: "Boogaloo",
      })
      nameText.x = boardWidth * 35 / 100;
      nameText.y = nameY;
      board.addChild(nameText)

      // LEVEL INFO TEXT
      const infoText = new PIXI.Text(info, {
        fontSize: (boardWidth * 3) / 100,
        fill: '#694e51',
        fontWeight: 100,
        fontFamily: "Boogaloo",
        // wordWrap: true,
        // wordWrapWidth: boardWidth * 60 / 100,
        lineJoin: 'round',
        textAlign: 'center'
      })
      infoText.x = boardWidth * 19 / 100;
      infoText.y = paraY;
      board.addChild(infoText)
    });

    // Launch btn Text
    const launchBtnText = new PIXI.Text('LAUNCH IN', {
      fontSize: (boardWidth * 4) / 100,
      fill: 0xffffff,
      fontWeight: 500,
      fontFamily: 'Boogaloo',
    })
    launchBtnText.anchor.set(0.5);
    launchBtnText.x = boardWidth / 2;
    launchBtnText.y = boardHeight * 81 / 100;

    // LAUNCH IN BUTTON
    const launchBtn = new PIXI.Sprite(bossScoreBtnBg);
    launchBtn.width = boardWidth * 30 / 100;
    launchBtn.height = boardHeight * 7 / 100;
    launchBtn.anchor.set(0.5);
    launchBtn.x = boardWidth / 2;
    launchBtn.y = boardHeight * 81 / 100;
    launchBtn.interactive = true;
    launchBtn.cursor = 'pointer';
    launchBtn
      .on('pointerover', () => {
        launchBtnText.scale.x = 1.1;
        launchBtnText.scale.y = 1.1;
      })
      .on('pointerout', () => {
        launchBtnText.scale.x = 1.0;
        launchBtnText.scale.y = 1.0;
      })
      .on('pointerdown', () => {
        TweenMax.to(board, 1, {ease: Back.easeIn.config(1.7), y: -(boardHeight + 200)})
        setTimeout(() => {
          app.stage.removeChild(bossModeInfoContainer);
          loadBossModeUI(app, 2);
        }, 1200)
      })
    board.addChild(launchBtn);
    board.addChild(launchBtnText);
    bossModeInfoContainer.addChild(board);
  });

  setTimeout(() => {
    TweenMax.to(board, 1, {ease: Back.easeOut.config(1.7), y: -((boardHeight * 21) / 100)})
  }, 500)

  app.stage.addChild(bossModeInfoContainer);
}
