import {
  getBackground,
  getForeground,
  getScoreFrame,
  getClockFrame,
  getMenuBtn,
  getLivesContainer,
} from "./gameUI.js";

export default function createBossModeUI(app) {
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
      clockFrame,
      menuBtn,
      jackOLantern1,
      jackOLantern2,
      jackOLantern3,
    } = textures;
    BossModeContainer.addChild(getBackground(bossModeBg));
    BossModeContainer.addChild(getForeground(bossModeFg));
    BossModeContainer.addChild(getScoreFrame(scoreFrame));
    BossModeContainer.addChild(getClockFrame(clockFrame));
    BossModeContainer.addChild(getMenuBtn(menuBtn));
    BossModeContainer.addChild(
      getLivesContainer([jackOLantern1, jackOLantern2, jackOLantern3])
    );
  });

  return BossModeContainer;
}
