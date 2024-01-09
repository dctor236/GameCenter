 

 @UIBind('UI/relation/RelationInteract.ui')
 export default class RelationInteract_Generate extends UIScript {
     	private bg_1_Internal: mw.Image
	public get bg_1(): mw.Image {
		if(!this.bg_1_Internal&&this.uiWidgetBase) {
			this.bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg_1') as mw.Image
		}
		return this.bg_1_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private textBg_Internal: mw.Image
	public get textBg(): mw.Image {
		if(!this.textBg_Internal&&this.uiWidgetBase) {
			this.textBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textBg') as mw.Image
		}
		return this.textBg_Internal
	}
	private desc_Internal: mw.TextBlock
	public get desc(): mw.TextBlock {
		if(!this.desc_Internal&&this.uiWidgetBase) {
			this.desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/desc') as mw.TextBlock
		}
		return this.desc_Internal
	}
	private accept_Internal: mw.StaleButton
	public get accept(): mw.StaleButton {
		if(!this.accept_Internal&&this.uiWidgetBase) {
			this.accept_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/accept') as mw.StaleButton
		}
		return this.accept_Internal
	}
	private refuse_Internal: mw.StaleButton
	public get refuse(): mw.StaleButton {
		if(!this.refuse_Internal&&this.uiWidgetBase) {
			this.refuse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/refuse') as mw.StaleButton
		}
		return this.refuse_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
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
	
         this.refuse.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "refuse");
         })
         this.refuse.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "refuse");
         })
         this.refuse.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "refuse");
         })
         this.refuse.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.accept);
	
         this.setLanguage(this.refuse);
	
         //文本多语言
         this.setLanguage(this.desc)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as mw.TextBlock);
	
 
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
 