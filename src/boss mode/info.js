import { Sprite, Container, Text, Assets } from "pixi.js";
import { TweenMax } from "gsap/gsap-core.js";
import loadMainMenu from "../mainMenu.js";
import { hoverSound, tapSound } from "../music and sounds/index.js";
import loadBossModeUI from "./ui.js";
import divBossBg from '../assets/images/game-back.jpg'
import { Back } from "gsap";

export default function loadBossModeInfo(app) {
  document.getElementById("game-container").style.backgroundImage =
    `url('${divBossBg}')`;

  // Container
  const bossModeInfoContainer = new Container();
  bossModeInfoContainer.width = app.view.width;
  bossModeInfoContainer.height = app.view.height;

  // Board Container
  const board = new Container();
  const boardWidth = (app.view.height * 110) / 100;
  const boardHeight = (app.view.height * 140) / 100;
  board.width = boardWidth;
  board.height = boardHeight;
  board.pivot.x = 0.5;
  board.x = app.view.width / 2 - boardWidth / 2;
  board.y = -(boardHeight + 200);

  Assets.load([
    "bossScoreBg",
    "bossScoreBoard",
    "bossScoreBtnBg",
    "bossScoreBoardCross",
  ]).then((textures) => {
    const { bossScoreBg, bossScoreBoard, bossScoreBtnBg, bossScoreBoardCross } = textures;

    // Background
    const background = new Sprite(bossScoreBg);
    background.width = app.view.width;
    background.height = app.view.height;
    bossModeInfoContainer.addChild(background);

    // Board Sprite
    const boardSprite = new Sprite(bossScoreBoard);
    boardSprite.width = boardWidth;
    boardSprite.height = boardHeight;
    board.addChild(boardSprite);

    // Cross Button
    const crossBtn = new Sprite(bossScoreBoardCross);
    crossBtn.anchor.set(0.5);
    crossBtn.x = (boardWidth * 85) / 100;
    crossBtn.y = (boardHeight * 26) / 100;
    let crossBtnScale = (boardHeight * 0.65) / 100 / 10;
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
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(board, 1, {
          ease: Back.easeIn.config(1.7),
          y: -(boardHeight + 200),
        });
        setTimeout(() => {
          app.stage.removeChild(bossModeInfoContainer);
          loadMainMenu();
        }, 1200);
      });
    board.addChild(crossBtn);

    // Phases Text
    const levelsText = new Text("LEVELS", {
      fontSize: (boardHeight * 8) / 100,
      fill: "#ff8316",
      fontWeight: "600",
      fontFamily: "Boogaloo",
    });
    levelsText.anchor.x = 0.56;
    levelsText.anchor.y = 0.5;
    levelsText.x = boardWidth / 2;
    levelsText.y = (boardHeight * 28) / 100;

    board.addChild(levelsText);

    const phases = [
      {
        name: "ACCURACY",
        nameColor: "#77c627",
        info: "Type with precision and attention as every letter count to \npass this stage. One mistake and you're out.",
        nameY: (boardHeight * 38) / 100,
        paraY: (boardHeight * 42) / 100,
      },
      {
        name: "ENDURANCE",
        nameColor: "#fe8c27",
        info: "Keep your fingers moving and your mind focused.\nSurvive by typing as many words as possible.\nSpeed matters.",
        nameY: (boardHeight * 51) / 100,
        paraY: (boardHeight * 55) / 100,
      },
      {
        name: "SKULL CRUSHER",
        nameColor: "#cf0c12",
        info: "Race against the clock to type every word with accuracy.\nYou won't be able to feel your fingers after this.",
        nameY: (boardHeight * 66) / 100,
        paraY: (boardHeight * 70) / 100,
      },
    ];

    phases.map((phase, index) => {
      const { name, nameColor, info, nameY, paraY } = phase;

      // LEVEL TEXT
      const levelText = new Text(`LEVEL ${index + 1} -`, {
        fontSize: (boardWidth * 4) / 100,
        fill: "#441559",
        fontWeight: "600",
        fontFamily: "Boogaloo",
      });
      levelText.x = (boardWidth * 19) / 100;
      levelText.y = nameY;
      board.addChild(levelText);

      // LEVEL NAME TEXT
      const nameText = new Text(name, {
        fontSize: (boardWidth * 4) / 100,
        fill: nameColor,
        fontWeight: "600",
        fontFamily: "Boogaloo",
      });
      nameText.x = (boardWidth * 35) / 100;
      nameText.y = nameY;
      board.addChild(nameText);

      // LEVEL INFO TEXT
      const infoText = new Text(info, {
        fontSize: (boardWidth * 3) / 100,
        fill: "#694e51",
        fontWeight: 100,
        fontFamily: "Boogaloo",
        // wordWrap: true,
        // wordWrapWidth: boardWidth * 60 / 100,
        lineJoin: "round",
        textAlign: "center",
      });
      infoText.x = (boardWidth * 19) / 100;
      infoText.y = paraY;
      board.addChild(infoText);
    });

    // Launch btn Text
    const launchBtnText = new Text("LAUNCH IN", {
      fontSize: (boardWidth * 4) / 100,
      fill: 0xffffff,
      fontWeight: 500,
      fontFamily: "Boogaloo",
    });
    launchBtnText.anchor.set(0.5);
    launchBtnText.x = boardWidth / 2;
    launchBtnText.y = (boardHeight * 81) / 100;

    // LAUNCH IN BUTTON
    const launchBtn = new Sprite(bossScoreBtnBg);
    launchBtn.width = (boardWidth * 30) / 100;
    launchBtn.height = (boardHeight * 7) / 100;
    launchBtn.anchor.set(0.5);
    launchBtn.x = boardWidth / 2;
    launchBtn.y = (boardHeight * 81) / 100;
    launchBtn.interactive = true;
    launchBtn.cursor = "pointer";
    launchBtn
      .on("pointerover", () => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
        hoverSound.play();
        launchBtnText.scale.x = 1.1;
        launchBtnText.scale.y = 1.1;
      })
      .on("pointerout", () => {
        launchBtnText.scale.x = 1.0;
        launchBtnText.scale.y = 1.0;
      })
      .on("pointerdown", () => {
        tapSound.pause();
        tapSound.currentTime = 0;
        tapSound.play();
        TweenMax.to(board, 1, {
          ease: Back.easeIn.config(1.7),
          y: -(boardHeight + 200),
        });
        setTimeout(() => {
          app.stage.removeChild(bossModeInfoContainer);
          loadBossModeUI(app, 1);
        }, 1200);
      });
    board.addChild(launchBtn);
    board.addChild(launchBtnText);
    bossModeInfoContainer.addChild(board);
  });

  setTimeout(() => {
    TweenMax.to(board, 1, {
      ease: Back.easeOut.config(1.7),
      y: -((boardHeight * 21) / 100),
    });
  }, 500);

  app.stage.addChild(bossModeInfoContainer);
}
