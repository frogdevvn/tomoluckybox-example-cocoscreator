const RESULT_WIN = 1;
const RESULT_LOSE = 0;

const GameController = cc.Class({
  extends: cc.Component,

  properties: {
    homeContainer: cc.Node,
    mainGameContainer: cc.Node,
    winGameContainer: cc.Node,
    loseGameContainer: cc.Node,

    openButton: cc.Button,
    selectedLuckyBox: cc.Node,
    selectedLuckyBoxId: 0,
    arrLuckyBox: [cc.Node],
  },

  statics: {
    instance: null
  },

  onLoad() {
    GameController.instance = this;

    this.selectedLuckyBox = null;
    this.selectedLuckyBoxId = 0;
  },

  start() {

  },

  // update (dt) {},

  showHomeContainer() {
    this.homeContainer.active = true;
    this.mainGameContainer.active = false;
    this.winGameContainer.active = false;
    this.loseGameContainer.active = false;
  },

  showMainGameContainer() {
    this.mainGameContainer.active = true;
    this.homeContainer.active = false;
  },

  showWinGameContainer(amountPrize) {
    this.mainGameContainer.active = false;
    this.winGameContainer.getComponent('WinGameContainer').show(amountPrize);
  },
  
  showLoseGameContainer() {
    this.mainGameContainer.active = false;
    this.loseGameContainer.getComponent('LoseGameContainer').show();
  },

  showResultOpenLuckyBox(result, amountPrize) {
    if(result == RESULT_WIN) {
      this.showWinGameContainer(amountPrize);
    }
    else {
      this.showLoseGameContainer();
    }
  },

  unselectAllLuckyBox() {
    this.arrLuckyBox.forEach(luckyBox => {
      luckyBox.getComponent("LuckyBox").unselect();
    });
    this.selectedLuckyBox = null;
    this.selectedLuckyBoxId = 0;
  },

  setEnableOpenButton(value) {
    this.openButton.interactable = value;
  },

  setSelectedLuckyBox(luckyBox, luckyBoxid) {
    this.selectedLuckyBox = luckyBox;
    this.selectedLuckyBoxId = luckyBoxid;
    luckyBox.getComponent("LuckyBox").select();
    this.arrLuckyBox.forEach(luckyBox => {
      if (luckyBox != this.selectedLuckyBox)
        luckyBox.getComponent("LuckyBox").unselect();
    });
  }
});
