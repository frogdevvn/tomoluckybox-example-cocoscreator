const GameController = require('GameController');
const Utils = require('Utils');

cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad() {

  },

  start() {

  },

  // update (dt) {},

  onOpenButtonClicked() {
    let rnd = Utils.randomInt(1, 10);
    cc.log(rnd);

    if (rnd <= 5)
      GameController.instance.showWinGameContainer(10);
    else
      GameController.instance.showLoseGameContainer();

    GameController.instance.unselectAllLuckyBox();
  }
});
