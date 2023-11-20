 

 @UIBind('UI/beautybattle/battleui.ui')
 export default class battleui_Generate extends mw.UIScript {
     @UIWidgetBind('RootCanvas/characterModel')
    public characterModel: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem1')
    public barItem1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem2')
    public barItem2: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem3')
    public barItem3: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem4')
    public barItem4: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem5')
    public barItem5: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/barItem6')
    public barItem6: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/mScroll/mContent')
    public mContent: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/mScroll')
    public mScroll: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/mClose')
    public mClose: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/accept')
    public accept: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/ClothSelectCanvas/reset')
    public reset: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.barItem1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem1");
         })
         this.barItem1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem1");
         })
         this.barItem1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem1");
         })
         this.barItem1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.barItem2.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem2");
         })
         this.barItem2.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem2");
         })
         this.barItem2.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem2");
         })
         this.barItem2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.barItem3.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem3");
         })
         this.barItem3.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem3");
         })
         this.barItem3.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem3");
         })
         this.barItem3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.barItem4.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem4");
         })
         this.barItem4.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem4");
         })
         this.barItem4.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem4");
         })
         this.barItem4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.barItem5.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem5");
         })
         this.barItem5.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem5");
         })
         this.barItem5.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem5");
         })
         this.barItem5.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.barItem6.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "barItem6");
         })
         this.barItem6.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "barItem6");
         })
         this.barItem6.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "barItem6");
         })
         this.barItem6.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.accept.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "accept");
         })
         this.accept.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "accept");
         })
         this.accept.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "accept");
         })
         this.accept.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.reset.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "reset");
         })
         this.reset.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "reset");
         })
         this.reset.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "reset");
         })
         this.reset.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.mClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClose");
         })
         this.mClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClose");
         })
         this.mClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClose");
         })
         this.mClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.barItem1);
	
         this.setLanguage(this.barItem2);
	
         this.setLanguage(this.barItem3);
	
         this.setLanguage(this.barItem4);
	
         this.setLanguage(this.barItem5);
	
         this.setLanguage(this.barItem6);
	
         this.setLanguage(this.accept);
	
         this.setLanguage(this.reset);
	
         //文本多语言
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Store") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1_2") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1_1_2") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1_3") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Store_1_1_1_1") as mw.TextBlock);
	
 
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
 