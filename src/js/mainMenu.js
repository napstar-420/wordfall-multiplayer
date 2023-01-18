import { app } from "./app.js";
import loadBossModeUI from "./bossModeUI.js";
import loadNormalModeUI from "./normalModeUI.js";
import { getBackground, getMenuBoard } from "./gameUI.js";

export default function loadMainMenu() {
  // MAIN MENU
  const MAIN_MENU = new PIXI.Container();
  MAIN_MENU.width = app.view.width;
  MAIN_MENU.height = app.view.height;

  // BOARD CONTAINER
  const BoardContainer = new PIXI.Container();
  BoardContainer.width = 550;
  BoardContainer.height = 550;
  BoardContainer.x = app.view.width / 2;
  BoardContainer.y = -600;

  // VARIABLES
  let slideDown = true;
  let slideUp = false;

  // LOADING ASSETS
  PIXI.Assets.load([
    "mainMenuBackground",
    "menuBoard",
    "menuBtnBack",
  ]).then((textures) => {
    // DESTRUCTURING
    const {mainMenuBackground, menuBoard, menuBtnBack} = textures;

    // ADD BACKGROUND AND BOARD SPRITE
    MAIN_MENU.addChild(getBackground(mainMenuBackground));
    BoardContainer.addChild(getMenuBoard(menuBoard));

    // PLAY NOW BTN
    const playNowButton = new PIXI.Text("PLAY NOW", {
      fontSize: 45,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playNowButton.y = 163;
    playNowButton.anchor.x = 0.56;
    playNowButton.anchor.y = 0.5;
    playNowButton.interactive = true;
    playNowButton.cursor = 'pointer';
    playNowButton
      .on('pointerover', () => cursorOver(playNowButton))
      .on('pointerout', () => cursorOut(playNowButton))
      .on('pointerdown', () => startMode(loadNormalModeUI))
    BoardContainer.addChild(playNowButton);

    // CURSOR INTERACTIONS
    function cursorOver(button) {
      button.scale.x = 1.1;
      button.scale.y = 1.1;
    }
    function cursorOut(button) {
      button.scale.x = 1;
      button.scale.y = 1;
    }
    function startMode(callback) {
      slideDown = false;
      slideUp = true;

      setTimeout(() => {
        app.ticker.remove()
        slideDown = true;
        slideUp = false;
        callback(app);
        app.stage.removeChild(MAIN_MENU);
      }, 3000)
    }
  
    // ADDING MAIN MENU BUTTONS
    const modeBtns = [
      {
        mode: "BOSS MODE",
        height: 260,
        event: () => startMode(loadBossModeUI),
      },
      {
        mode: "PRACTICE",
        height: 330,
        event: () => alert('have not added yet'),
      },
      {
        mode: "MULTIPLAYER",
        height: 400,
        event: () => alert('have not added yet'),
      },
      {
        mode: "LEADERBOARD",
        height: 470,
        event: () => alert('have not added yet'),
      },
    ];
    
    modeBtns.map((modeObj) => {
      const modeBtn = new PIXI.Sprite(menuBtnBack);
      modeBtn.width = 250;
      modeBtn.height = 70;
      modeBtn.x = 0;
      modeBtn.anchor.x = 0.55;
      modeBtn.anchor.y = 0.5;
      modeBtn.y = modeObj.height;
      const modeBtnText = new PIXI.Text(modeObj.mode, {
        fontFamily: "Chewy",
        fontSize: 35,
        fontWeight: "500",
        fill: "0xffffff",
      });
      modeBtnText.anchor.set(0.6);
      modeBtn.addChild(modeBtnText);
      modeBtn.interactive = true;
      modeBtn.cursor = 'pointer';
      modeBtn
        .on('pointerover', () => cursorOver(modeBtnText))
        .on('pointerout', () => cursorOut(modeBtnText))
        .on('click', modeObj.event)
      BoardContainer.addChild(modeBtn);
    });
    MAIN_MENU.addChild(BoardContainer);
  });
  
  // TICKER
  app.ticker.add(animation);
    
  function animation(delta) {
    if(slideDown && BoardContainer.y < 0){
      BoardContainer.y += delta * 4;
    }
    if(slideUp && BoardContainer.y > -600){
      BoardContainer.y -= delta * 4;
      setTimeout(() => {
        app.ticker.remove(animation);
      }, 3000);
    }
  }

  // ADDING MAIN MENU
  app.stage.addChild(MAIN_MENU);
}
