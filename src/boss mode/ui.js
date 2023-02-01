import { Container, Assets } from "pixi.js";
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
  getRulesBoard
} from "../gameUI.js";

import loadBossScoreBoard from "./scoreBoard.js";
import {startGame} from '../gameLogic.js'
import { bossModeBackMusic } from "../music and sounds/index.js";

const rules = {
  1: "Type every letter carefully. One mistake and you're out. If the word touches the ground or hit the lives game over cause you need 100% accuracy to complete this level. (Pumpkins are the life and time is 60 seconds)",
  2: "Get your fingers ready cause you need a speed of 45 words per minute to complete this level. If you lose all of your lives (pumpkins are lives) game over. You don't reach a 45 words per minute level failed.",
  3: "FINAL LEVEL! To beat this level you need a speed of 45 words per minute with 100 percent accuracy. There is no room for mistakes.",
}

export default function loadBossModeUI(app, level) {
  const BossModeContainer = new Container();
  BossModeContainer.width = app.view.width;
  BossModeContainer.height = app.view.height;
  Assets.load([
    `bossModeBg`,
    "bossModeFg",
    "scoreFrame",
    "clockFrame",
    "menuBtn",
    "jackOLantern1",
    "jackOLantern2",
    "jackOLantern3",
    "bossModeClouds",
    "bossScoreBoard",
    "bossScoreBtnBg",
    "bossPauseMenuBg",
    "bossResumeBtn",
    "bossRestartBtn",
    "bossMainMenuBtn",
    "bossCheckBox",
    "bossCheckFill",
    "pumpkin"
  ])
    .then((textures) => {
      const {
        bossModeBg,
        bossModeFg,
        scoreFrame,
        menuBtn,
        pumpkin,
        bossModeClouds,
        clockFrame,
        bossScoreBoard,
        bossScoreBtnBg,
        bossPauseMenuBg,
        bossResumeBtn,
        bossRestartBtn,
        bossMainMenuBtn,
        bossCheckBox,
        bossCheckFill
      } = textures;
      
      BossModeContainer.addChild(getBackground(bossModeBg));
      BossModeContainer.addChild(getNormalClouds(bossModeClouds));
      BossModeContainer.addChild(
        getLivesContainer([pumpkin], 'PUMPKIN')
      );
      BossModeContainer.addChild(getForeground(bossModeFg));
      BossModeContainer.addChild(getWordsContainer());
      BossModeContainer.addChild(getScoreFrame(scoreFrame));
      BossModeContainer.addChild(getMenuBtn(menuBtn));
      BossModeContainer.addChild(getMultiplier());
      BossModeContainer.addChild(getClockFrame(clockFrame))
      BossModeContainer.addChild(getPauseMenu(bossPauseMenuBg, bossResumeBtn, bossRestartBtn, bossMainMenuBtn, bossCheckBox, bossCheckFill, 'BOSS'));
      BossModeContainer.addChild(getRulesBoard(bossScoreBoard, bossScoreBtnBg ,rules[level], level))
    })
    .then(() => {
      bossModeBackMusic.play();
      startGame(BossModeContainer, loadBossScoreBoard, level);
    });

  app.stage.addChild(BossModeContainer);
}
