 

 @UIBind('UI/uiTemplate/Camera/SettingItem.ui')
 export default class SettingItem_Generate extends UIScript {
     	private mButton_1_Internal: mw.StaleButton
	public get mButton_1(): mw.StaleButton {
		if(!this.mButton_1_Internal&&this.uiWidgetBase) {
			this.mButton_1_Internal = this.uiWidgetBase.findChildByPath('mCanvas/mButton_1') as mw.StaleButton
		}
		return this.mButton_1_Internal
	}
	private mPic_Choose_Internal: mw.Image
	public get mPic_Choose(): mw.Image {
		if(!this.mPic_Choose_Internal&&this.uiWidgetBase) {
			this.mPic_Choose_Internal = this.uiWidgetBase.findChildByPath('mCanvas/mPic_Choose') as mw.Image
		}
		return this.mPic_Choose_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mButton_1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_1");
         })
         this.mButton_1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_1");
         })
         this.mButton_1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_1");
         })
         this.mButton_1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mButton_1);
	
         //文本多语言
 
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
 