﻿ 

 @UIBind('UI/fly/FlyEffect.ui')
 export default class FlyEffect_Generate extends UIScript {
     	private mPic_BG_Internal: mw.Image
	public get mPic_BG(): mw.Image {
		if(!this.mPic_BG_Internal&&this.uiWidgetBase) {
			this.mPic_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_BG') as mw.Image
		}
		return this.mPic_BG_Internal
	}
	private mPic_BG_1_Internal: mw.Image
	public get mPic_BG_1(): mw.Image {
		if(!this.mPic_BG_1_Internal&&this.uiWidgetBase) {
			this.mPic_BG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_BG_1') as mw.Image
		}
		return this.mPic_BG_1_Internal
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
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
 
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
 