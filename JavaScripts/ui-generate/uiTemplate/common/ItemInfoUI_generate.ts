 

 @UIBind('UI/uiTemplate/common/ItemInfoUI.ui')
 export default class ItemInfoUI_Generate extends UIScript {
     	private buttonExit_Internal: mw.Button
	public get buttonExit(): mw.Button {
		if(!this.buttonExit_Internal&&this.uiWidgetBase) {
			this.buttonExit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonExit') as mw.Button
		}
		return this.buttonExit_Internal
	}
	private imageBG_Internal: mw.Image
	public get imageBG(): mw.Image {
		if(!this.imageBG_Internal&&this.uiWidgetBase) {
			this.imageBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imageBG') as mw.Image
		}
		return this.imageBG_Internal
	}
	private imageIcon_Internal: mw.Image
	public get imageIcon(): mw.Image {
		if(!this.imageIcon_Internal&&this.uiWidgetBase) {
			this.imageIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imageIcon') as mw.Image
		}
		return this.imageIcon_Internal
	}
	private textName_Internal: mw.TextBlock
	public get textName(): mw.TextBlock {
		if(!this.textName_Internal&&this.uiWidgetBase) {
			this.textName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textName') as mw.TextBlock
		}
		return this.textName_Internal
	}
	private textDescription_Internal: mw.TextBlock
	public get textDescription(): mw.TextBlock {
		if(!this.textDescription_Internal&&this.uiWidgetBase) {
			this.textDescription_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textDescription') as mw.TextBlock
		}
		return this.textDescription_Internal
	}
	private txtClose_Internal: mw.TextBlock
	public get txtClose(): mw.TextBlock {
		if(!this.txtClose_Internal&&this.uiWidgetBase) {
			this.txtClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtClose') as mw.TextBlock
		}
		return this.txtClose_Internal
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
         this.buttonExit.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "buttonExit");
         })
         this.buttonExit.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "buttonExit");
         })
         this.buttonExit.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "buttonExit");
         })
         this.buttonExit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.textName)
	
         this.setLanguage(this.textDescription)
	
         this.setLanguage(this.txtClose)
	
 
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
 