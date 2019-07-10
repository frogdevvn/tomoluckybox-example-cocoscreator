const GameController = cc.Class({
  extends: cc.Component,

  properties: {
    homeContainer: cc.Node,
    mainGameContainer: cc.Node,
    winGameContainer: cc.Node,
    loseGameContainer: cc.Node,

    openButton: cc.Button,
    selectedLuckyBox: cc.Node,
    arrLuckyBox: [cc.Node],
  },

  statics: {
    instance: null
  },

  onLoad() {
    GameController.instance = this;

    this.selectedLuckyBox = null;
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

  showWinGameContainer(amountWin) {
    this.mainGameContainer.active = false;
    this.winGameContainer.getComponent('WinGameContainer').show(amountWin);
  },
  
  showLoseGameContainer() {
    this.mainGameContainer.active = false;
    this.loseGameContainer.getComponent('LoseGameContainer').show();
  },

  unselectAllLuckyBox() {
    this.arrLuckyBox.forEach(luckyBox => {
      luckyBox.getComponent("LuckyBox").unselect();
    });
    this.selectedLuckyBox = null;
  },

  setEnableOpenButton(value) {
    this.openButton.interactable = value;
  },

  setSelectedLuckyBox(luckyBox) {
    this.selectedLuckyBox = luckyBox;
    luckyBox.getComponent("LuckyBox").select();
    this.arrLuckyBox.forEach(luckyBox => {
      if (luckyBox != this.selectedLuckyBox)
        luckyBox.getComponent("LuckyBox").unselect();
    });
  }
});
