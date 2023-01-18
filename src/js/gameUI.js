export function getMenuBoard(texture) {
  const menuBoardSprite = new PIXI.Sprite(texture);
  menuBoardSprite.width = 550;
  menuBoardSprite.height = 550;
  menuBoardSprite.anchor.x = 0.5
  return menuBoardSprite;
}

export function getBackground(texture) {
  const bgSprite = new PIXI.Sprite(texture);
  bgSprite.width = 1000;
  bgSprite.height = 600;
  return bgSprite;
}

export function getForeground(texture) {
  const fgSprite = new PIXI.Sprite(texture);
  fgSprite.width = 1000;
  fgSprite.y = 600 - 140;
  return fgSprite;
}

export function getScoreFrame(texture) {
  const scoreFrameSprite = new PIXI.Sprite(texture);
  scoreFrameSprite.width = 200;
  scoreFrameSprite.height = 120;
  scoreFrameSprite.anchor.set(0.5);
  scoreFrameSprite.x = 80;
  scoreFrameSprite.y = 40;
  const score = new PIXI.Text('0', {
    fontWeight: 'bold',
    fill: '#303030',
    fontFamily: 'Barlow'
  });
  score.anchor.x = 0.5;
  score.anchor.y = 0.6;
  score.x = 15;
  scoreFrameSprite.addChild(score);
  return scoreFrameSprite;
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
  menuBtn.x = 1000 - 45;
  menuBtn.y = 40;
  return menuBtn;
}

export function getLivesContainer(textures) {
  const livesContainer = new PIXI.Container();
  livesContainer.width = 800;
  livesContainer.height = 80;
  livesContainer.x = 100
  livesContainer.y = 700 - 250;

  for (let i = 0; i < 7; i++) {
    const lifeSprite = new PIXI.Sprite(
      textures[getRandomNumber(textures.length, 0)]
    );
    lifeSprite.anchor.y = 0;
    lifeSprite.anchor.x = 0;
    lifeSprite.y = 0;
    lifeSprite.x = i * 125;
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
  
