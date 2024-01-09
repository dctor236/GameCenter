 

 @UIBind('UI/bag/GetItem.ui')
 export default class GetItem_Generate extends UIScript {
     	private mName_1_Internal: mw.TextBlock
	public get mName_1(): mw.TextBlock {
		if(!this.mName_1_Internal&&this.uiWidgetBase) {
			this.mName_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName_1') as mw.TextBlock
		}
		return this.mName_1_Internal
	}
	private mDesc_Internal: mw.TextBlock
	public get mDesc(): mw.TextBlock {
		if(!this.mDesc_Internal&&this.uiWidgetBase) {
			this.mDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDesc') as mw.TextBlock
		}
		return this.mDesc_Internal
	}
	private mAccept_Internal: mw.Button
	public get mAccept(): mw.Button {
		if(!this.mAccept_Internal&&this.uiWidgetBase) {
			this.mAccept_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAccept') as mw.Button
		}
		return this.mAccept_Internal
	}
	private canvasItems_Internal: mw.Canvas
	public get canvasItems(): mw.Canvas {
		if(!this.canvasItems_Internal&&this.uiWidgetBase) {
			this.canvasItems_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/canvasItems') as mw.Canvas
		}
		return this.canvasItems_Internal
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
         this.mAccept.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mAccept");
         })
         this.mAccept.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mAccept");
         })
         this.mAccept.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mAccept");
         })
         this.mAccept.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mName_1)
	
         this.setLanguage(this.mDesc)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mAccept/TextBlock") as mw.TextBlock);
	
 
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
 