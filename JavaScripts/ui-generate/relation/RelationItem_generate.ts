﻿ 

 @UIBind('UI/relation/RelationItem.ui')
 export default class RelationItem_Generate extends UIScript {
     	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private sureBtn_Internal: mw.StaleButton
	public get sureBtn(): mw.StaleButton {
		if(!this.sureBtn_Internal&&this.uiWidgetBase) {
			this.sureBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/sureBtn') as mw.StaleButton
		}
		return this.sureBtn_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.sureBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "sureBtn");
         })
         this.sureBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "sureBtn");
         })
         this.sureBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "sureBtn");
         })
         this.sureBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.sureBtn);
	
         //文本多语言
         this.setLanguage(this.name)
	
 
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
 