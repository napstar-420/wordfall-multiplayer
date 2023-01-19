import { startGame } from "./gameLogic.js";
import { getBackground, getForeground, getScoreFrame, getMenuBtn, getLivesContainer, getWordsContainer, getMultiplier } from "./gameUI.js";
import loadScoreBoard from "./scoreBoard.js";

export default function loadNormalModeUI(app) {
  // NORMAL MODE
  const NormalModeContainer = new PIXI.Container();
  NormalModeContainer.width = app.view.width;
  NormalModeContainer.height = app.view.height;
  // LOADING ASSETS
  PIXI.Assets.load([
    "normalModeBg",
    "normalModeFg",
    "scoreFrame",
    "clockFrame",
    "menuBtn",
    "flower",
    "twinFlower1",
    "twinFlower2",
  ]).then((textures) => {
    const {
      normalModeBg,
      normalModeFg,
      scoreFrame,
      menuBtn,
      flower,
      twinFlower1,
      twinFlower2,
    } = textures;

    // ADDING BACKGROUND AND FOREGROUND
    NormalModeContainer.addChild(getBackground(normalModeBg));
    NormalModeContainer.addChild(getLivesContainer([flower, twinFlower1, twinFlower2]));
    NormalModeContainer.addChild(getForeground(normalModeFg));
    NormalModeContainer.addChild(getWordsContainer());
    NormalModeContainer.addChild(getScoreFrame(scoreFrame));
    NormalModeContainer.addChild(getMenuBtn(menuBtn));
    NormalModeContainer.addChild(getMultiplier());
  }).then(() => {
    setTimeout(() => {
      startGame(NormalModeContainer, loadScoreBoard);
    }, 2500);
  })
  
  
  app.stage.addChild(NormalModeContainer);

  
};
