import {
  getBackground,
  getForeground,
  getScoreFrame,
  getMenuBtn,
  getLivesContainer,
  getWordsContainer,
  getMultiplier,
  getNormalClouds,
  getPauseMenu,
  getClockFrame,
} from "../gameUI.js";

import loadBossScoreBoard from "./scoreBoard.js";
import {startGame} from '../gameLogic.js'

export default function loadBossModeUI(app, level) {
  const BossModeContainer = new PIXI.Container();
  BossModeContainer.width = app.view.width;
  BossModeContainer.height = app.view.height;
  PIXI.Assets.load([
    `bossModeBg${level}`,
    "bossModeFg",
    "scoreFrame",
    "clockFrame",
    "menuBtn",
    "jackOLantern1",
    "jackOLantern2",
    "jackOLantern3",
    "bossModeClouds",
  ])
    .then((textures) => {
      const {
        bossModeBg1,
        bossModeBg2,
        bossModeBg3,
        bossModeFg,
        scoreFrame,
        menuBtn,
        jackOLantern1,
        jackOLantern2,
        jackOLantern3,
        bossModeClouds,
        clockFrame
      } = textures;
      switch (level) {
        case 1:
          BossModeContainer.addChild(getBackground(bossModeBg1));
          break;
          case 2:
          BossModeContainer.addChild(getBackground(bossModeBg2));
          break;
          case 3:
          BossModeContainer.addChild(getBackground(bossModeBg3));
          break;
      }
      BossModeContainer.addChild(getNormalClouds(bossModeClouds));
      BossModeContainer.addChild(
        getLivesContainer([jackOLantern1, jackOLantern2, jackOLantern3])
      );
      BossModeContainer.addChild(getForeground(bossModeFg));
      BossModeContainer.addChild(getWordsContainer());
      BossModeContainer.addChild(getScoreFrame(scoreFrame));
      BossModeContainer.addChild(getMenuBtn(menuBtn));
      BossModeContainer.addChild(getMultiplier());
      BossModeContainer.addChild(getClockFrame(clockFrame))
      BossModeContainer.addChild(getPauseMenu());
    })
    .then(() => {
      startGame(BossModeContainer, loadBossScoreBoard, level);
    });

  app.stage.addChild(BossModeContainer);
}
