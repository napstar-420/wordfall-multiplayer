import { getBackground } from "../gameUI.js";
import loadMainMenu from "../mainMenu.js";
import { hoverSound, tapSound } from "../music and sounds/index.js";
import { Container, Assets, Sprite, Text, Graphics } from "pixi.js";
import { TweenMax } from "gsap/gsap-core.js";
import { Back, Elastic, Quad } from "gsap";

export default function loadLeaderBoard(app) {
  // CONTAINER
  const leaderBoard = new Container();
  leaderBoard.width = app.view.width;
  leaderBoard.height = app.view.height;
  // LOADING ASSETS
  Assets.load([
    "leaderBoardBg",
    "scoreBoard",
    "leaderNameBg",
    "leaderScoreBg",
    "scoreTrophy",
    "menuBtnBack",
    "leaderBoardInnerBg"
  ])
    .then((textures) => {
      // Destructuring
      const {
        leaderBoardBg,
        scoreBoard,
        leaderNameBg,
        leaderScoreBg,
        scoreTrophy,
        menuBtnBack,
        leaderBoardInnerBg
      } = textures;
      // Background
      leaderBoard.addChild(getBackground(leaderBoardBg));
      // Board
      const board = new Container();
      const boardWidth = (app.view.height * 105) / 100;
      const boardHeight = (app.view.height * 115) / 100;
      board.width = boardWidth;
      board.height = boardHeight;
      board.x = app.view.width / 2 - boardWidth / 2 + 25;
      board.y = -(boardHeight + 100);
      // Board BG
      const boardBg = new Sprite(scoreBoard);
      boardBg.width = boardWidth;
      boardBg.height = boardHeight;
      board.addChild(boardBg);
      // Leaderboard heading
      const heading = new Text("LEADER BOARD", {
        fontSize: (boardWidth * 7) / 100,
        fill: "#ffffff",
        fontWeight: 500,
        fontFamily: "Boogaloo",
      });
      heading.anchor.x = 0.53;
      heading.anchor.y = 0.5;
      heading.x = boardWidth / 2;
      heading.y = (boardHeight * 30) / 100;
      board.addChild(heading);
      // width and height
      const positionWidth = (boardWidth * 60) / 100;
      const positionHeight = (boardHeight * 6) / 100;
      const positionsWrapperHeight = (boardHeight * 44) / 100;

      // scroll container
      const scrollContainer = new Container();
      scrollContainer.width = positionWidth;
      scrollContainer.height = positionsWrapperHeight;
      scrollContainer.x =
        boardWidth / 2 - positionWidth / 2 - (boardWidth * 1.5) / 100;
      scrollContainer.y = (boardHeight * 39) / 100;
      scrollContainer.interactive = true;
      scrollContainer.cursor = "pointer";

      // Scroll Container Background
      const backSprite = new Sprite(leaderBoardInnerBg);
      backSprite.width = (boardWidth * 64) / 100;
      backSprite.height = (boardHeight * 46) / 100;
      backSprite.x = boardWidth / 2 - ((boardWidth * 64) / 100) / 2 - (boardWidth * 1.5) / 100
      backSprite.y = (boardHeight * 38) / 100;
      board.addChild(backSprite)

      // PositionsWrapper
      const positionsWrapper = new Container();
      positionsWrapper.width = positionWidth;
      positionsWrapper.x = 0;
      positionsWrapper.y = app.view.height * 1 / 100;
      scrollContainer.addChild(positionsWrapper);

      let isMouseDown = false;
      let isMouseUp = true;
      let lastPos = null;
      let lastDiff = null;
      let scrollTween = null;

      scrollContainer
        .on("pointerdown", onMouseDown)
        .on("pointerup", onMouseUp)
        .on("pointermove", onMouseMove);

      function onMouseDown(e) {
        isMouseDown = true;
        isMouseUp = false;

        const clientY = !e.originalEvent.touches
          ? e.originalEvent.clientY
          : e.originalEvent.touches[0].clientY;

        if (scrollTween) scrollTween.kill();
        lastPos = {
          y: clientY,
        };
      }

      function onMouseUp(e) {
        if (lastDiff) {
          const ease = Quad.easeOut;
          if (positionsWrapper.y > 0) {
            TweenMax.to(positionsWrapper, 0.5, {
              ease: ease,
              y: app.view.height * 1 / 100,
            });
          }
          if (positionsWrapper.y < -(positions.length * ((boardHeight * 7.5) / 100)) + positionsWrapperHeight) {
            TweenMax.to(positionsWrapper, 0.5, {
                ease: ease,
                y: -(positions.length * ((boardHeight * 7.5) / 100) - positionsWrapperHeight),
              });
          }
        }
        isMouseUp = true;
        isMouseDown = false;
        lastPos = null;
        lastDiff = null;
      }

      function onMouseMove(e) {
        const clientY = !e.originalEvent.touches
          ? e.originalEvent.clientY
          : e.originalEvent.touches[0].clientY;

        if (isMouseDown) {
          lastDiff = clientY - lastPos.y;
          lastPos.y = clientY;
          if (positionsWrapper.y < 0) {
            positionsWrapper.y += lastDiff / 2;
          } else {
            positionsWrapper.y += lastDiff;
          }
        }
      }

      const mask = new Graphics();
      mask
        .beginFill(0xffffff)
        .drawRect(0, 0, (boardWidth * 64) / 100, (boardHeight * 44) / 100)
        .endFill();

      board.addChild(scrollContainer);

      function getPositionContainer(name, score, index) {
        // Position Container
        const positionContainer = new Container();
        positionContainer.width = positionWidth;
        positionContainer.height = positionHeight;
        positionContainer.x = 0;
        positionContainer.y = 0;

        // Name Container
        const nameContainer = new Container();
        nameContainer.width = (positionWidth * 60) / 100;
        nameContainer.height = positionHeight;
        nameContainer.x = 0;
        nameContainer.y = 0;

        // Name Bg
        const nameBg = new Sprite(leaderNameBg);
        nameBg.width = positionWidth
        nameBg.height = positionHeight;
        nameContainer.addChild(nameBg);

        // Name Text
        const nameText = new Text(`${index + 1}. ${name}`, {
          fontSize: (boardWidth * 4) / 100,
          fill: "#8e3e05",
          fontWeight: 300,
          fontFamily: "Boogaloo",
        });
        nameText.anchor.y = 0.5;
        nameText.y = positionHeight / 2;
        nameText.x = (positionWidth * 5) / 100;
        nameContainer.addChild(nameText);

        // Score Container
        const scoreContainer = new Container();
        scoreContainer.width = (positionWidth * 40) / 100;
        scoreContainer.height = positionHeight;
        scoreContainer.x = (positionWidth * 60.2) / 100;
        scoreContainer.y = 0;

        // Score Bg
        const scoreBg = new Sprite(leaderScoreBg);
        scoreBg.width = (positionWidth * 40) / 100;
        scoreBg.height = positionHeight * 1.1;
        scoreBg.y = -((positionHeight * 1.1) * 5 / 100);
        scoreContainer.addChild(scoreBg);
        positionContainer.addChild(nameContainer);
        positionContainer.addChild(scoreContainer);

        // Score Trophy
        const scoreTrophySprite = new Sprite(scoreTrophy);
        scoreTrophySprite.width = (positionWidth * 9) / 100;
        scoreTrophySprite.height = (positionWidth * 9) / 100;
        scoreTrophySprite.anchor.x = 0;
        scoreTrophySprite.anchor.y = 0.45;
        scoreTrophySprite.y = positionHeight / 2;
        scoreTrophySprite.x = (positionWidth * 5) / 100;
        scoreContainer.addChild(scoreTrophySprite);

        // Score Text
        const scoreText = new Text(score, {
          fontSize: (boardWidth * 4) / 100,
          fill: "#ffffff",
          fontWeight: 600,
          fontFamily: "Barlow",
        });
        scoreText.anchor.y = 0.5;
        scoreText.y = positionHeight / 2;
        scoreText.x = (positionWidth * 15) / 100;
        scoreContainer.addChild(scoreText);

        return positionContainer;
      }

      const positions = [
        {
          name: "Thomas Shelby",
          score: "9467",
        },
        {
          name: "Snoop dogg",
          score: "8254",
        },
        {
          name: "John Wick",
          score: "5478",
        },
        {
          name: "Kristen Stewart",
          score: "2698",
        },
        {
          name: "Megan Fox",
          score: "2214",
        },
        {
          name: "Optimus Prime",
          score: "1568",
        },
        {
          name: "Lil Wayne",
          score: "1111",
        },
        {
          name: "Eminem",
          score: "1054",
        },
        {
          name: "Dr. Dre",
          score: "997",
        },
        {
          name: "Nicki Minaj",
          score: "845",
        },
        {
          name: "Tom Cruise",
          score: "789",
        },
        {
          name: "Leonardo DiCaprio",
          score: "632",
        },
        {
          name: "Jo Biden",
          score: "544",
        },
        {
          name: "Max Well",
          score: "498",
        },
        {
          name: "Billi Elish",
          score: "425",
        },
        {
          name: "Trump",
          score: "369",
        },
        {
          name: "Sundar Pichai",
          score: "125",
        },
      ];

      positions.map((position, index) => {
        const { name, score } = position;
        const positionContainer = getPositionContainer(name, score, index);
        positionContainer.y += index * ((boardHeight * 7.5) / 100);
        positionsWrapper.addChild(positionContainer);
      });

      scrollContainer.addChild(mask);
      scrollContainer.mask = mask;

      const mainMenuBtn = new Sprite(menuBtnBack);
      mainMenuBtn.width = (boardWidth * 35) / 100;
      mainMenuBtn.height = (boardWidth * 10) / 100;
      mainMenuBtn.anchor.x = 0.5;
      mainMenuBtn.anchor.y = 0.5;
      mainMenuBtn.x = boardWidth / 2 - (boardWidth * 1.5) / 100;
      mainMenuBtn.y = (boardHeight * 91) / 100;
      board.addChild(mainMenuBtn);

      const mainMenuText = new Text("MAIN MENU", {
        fontSize: (boardWidth * 5) / 100,
        fill: 0xffffff,
        fontWeight: 600,
        fontFamily: "Boogaloo",
      });
      mainMenuText.anchor.set(0.5);
      mainMenuText.x = boardWidth / 2 - (boardWidth * 1.5) / 100;
      mainMenuText.y = (boardHeight * 91) / 100;
      board.addChild(mainMenuText);
      mainMenuBtn.interactive = true;
      mainMenuBtn.cursor = "pointer";
      mainMenuBtn
        .on("pointerover", () => {
          hoverSound.currentTime = 0;
          hoverSound.play();
          mainMenuText.scale.x = 1.1;
          mainMenuText.scale.y = 1.1;
        })
        .on("pointerout", () => {
          mainMenuText.scale.x = 1;
          mainMenuText.scale.y = 1;
        })
        .on("pointerdown", () => {
          tapSound.play();
          TweenMax.to(board, 1, {
            ease: Back.easeIn.config(1.7),
            y: -(boardHeight + 200),
          });
          setTimeout(() => {
            app.stage.removeChild(leaderBoard);
            loadMainMenu();
          }, 1500);
        });
      leaderBoard.addChild(board);
      return board;
    })
    .then((board) => {
      // APPENDING TO STAGE
      app.stage.addChild(leaderBoard);
      setTimeout(() => {
        TweenMax.to(board, 1, {
          ease: Elastic.easeOut.config(1, 0.99),
          y: -((app.view.height * 17) / 100),
        });
      }, 750);
    });
}
