const markerFeltFont = new FontFaceObserver('markerFelt', {});

markerFeltFont.load().then(() => {
    // PIXI APPLICATION
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight
    })
    
    // APPENDING TO GAME DIV
    document.getElementById("game-container")
        .appendChild(app.view);
    
    // ADDING ASSETS TO PIXI
    PIXI.Assets.add('mainMenuBackground', '/src/assets/images/Main menu background.png');
    PIXI.Assets.add('menuBoard', '/src/assets/images/frame withouth button 1.png');
    PIXI.Assets.add('menuBtnBack', '/src/assets/images/menu tile v1.png');
    
    createMainMenu(app);
})
