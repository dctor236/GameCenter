﻿ 

 @UIBind('UI/uiTemplate/common/MessageBox.ui')
 export default class MessageBox_Generate extends UIScript {
     	private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mContent_txt_Internal: mw.TextBlock
	public get mContent_txt(): mw.TextBlock {
		if(!this.mContent_txt_Internal&&this.uiWidgetBase) {
			this.mContent_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas/mContent_txt') as mw.TextBlock
		}
		return this.mContent_txt_Internal
	}
	private mYes_btn_Internal: mw.StaleButton
	public get mYes_btn(): mw.StaleButton {
		if(!this.mYes_btn_Internal&&this.uiWidgetBase) {
			this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas/mYes_btn') as mw.StaleButton
		}
		return this.mYes_btn_Internal
	}
	private mNo_btn_Internal: mw.StaleButton
	public get mNo_btn(): mw.StaleButton {
		if(!this.mNo_btn_Internal&&this.uiWidgetBase) {
			this.mNo_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas/mNo_btn') as mw.StaleButton
		}
		return this.mNo_btn_Internal
	}
	private mOK_btn_Internal: mw.StaleButton
	public get mOK_btn(): mw.StaleButton {
		if(!this.mOK_btn_Internal&&this.uiWidgetBase) {
			this.mOK_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas/mOK_btn') as mw.StaleButton
		}
		return this.mOK_btn_Internal
	}
	private mBodyCanvas_Internal: mw.Canvas
	public get mBodyCanvas(): mw.Canvas {
		if(!this.mBodyCanvas_Internal&&this.uiWidgetBase) {
			this.mBodyCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBodyCanvas') as mw.Canvas
		}
		return this.mBodyCanvas_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mYes_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
         })
         this.mYes_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mYes_btn");
         })
         this.mYes_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mYes_btn");
         })
         this.mYes_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mNo_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mNo_btn");
         })
         this.mNo_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mNo_btn");
         })
         this.mNo_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mNo_btn");
         })
         this.mNo_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mOK_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mOK_btn");
         })
         this.mOK_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mOK_btn");
         })
         this.mOK_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mOK_btn");
         })
         this.mOK_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mYes_btn);
	
         this.setLanguage(this.mNo_btn);
	
         this.setLanguage(this.mOK_btn);
	
         //文本多语言
         this.setLanguage(this.mTitle_txt)
	
         this.setLanguage(this.mContent_txt)
	
 
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
 