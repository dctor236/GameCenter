 

 @UIBind('UI/beautybattle/UIShop.ui')
 export default class UIShop_Generate extends mw.UIScript {
     @UIWidgetBind('RootCanvas/MainUI/totalcoin')
    public totalcoin: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/MainUI/totalcoinnum')
    public totalcoinnum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/MainUI/shopClose')
    public shopClose: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/MainUI/characterModel')
    public characterModel: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/MainUI/check')
    public check: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/MainUI/checkpic')
    public checkpic: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodBackgroundcolor')
    public goodBackgroundcolor: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodQualitycolor')
    public goodQualitycolor: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodIcon')
    public goodIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodName')
    public goodName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodDescription')
    public goodDescription: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/goodLessNumber')
    public goodLessNumber: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton/buttonBackground')
    public buttonBackground: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton/coin')
    public coin: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton')
    public pruchaseButton: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition/good1')
    public good1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea/goodexhibition')
    public goodexhibition: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/goodsrollarea')
    public goodsrollarea: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/listbackground')
    public listbackground: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/clothclassification1')
    public clothclassification1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/clothclassification2')
    public clothclassification2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/character')
    public character: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem')
    public heaBarItem: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem2')
    public heaBarItem2: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem3')
    public heaBarItem3: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem4')
    public heaBarItem4: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel')
    public characterPanel: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2/map')
    public map: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2/themeclassification')
    public themeclassification: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2')
    public mapclassification2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel/clothbutton')
    public clothbutton: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll/clothPanel')
    public clothPanel: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/shoplistroll')
    public shoplistroll: mw.ScrollBox=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.check.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "check");
         })
         this.check.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "check");
         })
         this.check.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "check");
         })
         this.check.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.buttonBackground.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "buttonBackground");
         })
         this.buttonBackground.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "buttonBackground");
         })
         this.buttonBackground.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "buttonBackground");
         })
         this.buttonBackground.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.clothclassification1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "clothclassification1");
         })
         this.clothclassification1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "clothclassification1");
         })
         this.clothclassification1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "clothclassification1");
         })
         this.clothclassification1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem");
         })
         this.heaBarItem.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem");
         })
         this.heaBarItem.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem");
         })
         this.heaBarItem.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem2.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem2");
         })
         this.heaBarItem2.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem2");
         })
         this.heaBarItem2.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem2");
         })
         this.heaBarItem2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem3.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem3");
         })
         this.heaBarItem3.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem3");
         })
         this.heaBarItem3.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem3");
         })
         this.heaBarItem3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem4.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem4");
         })
         this.heaBarItem4.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem4");
         })
         this.heaBarItem4.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem4");
         })
         this.heaBarItem4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.themeclassification.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "themeclassification");
         })
         this.themeclassification.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "themeclassification");
         })
         this.themeclassification.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "themeclassification");
         })
         this.themeclassification.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.shopClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "shopClose");
         })
         this.shopClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "shopClose");
         })
         this.shopClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "shopClose");
         })
         this.shopClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.check);
	
         this.setLanguage(this.buttonBackground);
	
         this.setLanguage(this.clothclassification1);
	
         this.setLanguage(this.heaBarItem);
	
         this.setLanguage(this.heaBarItem2);
	
         this.setLanguage(this.heaBarItem3);
	
         this.setLanguage(this.heaBarItem4);
	
         this.setLanguage(this.themeclassification);
	
         //文本多语言
         this.setLanguage(this.totalcoinnum)
	
         this.setLanguage(this.goodName)
	
         this.setLanguage(this.goodDescription)
	
         this.setLanguage(this.goodLessNumber)
	
         this.setLanguage(this.character)
	
         this.setLanguage(this.map)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MainUI/Store") as mw.TextBlock);
	
 
     }
     
     private setLanguage(ui: mw.StaleButton | mw.TextBlock) {
         let call = mw.UIScript.getBehavior("lan");
         if (call && ui) {
             call(ui);
         }
     }
     
     /**
       * 设置显示时触发
       */
     public show(...params: unknown[]) {
         mw.UIService.showUI(this, this.layer, ...params)
     }
 
     /**
      * 设置不显示时触发
      */
     public hide() {
         mw.UIService.hideUI(this)
     }
 
     protected onStart(): void{};
     protected onShow(...params: any[]): void {};
     protected onHide():void{};
 
     protected onUpdate(dt: number): void {
 
     }
     /**
      * 设置ui的父节点
      * @param parent 父节点
      */
     setParent(parent: mw.Canvas){
         parent.addChild(this.uiObject)
         this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size)
     }
 }
 