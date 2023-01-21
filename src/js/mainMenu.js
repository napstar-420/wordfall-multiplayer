import { app } from "./app.js";
import loadNormalModeUI from "./normalMode/ui.js";
import { getBackground, getMenuBoard } from "./gameUI.js";
import loadBossModeInfo from "./boss mode/info.js";

export default function loadMainMenu() {
  const hoverSound = new Audio(
    "/src/assets/music and sound effects/hoverSound.mp3"
  );
  const tapSound = new Audio(
    "/src/assets/music and sound effects/tapSound.wav"
  );
  // MAIN MENU
  const MAIN_MENU = new PIXI.Container();
  MAIN_MENU.width = app.view.width;
  MAIN_MENU.height = app.view.height;

  // BOARD CONTAINER
  const BoardContainer = new PIXI.Container();
  const width = (app.view.height * 90) / 100;
  const height = (app.view.height * 100) / 100;
  BoardContainer.width = width;
  BoardContainer.height = height;
  BoardContainer.x = app.view.width / 2;
  BoardContainer.y = -height - 200;

  // LOADING ASSETS
  PIXI.Assets.load(["mainMenuBackground", "menuBoard", "menuBtnBack"]).then(
    (textures) => {
      // DESTRUCTURING
      const { mainMenuBackground, menuBoard, menuBtnBack } = textures;

      // ADD BACKGROUND AND BOARD SPRITE
      MAIN_MENU.addChild(getBackground(mainMenuBackground));
      BoardContainer.addChild(getMenuBoard(menuBoard));

      // PLAY NOW BTN
      const playNowButton = new PIXI.Text("PLAY NOW", {
        fontSize: (BoardContainer.height * 10) / 100,
        fill: 0xffffff,
        align: "left",
        fontFamily: "Boogaloo",
        fontWeight: "500",
      });
      playNowButton.y = (BoardContainer.height * 29) / 100;
      playNowButton.anchor.x = 0.56;
      playNowButton.anchor.y = 0.5;
      playNowButton.scale.x = 0.8;
      playNowButton.scale.y = 0.8;
      playNowButton.interactive = true;
      playNowButton.cursor = "pointer";
      playNowButton
        .on("pointerover", () => cursorOver(playNowButton, 0.8))
        .on("pointerout", () => cursorOut(playNowButton, 0.8))
        .on("pointerdown", () => startMode(loadNormalModeUI));
      BoardContainer.addChild(playNowButton);

      // CURSOR INTERACTIONS
      function cursorOver(button, scale) {
        button.scale.x = scale + 0.05;
        button.scale.y = scale + 0.05;
        hoverSound.play();
      }
      function cursorOut(button, scale) {
        button.scale.x = scale;
        button.scale.y = scale;
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }
      function startMode(callback) {
        tapSound.play();
        TweenMax.to(BoardContainer, 1, {
          ease: Back.easeIn.config(1.7),
          y: -height - 200,
        });
        setTimeout(() => {
          callback(app);
          app.stage.removeChild(MAIN_MENU);
        }, 1500);
      }

      // ADDING MAIN MENU BUTTONS
      const modeBtns = [
        {
          mode: "BOSS MODE",
          height: (BoardContainer.height * 45) / 100,
          event: () => {
            tapSound.play();
            TweenMax.to(BoardContainer, 1, {
              ease: Back.easeIn.config(1.7),
              y: -height - 200,
            });
            setTimeout(() => {
              loadBossModeInfo(app);
              app.stage.removeChild(MAIN_MENU);
            }, 1500);
          },
        },
        {
          mode: "PRACTICE",
          height: (BoardContainer.height * 57) / 100,
          event: () => alert("have not added yet"),
        },
        {
          mode: "MULTIPLAYER",
          height: (BoardContainer.height * 69) / 100,
          event: () => alert("have not added yet"),
        },
        {
          mode: "LEADERBOARD",
          height: (BoardContainer.height * 81) / 100,
          event: () => alert("have not added yet"),
        },
      ];

      modeBtns.map((modeObj) => {
        const modeBtn = new PIXI.Sprite(menuBtnBack);
        const modeBtnScale = (BoardContainer.height * 1.35) / 100 / 10;
        modeBtn.scale.x = modeBtnScale;
        modeBtn.scale.y = modeBtnScale;
        modeBtn.x = 0;
        modeBtn.anchor.x = 0.55;
        modeBtn.anchor.y = 0.5;
        modeBtn.y = modeObj.height;
        const modeBtnText = new PIXI.Text(modeObj.mode, {
          fontFamily: "Boogaloo",
          fontSize: 35,
          fontWeight: "500",
          fill: "0xffffff",
        });
        modeBtnText.anchor.set(0.6);
        modeBtn.addChild(modeBtnText);
        modeBtn.interactive = true;
        modeBtn.cursor = "pointer";
        modeBtn
          .on("pointerover", () => cursorOver(modeBtn, modeBtnScale))
          .on("pointerout", () => cursorOut(modeBtn, modeBtnScale))
          .on("click", modeObj.event);
        BoardContainer.addChild(modeBtn);
      });
      MAIN_MENU.addChild(BoardContainer);
    }
  );

  setTimeout(() => {
    TweenMax.to(BoardContainer, 1, {
      ease: Elastic.easeOut.config(1, 0.99),
      y: -50,
    });
  }, 750);

  // ADDING MAIN MENU
  app.stage.addChild(MAIN_MENU);
}
