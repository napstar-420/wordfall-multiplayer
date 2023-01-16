import { getBackground, getForeground, getScoreFrame, getClockFrame, getMenuBtn, getLivesContainer } from "./gameUI.js";

export default function createNormalModeUI(app) {
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
      clockFrame,
      menuBtn,
      flower,
      twinFlower1,
      twinFlower2,
    } = textures;

    // ADDING BACKGROUND AND FOREGROUND
    NormalModeContainer.addChild(getBackground(normalModeBg));
    NormalModeContainer.addChild(getForeground(normalModeFg));
    NormalModeContainer.addChild(getScoreFrame(scoreFrame));
    NormalModeContainer.addChild(getClockFrame(clockFrame));
    NormalModeContainer.addChild(getMenuBtn(menuBtn));
    NormalModeContainer.addChild(getLivesContainer([flower, twinFlower1, twinFlower2]));

  });

  return NormalModeContainer;
};
