import {
  getBackground,
  getForeground,
  getScoreFrame,
  getMenuBtn,
  getLivesContainer,
  getWordsContainer,
  getMultiplier,
} from "./gameUI.js";
import { startGame } from "./gameLogic.js";
import loadBossScoreBoard from "./bossScoreBoard.js";

export default function loadBossModeUI(app) {
  const BossModeContainer = new PIXI.Container();
  BossModeContainer.width = app.view.width;
  BossModeContainer.height = app.view.height;
  PIXI.Assets.load([
    "bossModeBg",
    "bossModeFg",
    "scoreFrame",
    "clockFrame",
    "menuBtn",
    "jackOLantern1",
    "jackOLantern2",
    "jackOLantern3",
  ]).then((textures) => {
    const {
      bossModeBg,
      bossModeFg,
      scoreFrame,
      menuBtn,
      jackOLantern1,
      jackOLantern2,
      jackOLantern3,
    } = textures;
    BossModeContainer.addChild(getBackground(bossModeBg));
    BossModeContainer.addChild(getLivesContainer([jackOLantern1, jackOLantern2, jackOLantern3]));
    BossModeContainer.addChild(getForeground(bossModeFg));
    BossModeContainer.addChild(getWordsContainer());
    BossModeContainer.addChild(getScoreFrame(scoreFrame));
    BossModeContainer.addChild(getMenuBtn(menuBtn));
    BossModeContainer.addChild(getMultiplier());
  }).then(() => {
    setTimeout(() => {
      startGame(BossModeContainer, loadBossScoreBoard);
    }, 2500);
  })


  app.stage.addChild(BossModeContainer);
}
