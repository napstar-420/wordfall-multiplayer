function createNormalModeUI(app) {
  const normalModeContainer = new PIXI.Container();

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
    normalModeContainer.addChild(getBackground(normalModeBg));
    normalModeContainer.addChild(getForeground(normalModeFg));
    normalModeContainer.addChild(getScoreFrame(scoreFrame));
    normalModeContainer.addChild(getClockFrame(clockFrame));
    normalModeContainer.addChild(getMenuBtn(menuBtn));
    const flowers = getFlowers([flower, twinFlower1, twinFlower2]); // creates and add flower to flowers array
    flowers.map((flowerObj) => {
      normalModeContainer.addChild(flowerObj.sprite);
    });
  });
  app.stage.addChild(normalModeContainer);
}

function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = app.view.width;
  bgSprite.height = app.view.height;
  return bgSprite;
}

function getForeground(texture) {
  const fgSprite = new PIXI.Sprite(texture);
  fgSprite.width = app.view.width;
  fgSprite.y = app.view.height - 152;
  return fgSprite;
}

function getScoreFrame(texture) {
  const scoreFrameSprite = new PIXI.Sprite(texture);
  scoreFrameSprite.anchor.set(0.5);
  scoreFrameSprite.x = app.view.width / 2;
  scoreFrameSprite.y = 40;
  return scoreFrameSprite;
}

function getClockFrame(texture) {
  const clockFrameSprite = new PIXI.Sprite(texture);
  clockFrameSprite.anchor.set(0.5);
  clockFrameSprite.x = 90;
  clockFrameSprite.y = 40;
  return clockFrameSprite;
}

function getMenuBtn(texture) {
  const liveFrameSprite = new PIXI.Sprite(texture);
  liveFrameSprite.anchor.set(0.5);
  liveFrameSprite.x = app.view.width - 45;
  liveFrameSprite.y = 40;
  return liveFrameSprite;
}

function getFlowers(flowersTextures) {
  const flowers = [];

  for (let i = 0; i < 9; i++) {
    const flowerSprite = new PIXI.Sprite(
      flowersTextures[getRandomNumber(flowersTextures.length, 0)]
    );
    flowerSprite.anchor.y = 0.5;
    flowerSprite.anchor.x = 0.5;
    flowerSprite.y = app.view.height - 120;
    const interval = app.view.width / 8;
    flowerSprite.x = 100;
    //   interval * i <= 0
    //     ? 50
    //     : interval * i > app.view.width - 50
    //     ? app.view.width - 50
    //     : interval * i;
    const flowerObj = {
      x: flowerSprite.x,
      sprite: flowerSprite,
    };
    flowers.push(flowerObj);
  }

  function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return flowers;
}
