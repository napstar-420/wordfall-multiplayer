import { getBackground } from "../gameUI.js";
import loadMainMenu from "../mainMenu.js";
import { hoverSound, tapSound } from "../music and sounds/index.js";
import { Container, Assets, Sprite, Text, Graphics } from "pixi.js";
import { TweenMax } from "gsap/gsap-core.js";
import { Back, Elastic } from "gsap";
import example from '../assets/images/game-back.jpg'

export default function loadLeaderBoard(app) {
    // CONTAINER
    const leaderBoard = new Container();
    leaderBoard.width = app.view.width;
    leaderBoard.height = app.view.height;
    // LOADING ASSETS
    Assets.load([
        'leaderBoardBg',
        'scoreBoard',
        'leaderNameBg',
        'leaderScoreBg',
        'scoreTrophy',
        'menuBtnBack'
    ]).then(textures => {
        // Destructuring
        const {leaderBoardBg, scoreBoard, leaderNameBg, leaderScoreBg, scoreTrophy, menuBtnBack} = textures;
        // Background
        leaderBoard.addChild(getBackground(leaderBoardBg));
        // Board
        const board = new Container();
        const boardWidth = (app.view.height * 105) / 100;
        const boardHeight = (app.view.height * 115) / 100;
        board.width = boardWidth;
        board.height = boardHeight;
        board.x = app.view.width / 2 - (boardWidth / 2) + 25;
        board.y = -(boardHeight + 100);
        // Board BG
        const boardBg = new Sprite(scoreBoard);
        boardBg.width = boardWidth;
        boardBg.height = boardHeight;
        board.addChild(boardBg);
        // Leaderboard heading
        const heading = new Text('LEADER BOARD', {
            fontSize: boardWidth * 7 / 100,
            fill: '#ffffff',
            fontWeight: 500,
            fontFamily: 'Boogaloo'
        })
        heading.anchor.x = 0.53;
        heading.anchor.y = 0.5;
        heading.x = boardWidth /2;
        heading.y = boardHeight * 30 / 100;
        board.addChild(heading);

        const positionWidth = boardWidth * 60 / 100;
        const positionHeight = boardHeight * 7 / 100;

        // const positionsContainer = new Container();
        // positionsContainer.width = positionWidth;
        // positionsContainer.height = positionHeight;
        // positionsContainer.x = boardWidth / 2 - (positionWidth / 2) - (boardWidth * 1.5 / 100);
        // positionsContainer.y = boardHeight * 40 / 100;

        // const backSprite = Sprite.from(example);
        // backSprite.width = positionWidth;
        // backSprite.height = positionHeight;
        // positionsContainer.addChild(backSprite);
        // board.addChild(positionsContainer);

        function getPositionContainer(name, score, index) {
            
            // Position Container
            const positionContainer = new Container();
            positionContainer.width = positionWidth;
            positionContainer.height = positionHeight;
            positionContainer.x = boardWidth / 2 - (positionWidth / 2) - (boardWidth * 1.5 / 100);
            positionContainer.y = boardHeight * 40 / 100;
            
            // Name Container
            const nameContainer = new Container();
            nameContainer.width = positionWidth * 60 / 100;
            nameContainer.height = positionHeight;
            nameContainer.x = 0;
            nameContainer.y = 0;
            
            // Name Bg
            const nameBg = new Sprite(leaderNameBg);
            nameBg.width = positionWidth * 60 / 100;
            nameBg.height = positionHeight;
            nameContainer.addChild(nameBg);

            // Name Text
            const nameText = new Text(`${index+1}. ${name}`, {
                fontSize: boardWidth * 4 / 100,
                fill: '#ffffff',
                fontWeight: 300,
                fontFamily: 'Boogaloo'
            })
            nameText.anchor.y = 0.5;
            nameText.y = positionHeight / 2;
            nameText.x = positionWidth * 5 / 100;
            nameContainer.addChild(nameText);

            // Score Container
            const scoreContainer = new Container();
            scoreContainer.width = positionWidth * 40 / 100;
            scoreContainer.height = positionHeight;
            scoreContainer.x = positionWidth * 60 / 100;
            scoreContainer.y = 0;
    
            // Score Bg
            const scoreBg = new Sprite(leaderScoreBg);
            scoreBg.width = positionWidth * 40 / 100;
            scoreBg.height = positionHeight;
            scoreContainer.addChild(scoreBg);
            positionContainer.addChild(nameContainer);
            positionContainer.addChild(scoreContainer);

            // Score Trophy
            const scoreTrophySprite = new Sprite(scoreTrophy);
            scoreTrophySprite.width = positionWidth * 8 / 100;
            scoreTrophySprite.height = positionWidth * 8 / 100;
            scoreTrophySprite.anchor.x = 0;
            scoreTrophySprite.anchor.y = 0.45;
            scoreTrophySprite.y = positionHeight / 2;
            scoreTrophySprite.x = (positionWidth * 40 / 100) * 67 / 100; 
            scoreContainer.addChild(scoreTrophySprite);

            // Score Text
            const scoreText = new Text(score, {
                fontSize: boardWidth * 4 / 100,
                fill: '#ffffff',
                fontWeight: 600,
                fontFamily: 'Barlow'
            })
            scoreText.anchor.y = 0.5;
            scoreText.y = positionHeight / 2;
            scoreText.x = positionWidth * 5 / 100;
            scoreContainer.addChild(scoreText);

            return positionContainer;
        }

        const positions = [
            {
                name: 'Imran Khan',
                score: '1400'
            },
            {
                name: 'Shahbaz Shareef',
                score: '1158'
            },
            {
                name: 'Mehwish Hayat',
                score: '669'
            },
            {
                name: 'General Bajwa',
                score: '420'
            },
            {
                name: 'Saba Qamar',
                score: '333'
            },
            // {
            //     name: 'Saba Qamar',
            //     score: '333'
            // },
            // {
            //     name: 'Saba Qamar',
            //     score: '333'
            // },
            // {
            //     name: 'Saba Qamar',
            //     score: '333'
            // },
        ];

        positions.map((position, index) => {
            const {name, score} = position;
            const positionContainer = getPositionContainer(name, score, index);
            positionContainer.y += index * (boardHeight *  9 / 100);
            board.addChild(positionContainer);
        });

        // const mask = new Graphics();
        // mask.width = positionWidth;
        // mask.lineStyle(0)
        // mask.height = boardHeight * 43 / 100;
        // mask.x = boardWidth / 2 - (positionWidth / 2) - (boardWidth * 1.5 / 100);
        // mask.y = boardHeight * 40 / 100;
        // leaderBoard.addChild(mask);
        // positionsContainer.mask = mask;

        const mainMenuBtn = new Sprite(menuBtnBack);
        mainMenuBtn.width = boardWidth * 35 / 100;
        mainMenuBtn.height = boardWidth * 10 / 100;
        mainMenuBtn.anchor.x = 0.5;
        mainMenuBtn.anchor.y = 0.5;
        mainMenuBtn.x = boardWidth / 2 - (boardWidth * 1.5 / 100);
        mainMenuBtn.y = boardHeight * 90 / 100 ;
        board.addChild(mainMenuBtn);

        const mainMenuText = new Text('MAIN MENU', {
            fontSize: boardWidth * 5 / 100,
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Boogaloo'
        })
        mainMenuText.anchor.set(0.5);
        mainMenuText.x = boardWidth / 2 - (boardWidth * 1.5 / 100);
        mainMenuText.y = boardHeight * 90 / 100;
        board.addChild(mainMenuText);
        mainMenuBtn.interactive = true;
        mainMenuBtn.cursor = 'pointer';
        mainMenuBtn
            .on('pointerover', () => {
                hoverSound.currentTime = 0;
                hoverSound.play()
                mainMenuText.scale.x = 1.1;
                mainMenuText.scale.y = 1.1;
            })
            .on('pointerout', () => {
                mainMenuText.scale.x = 1;
                mainMenuText.scale.y = 1;
            })
            .on('pointerdown', () => {
                tapSound.play();
                TweenMax.to(board, 1, {
                    ease: Back.easeIn.config(1.7),
                    y: -(boardHeight + 200),
                  });
                  setTimeout(() => {
                    app.stage.removeChild(leaderBoard);
                    loadMainMenu();
                  }, 1500);
            })
        leaderBoard.addChild(board);
        return board;
    }).then((board) => {
        // APPENDING TO STAGE
        app.stage.addChild(leaderBoard);
        setTimeout(() => {
            TweenMax.to(board, 1, {
            ease: Elastic.easeOut.config(1, 0.99),
            y: -(app.view.height * 17 / 100),
            });
        }, 750);
    })
}