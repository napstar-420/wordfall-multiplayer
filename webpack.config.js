const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    app: './src/app.js',
    // mainMenu: './src/mainMenu.js',
    // gameUI: './src/gameUI.js',
    // gameLogic: './src/gameLogic.js',
    // musicAndSounds: './src/music and sounds/index.js',
    // normalMode: './src/normalMode/ui.js',
    // normalScoreBoard: './src/normalMode/scoreBoard.js',
    // bossMode: './src/boss mode/ui.js',
    // bossModeInfo: './src/boss mode/info.js',
    // bossModeScoreboard: './src/boss mode/scoreBoard.js',
    // practiceModeInfo: './src/practiceMode/practiceModeInfo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wordfall Multiplayer Game',
    }),
  ],
  mode: 'development',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif||mp3||wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
};