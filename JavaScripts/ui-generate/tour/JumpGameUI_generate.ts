 

 @UIBind('UI/tour/JumpGameUI.ui')
 export default class JumpGameUI_Generate extends UIScript {
     	private imageBG_Internal: mw.Image
	public get imageBG(): mw.Image {
		if(!this.imageBG_Internal&&this.uiWidgetBase) {
			this.imageBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imageBG') as mw.Image
		}
		return this.imageBG_Internal
	}
	private buttonYes_Internal: mw.StaleButton
	public get buttonYes(): mw.StaleButton {
		if(!this.buttonYes_Internal&&this.uiWidgetBase) {
			this.buttonYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonYes') as mw.StaleButton
		}
		return this.buttonYes_Internal
	}
	private buttonNo_Internal: mw.StaleButton
	public get buttonNo(): mw.StaleButton {
		if(!this.buttonNo_Internal&&this.uiWidgetBase) {
			this.buttonNo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonNo') as mw.StaleButton
		}
		return this.buttonNo_Internal
	}
	private text_Internal: mw.TextBlock
	public get text(): mw.TextBlock {
		if(!this.text_Internal&&this.uiWidgetBase) {
			this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text') as mw.TextBlock
		}
		return this.text_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.buttonYes.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "buttonYes");
         })
         this.buttonYes.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "buttonYes");
         })
         this.buttonYes.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "buttonYes");
         })
         this.buttonYes.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.buttonNo.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "buttonNo");
         })
         this.buttonNo.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "buttonNo");
         })
         this.buttonNo.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "buttonNo");
         })
         this.buttonNo.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.buttonYes);
	
         this.setLanguage(this.buttonNo);
	
         //文本多语言
         this.setLanguage(this.text)
	
 
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
 