import { startGame } from "../gameLogic.js";
import {
  getBackground,
  getForeground,
  getScoreFrame,
  getMenuBtn,
  getLivesContainer,
  getWordsContainer,
  getNormalClouds,
  getMultiplier,
  getPauseMenu,
  getClockFrame,
} from "../gameUI.js";
import loadScoreBoard from "./scoreBoard.js";
import { normalModeBackMusic } from "../music and sounds/index.js";

export default function loadNormalModeUI(app, level, data = {wpm: null, selectedDifficulty: null}) {
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
    "normalModeClouds",
    "normalModeBg1",
    "pauseMenuBg",
    "clockFrame"
  ])
    .then((textures) => {
      const {
        normalModeFg,
        scoreFrame,
        menuBtn,
        flower,
        twinFlower1,
        twinFlower2,
        normalModeBg1,
        normalModeClouds,
        clockFrame
      } = textures;

      // ADDING BACKGROUND AND FOREGROUND
      NormalModeContainer.addChild(getBackground(normalModeBg1));
      NormalModeContainer.addChild(getNormalClouds(normalModeClouds));
      NormalModeContainer.addChild(
        getLivesContainer([flower, twinFlower1, twinFlower2])
      );
      NormalModeContainer.addChild(getForeground(normalModeFg));
      NormalModeContainer.addChild(getWordsContainer());
      NormalModeContainer.addChild(getScoreFrame(scoreFrame));
      NormalModeContainer.addChild(getMenuBtn(menuBtn));
      NormalModeContainer.addChild(getMultiplier());
      NormalModeContainer.addChild(getClockFrame(clockFrame))
      NormalModeContainer.addChild(getPauseMenu());
    })
    .then(() => {
        normalModeBackMusic.play();
        startGame(NormalModeContainer, loadScoreBoard, level, data);
    });

  app.stage.addChild(NormalModeContainer);
}
