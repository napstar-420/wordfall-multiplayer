import { Container, Assets } from "pixi.js";
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
  const NormalModeContainer = new Container();
  NormalModeContainer.width = app.view.width;
  NormalModeContainer.height = app.view.height;
  // LOADING ASSETS
  Assets.load([
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
    "clockFrame",
    "pauseMenuBg",
    "resumeBtn",
    "restartBtn",
    "mainMenuBtn",
    "checkBox",
    "checkFill"
  ])
    .then((textures) => {
      const {
        normalModeFg,
        scoreFrame,
        menuBtn,
        twinFlower2,
        normalModeBg1,
        normalModeClouds,
        clockFrame,
        pauseMenuBg,
        resumeBtn,
        restartBtn,
        mainMenuBtn,
        checkBox,
        checkFill,
      } = textures;

      // ADDING BACKGROUND AND FOREGROUND
      NormalModeContainer.addChild(getBackground(normalModeBg1));
      NormalModeContainer.addChild(getNormalClouds(normalModeClouds));
      NormalModeContainer.addChild(
        getLivesContainer([twinFlower2], 'FLOWER')
      );
      NormalModeContainer.addChild(getForeground(normalModeFg));
      NormalModeContainer.addChild(getWordsContainer());
      NormalModeContainer.addChild(getScoreFrame(scoreFrame));
      NormalModeContainer.addChild(getMenuBtn(menuBtn));
      NormalModeContainer.addChild(getMultiplier());
      NormalModeContainer.addChild(getClockFrame(clockFrame))
      NormalModeContainer.addChild(getPauseMenu(pauseMenuBg, resumeBtn, restartBtn, mainMenuBtn, checkBox, checkFill));
    })
    .then(() => {
        normalModeBackMusic.play();
        startGame(NormalModeContainer, loadScoreBoard, level, data);
    });

  app.stage.addChild(NormalModeContainer);
}
