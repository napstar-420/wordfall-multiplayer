export default function createMainMenu(app) {
  const MainMenu = new PIXI.Container();
  MainMenu.width = app.view.width;
  MainMenu.height = app.view.height;

  // LOADING ASSETS
  const assetsPromise = PIXI.Assets.load([
    "mainMenuBackground",
    "menuBoard",
    "menuBtnBack",
  ]);

  assetsPromise.then((textures) => {
    // Adding main menu background
    const menuBackgroundSprite = new PIXI.Sprite(textures.mainMenuBackground);
    menuBackgroundSprite.width = app.view.width;
    menuBackgroundSprite.height = app.view.height;
    menuBackgroundSprite.anchor.set(0.5);
    menuBackgroundSprite.x = app.view.width / 2;
    menuBackgroundSprite.y = app.view.height / 2;
    MainMenu.addChild(menuBackgroundSprite);
    
    // Adding menu board
    const BoardContainer = new PIXI.Container();
    BoardContainer.width = 550;
    BoardContainer.height = 550;
    BoardContainer.x = app.view.width / 2;
    const menuBoardSprite = new PIXI.Sprite(textures.menuBoard);
    menuBoardSprite.width = 550;
    menuBoardSprite.height = 550;
    menuBoardSprite.anchor.x = 0.5;
    menuBoardSprite.anchor.y = 0;
    menuBoardSprite.x = BoardContainer.width / 2;
    menuBoardSprite.y = 0;
    BoardContainer.addChild(menuBoardSprite);
    
    // Adding PLAY NOW Text
    const playNowText = new PIXI.Text("PLAY NOW", {
      fontSize: 36,
      fill: 0xffffff,
      align: "left",
      fontFamily: "Chewy",
      fontWeight: "500",
    });
    playNowText.y = 163;
    playNowText.anchor.x = 0.56;
    playNowText.anchor.y = 0.5;
    BoardContainer.addChild(playNowText);

    // Adding Buttons
    const modeBtns = [
      {
        mode: "BOSS MODE",
        height: 260,
      },
      {
        mode: "PRACTICE",
        height: 330,
      },
      {
        mode: "MULTIPLAYER",
        height: 400,
      },
      {
        mode: "LEADERBOARD",
        height: 470,
      },
    ];
    
    modeBtns.map((modeObj) => {
      const modeBtn = new PIXI.Sprite(textures.menuBtnBack);
      modeBtn.width = 250;
      modeBtn.height = 70;
      modeBtn.x = 0;
      modeBtn.anchor.x = 0.55;
      modeBtn.anchor.y = 0.5;
      modeBtn.y = modeObj.height;
      const modeBtnText = new PIXI.Text(modeObj.mode, {
        fontFamily: "Chewy",
        fontSize: 30,
        fontWeight: "500",
        fill: "0xffffff",
      });
      modeBtnText.anchor.set(0.6);
      modeBtn.addChild(modeBtnText);
      BoardContainer.addChild(modeBtn);
    });

    MainMenu.addChild(BoardContainer);
  });
  return MainMenu;
}
