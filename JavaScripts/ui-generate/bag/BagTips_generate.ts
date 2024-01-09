 

 @UIBind('UI/bag/BagTips.ui')
 export default class BagTips_Generate extends UIScript {
     	private close_Internal: mw.Button
	public get close(): mw.Button {
		if(!this.close_Internal&&this.uiWidgetBase) {
			this.close_Internal = this.uiWidgetBase.findChildByPath('Canvas/close') as mw.Button
		}
		return this.close_Internal
	}
	private mDescText_Internal: mw.TextBlock
	public get mDescText(): mw.TextBlock {
		if(!this.mDescText_Internal&&this.uiWidgetBase) {
			this.mDescText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDescription/mDescText') as mw.TextBlock
		}
		return this.mDescText_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDescription/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDescription/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private nameText_Internal: mw.TextBlock
	public get nameText(): mw.TextBlock {
		if(!this.nameText_Internal&&this.uiWidgetBase) {
			this.nameText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDescription/nameText') as mw.TextBlock
		}
		return this.nameText_Internal
	}
	private mDescription_Internal: mw.Canvas
	public get mDescription(): mw.Canvas {
		if(!this.mDescription_Internal&&this.uiWidgetBase) {
			this.mDescription_Internal = this.uiWidgetBase.findChildByPath('Canvas/mDescription') as mw.Canvas
		}
		return this.mDescription_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
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
	
         this.closeBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "closeBtn");
         })
         this.closeBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "closeBtn");
         })
         this.closeBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "closeBtn");
         })
         this.closeBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mDescText)
	
         this.setLanguage(this.nameText)
	
 
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
 