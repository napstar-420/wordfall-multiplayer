import { app } from "./app.js";

export function getMenuBoard(texture) {
  const menuBoardSprite = new PIXI.Sprite(texture);
  menuBoardSprite.width = app.view.height * 90 / 100;
  menuBoardSprite.height = app.view.height * 100 / 100;
  menuBoardSprite.anchor.x = 0.5
  return menuBoardSprite;
}

export function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = app.view.width;
  bgSprite.height = app.view.height;
  return bgSprite;
}

export function getForeground(texture) {
  const fgSprite = new PIXI.Sprite(texture);
  fgSprite.width = app.view.width;
  fgSprite.y = app.view.height - 140;
  return fgSprite;
}

export function getScoreFrame(texture) {
  const scoreFrame = new PIXI.Container();
  scoreFrame.x = 80;
  scoreFrame.y = 40;
  const scoreFrameSprite = new PIXI.Sprite(texture);
  scoreFrameSprite.width = 200;
  scoreFrameSprite.height = 120;
  scoreFrameSprite.anchor.set(0.5);
  const score = new PIXI.Text('0', {
    fontWeight: 'bold',
    fill: '#303030',
    fontFamily: 'Barlow'
  });
  score.anchor.x = 0.5;
  score.anchor.y = 0.5;
  score.x = 15;
  score.y = -3
  scoreFrame.addChild(scoreFrameSprite);
  scoreFrame.addChild(score);
  // x
  const x = new PIXI.Text('x', {
    fontWeight: 'normal',
    fill: '#cf0c12',
    fontFamily: 'Luckiest Guy',
    fontSize: 24,
  })
  x.x = 75;
  x.y = -10;
  scoreFrame.addChild(x);
  // Multiplier
  const multiplier = new PIXI.Text('1', {
    fontWeight: 'normal',
    fill: '#cf0c12',
    fontFamily: 'Luckiest Guy',
    fontSize: 40,
  })
  multiplier.anchor.set(0.5);
  multiplier.x = 100;
  multiplier.y = -5
  scoreFrame.addChild(multiplier)
  return scoreFrame;
}

export function getClockFrame(texture) {
  const clockFrameSprite = new PIXI.Sprite(texture);
  clockFrameSprite.anchor.set(0.5);
  clockFrameSprite.x = 80;
  clockFrameSprite.y = 40;
  return clockFrameSprite;
}

export function getMenuBtn(texture) {
  const menuBtn = new PIXI.Sprite(texture);
  menuBtn.width = 130;
  menuBtn.height = 130;
  menuBtn.anchor.set(0.5);
  menuBtn.x = app.view.width - 45;
  menuBtn.y = 40;
  return menuBtn;
}

export function getLivesContainer(textures) {
  const livesContainer = new PIXI.Container();
  const width = app.view.width > 1000 ? 1000 : app.view.width;
  livesContainer.width = width;
  livesContainer.height = 80;
  livesContainer.x = ((app.view.width - width) / 2) + 60
  livesContainer.y = app.view.height - 160;
  const numberOfLoops = Math.floor(width / 150);
  console.log(numberOfLoops)
  const distanceBetweenLife = (width / numberOfLoops);
  for (let i = 0; i < numberOfLoops; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length, 0)]
    );
    lifeSprite.anchor.y = 0;
    lifeSprite.anchor.x = 0;
    lifeSprite.y = 0;
    lifeSprite.x = i * distanceBetweenLife;
    livesContainer.addChild(lifeSprite);
  }
  return livesContainer;
}

export function getWordsContainer() {
  const container = new PIXI.Container();
  const width = app.view.width > 1000 ? 1000 : app.view.width;
  container.width = width;
  container.height = app.view.height - 140;
  container.x = ((app.view.width - width) / 2)
  return container
}

export function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getWordBg() {
  const textures = await PIXI.Assets.load(['letterTile']);
  const letterTileSprite = new PIXI.Sprite(textures.letterTile);
  return letterTileSprite;
}
  
