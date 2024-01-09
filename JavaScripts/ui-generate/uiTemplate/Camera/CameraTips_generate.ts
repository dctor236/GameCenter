 

 @UIBind('UI/uiTemplate/Camera/CameraTips.ui')
 export default class CameraTips_Generate extends UIScript {
     	private mText_1_Internal: mw.TextBlock
	public get mText_1(): mw.TextBlock {
		if(!this.mText_1_Internal&&this.uiWidgetBase) {
			this.mText_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1/mText_1') as mw.TextBlock
		}
		return this.mText_1_Internal
	}
	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mStaleButton_1_Internal: mw.StaleButton
	public get mStaleButton_1(): mw.StaleButton {
		if(!this.mStaleButton_1_Internal&&this.uiWidgetBase) {
			this.mStaleButton_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mStaleButton_1') as mw.StaleButton
		}
		return this.mStaleButton_1_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mStaleButton_1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mStaleButton_1");
         })
         this.mStaleButton_1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mStaleButton_1");
         })
         this.mStaleButton_1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mStaleButton_1");
         })
         this.mStaleButton_1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mStaleButton_1);
	
         //文本多语言
         this.setLanguage(this.mText_1)
	
 
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
 