 

 @UIBind('UI/shop/shopbuy.ui')
 export default class shopbuy_Generate extends mw.UIScript {
     @UIWidgetBind('RootCanvas/mClothName')
    public mClothName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtnTry')
    public mBtnTry: mw.Button=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         //按钮添加点击
         this.mBtnTry.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnTry");
         })
         this.mBtnTry.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnTry");
         })
         this.mBtnTry.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnTry");
         })
         this.mBtnTry.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mClothName)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBtnTry/TextBlock_1") as mw.TextBlock);
	
 
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
 