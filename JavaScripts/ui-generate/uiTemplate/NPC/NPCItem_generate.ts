 

 @UIBind('UI/uiTemplate/NPC/NPCItem.ui')
 export default class NPCItem_Generate extends UIScript {
     	private btn_Internal: mw.StaleButton
	public get btn(): mw.StaleButton {
		if(!this.btn_Internal&&this.uiWidgetBase) {
			this.btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn') as mw.StaleButton
		}
		return this.btn_Internal
	}
	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('Canvas/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private select_Internal: mw.Image
	public get select(): mw.Image {
		if(!this.select_Internal&&this.uiWidgetBase) {
			this.select_Internal = this.uiWidgetBase.findChildByPath('Canvas/select') as mw.Image
		}
		return this.select_Internal
	}
	private des_Internal: mw.TextBlock
	public get des(): mw.TextBlock {
		if(!this.des_Internal&&this.uiWidgetBase) {
			this.des_Internal = this.uiWidgetBase.findChildByPath('Canvas/des') as mw.TextBlock
		}
		return this.des_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn");
         })
         this.btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn");
         })
         this.btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn");
         })
         this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.btn);
	
         //文本多语言
         this.setLanguage(this.des)
	
 
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
 