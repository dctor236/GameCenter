 

 @UIBind('UI/bag/GiftItem.ui')
 export default class GiftItem_Generate extends UIScript {
     	private button_Internal: mw.Button
	public get button(): mw.Button {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button') as mw.Button
		}
		return this.button_Internal
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
	private textNum_Internal: mw.TextBlock
	public get textNum(): mw.TextBlock {
		if(!this.textNum_Internal&&this.uiWidgetBase) {
			this.textNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textNum') as mw.TextBlock
		}
		return this.textNum_Internal
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
         this.button.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "button");
         })
         this.button.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "button");
         })
         this.button.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "button");
         })
         this.button.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.textName)
	
         this.setLanguage(this.textNum)
	
 
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
 