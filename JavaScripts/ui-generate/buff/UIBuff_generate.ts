﻿ 

 @UIBind('UI/buff/UIBuff.ui')
 export default class UIBuff_Generate extends UIScript {
     	private dynamicBg_Internal: mw.Image
	public get dynamicBg(): mw.Image {
		if(!this.dynamicBg_Internal&&this.uiWidgetBase) {
			this.dynamicBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/dynamicBg') as mw.Image
		}
		return this.dynamicBg_Internal
	}
	private dynamicTip_Internal: mw.TextBlock
	public get dynamicTip(): mw.TextBlock {
		if(!this.dynamicTip_Internal&&this.uiWidgetBase) {
			this.dynamicTip_Internal = this.uiWidgetBase.findChildByPath('Canvas/dynamicTip') as mw.TextBlock
		}
		return this.dynamicTip_Internal
	}
	private dynamicInfo_Internal: mw.TextBlock
	public get dynamicInfo(): mw.TextBlock {
		if(!this.dynamicInfo_Internal&&this.uiWidgetBase) {
			this.dynamicInfo_Internal = this.uiWidgetBase.findChildByPath('Canvas/dynamicInfo') as mw.TextBlock
		}
		return this.dynamicInfo_Internal
	}
	private tip_Internal: mw.TextBlock
	public get tip(): mw.TextBlock {
		if(!this.tip_Internal&&this.uiWidgetBase) {
			this.tip_Internal = this.uiWidgetBase.findChildByPath('Canvas/tip') as mw.TextBlock
		}
		return this.tip_Internal
	}
	private inputBox_Internal: mw.InputBox
	public get inputBox(): mw.InputBox {
		if(!this.inputBox_Internal&&this.uiWidgetBase) {
			this.inputBox_Internal = this.uiWidgetBase.findChildByPath('Canvas/inputBox') as mw.InputBox
		}
		return this.inputBox_Internal
	}
	private btn_Spawn_Internal: mw.StaleButton
	public get btn_Spawn(): mw.StaleButton {
		if(!this.btn_Spawn_Internal&&this.uiWidgetBase) {
			this.btn_Spawn_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn_Spawn') as mw.StaleButton
		}
		return this.btn_Spawn_Internal
	}
	private btn_close_Internal: mw.StaleButton
	public get btn_close(): mw.StaleButton {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn_close') as mw.StaleButton
		}
		return this.btn_close_Internal
	}
	private btn_open_Internal: mw.StaleButton
	public get btn_open(): mw.StaleButton {
		if(!this.btn_open_Internal&&this.uiWidgetBase) {
			this.btn_open_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn_open') as mw.StaleButton
		}
		return this.btn_open_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.btn_Spawn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_Spawn");
         })
         this.btn_Spawn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_Spawn");
         })
         this.btn_Spawn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_Spawn");
         })
         this.btn_Spawn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn_close.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_close");
         })
         this.btn_close.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_close");
         })
         this.btn_close.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_close");
         })
         this.btn_close.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn_open.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_open");
         })
         this.btn_open.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_open");
         })
         this.btn_open.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_open");
         })
         this.btn_open.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.btn_Spawn);
	
         this.setLanguage(this.btn_close);
	
         this.setLanguage(this.btn_open);
	
         //文本多语言
         this.setLanguage(this.dynamicTip)
	
         this.setLanguage(this.dynamicInfo)
	
         this.setLanguage(this.tip)
	
 
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
 