export function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = window.innerWidth;
  bgSprite.height = window.innerHeight;
  return bgSprite;
}

export function getForeground(texture) {
  const fgSprite = new PIXI.Sprite(texture);
  fgSprite.width = window.innerWidth;
  fgSprite.y = window.innerHeight - 152;
  return fgSprite;
}

export function getScoreFrame(texture) {
  const scoreFrameSprite = new PIXI.Sprite(texture);
  scoreFrameSprite.anchor.set(0.5);
  scoreFrameSprite.x = window.innerWidth / 2;
  scoreFrameSprite.y = 40;
  return scoreFrameSprite;
}

export function getClockFrame(texture) {
  const clockFrameSprite = new PIXI.Sprite(texture);
  clockFrameSprite.anchor.set(0.5);
  clockFrameSprite.x = 90;
  clockFrameSprite.y = 40;
  return clockFrameSprite;
}

export function getMenuBtn(texture) {
//   if (!Array.isArray(texture)) {
//     throw new Error('Passed argument is not an array. PLease pass an array of textures.');
//   }
  const liveFrameSprite = new PIXI.Sprite(texture);
  liveFrameSprite.anchor.set(0.5);
  liveFrameSprite.x = window.innerWidth - 45;
  liveFrameSprite.y = 40;
  return liveFrameSprite;
}

export function getLivesContainer(textures) {
  const livesContainer = new PIXI.Container();
  livesContainer.width = 1000;
  livesContainer.height = 80;
  livesContainer.x = (window.innerWidth - 1000) / 2;
  livesContainer.y = window.innerHeight - 120;

  for (let i = 0; i < 7; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length, 0)]
    );
    lifeSprite.anchor.y = 0.5;
    lifeSprite.anchor.x = 0;
    lifeSprite.y = 0;
    lifeSprite.x = i * 150;
    livesContainer.addChild(lifeSprite);
  }

  return livesContainer;
}

export function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getWordBg() {
  const textures = await PIXI.Assets.load(['letterTile']);
  const letterTileSprite = new PIXI.Sprite(textures.letterTile);
  return letterTileSprite;
}
  
