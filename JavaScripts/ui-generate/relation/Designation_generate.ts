 

 @UIBind('UI/relation/Designation.ui')
 export default class Designation_Generate extends UIScript {
     	private close_Internal: mw.Button
	public get close(): mw.Button {
		if(!this.close_Internal&&this.uiWidgetBase) {
			this.close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/close') as mw.Button
		}
		return this.close_Internal
	}
	private designation_Internal: mw.TextBlock
	public get designation(): mw.TextBlock {
		if(!this.designation_Internal&&this.uiWidgetBase) {
			this.designation_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/relationInfo/designation') as mw.TextBlock
		}
		return this.designation_Internal
	}
	private remainTime_Internal: mw.TextBlock
	public get remainTime(): mw.TextBlock {
		if(!this.remainTime_Internal&&this.uiWidgetBase) {
			this.remainTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/relationInfo/remainTime') as mw.TextBlock
		}
		return this.remainTime_Internal
	}
	private transmit_Internal: mw.StaleButton
	public get transmit(): mw.StaleButton {
		if(!this.transmit_Internal&&this.uiWidgetBase) {
			this.transmit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/relationInfo/transmit') as mw.StaleButton
		}
		return this.transmit_Internal
	}
	private cancel_Internal: mw.StaleButton
	public get cancel(): mw.StaleButton {
		if(!this.cancel_Internal&&this.uiWidgetBase) {
			this.cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/relationInfo/cancel') as mw.StaleButton
		}
		return this.cancel_Internal
	}
	private relationInfo_Internal: mw.Canvas
	public get relationInfo(): mw.Canvas {
		if(!this.relationInfo_Internal&&this.uiWidgetBase) {
			this.relationInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/relationInfo') as mw.Canvas
		}
		return this.relationInfo_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.transmit.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "transmit");
         })
         this.transmit.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "transmit");
         })
         this.transmit.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "transmit");
         })
         this.transmit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.cancel.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "cancel");
         })
         this.cancel.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "cancel");
         })
         this.cancel.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "cancel");
         })
         this.cancel.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.close.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "close");
         })
         this.close.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "close");
         })
         this.close.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "close");
         })
         this.close.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.transmit);
	
         this.setLanguage(this.cancel);
	
         //文本多语言
         this.setLanguage(this.designation)
	
         this.setLanguage(this.remainTime)
	
 
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
 