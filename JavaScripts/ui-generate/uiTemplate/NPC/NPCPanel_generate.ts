 

 @UIBind('UI/uiTemplate/NPC/NPCPanel.ui')
 export default class NPCPanel_Generate extends UIScript {
     	private click_Internal: mw.Button
	public get click(): mw.Button {
		if(!this.click_Internal&&this.uiWidgetBase) {
			this.click_Internal = this.uiWidgetBase.findChildByPath('Canvas/talkCanvas/click') as mw.Button
		}
		return this.click_Internal
	}
	private talkTxt_Internal: mw.TextBlock
	public get talkTxt(): mw.TextBlock {
		if(!this.talkTxt_Internal&&this.uiWidgetBase) {
			this.talkTxt_Internal = this.uiWidgetBase.findChildByPath('Canvas/talkCanvas/talkTxt') as mw.TextBlock
		}
		return this.talkTxt_Internal
	}
	private mGoodWillTxt_Internal: mw.TextBlock
	public get mGoodWillTxt(): mw.TextBlock {
		if(!this.mGoodWillTxt_Internal&&this.uiWidgetBase) {
			this.mGoodWillTxt_Internal = this.uiWidgetBase.findChildByPath('Canvas/talkCanvas/mGoodWillTxt') as mw.TextBlock
		}
		return this.mGoodWillTxt_Internal
	}
	private talkCanvas_Internal: mw.Canvas
	public get talkCanvas(): mw.Canvas {
		if(!this.talkCanvas_Internal&&this.uiWidgetBase) {
			this.talkCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/talkCanvas') as mw.Canvas
		}
		return this.talkCanvas_Internal
	}
	private guideBtn_Internal: mw.Button
	public get guideBtn(): mw.Button {
		if(!this.guideBtn_Internal&&this.uiWidgetBase) {
			this.guideBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/guideBtn') as mw.Button
		}
		return this.guideBtn_Internal
	}
	private mBtnCon_Internal: mw.Canvas
	public get mBtnCon(): mw.Canvas {
		if(!this.mBtnCon_Internal&&this.uiWidgetBase) {
			this.mBtnCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/scroll/mBtnCon') as mw.Canvas
		}
		return this.mBtnCon_Internal
	}
	private scroll_Internal: mw.ScrollBox
	public get scroll(): mw.ScrollBox {
		if(!this.scroll_Internal&&this.uiWidgetBase) {
			this.scroll_Internal = this.uiWidgetBase.findChildByPath('Canvas/scroll') as mw.ScrollBox
		}
		return this.scroll_Internal
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
         this.click.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "click");
         })
         this.click.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "click");
         })
         this.click.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "click");
         })
         this.click.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.guideBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "guideBtn");
         })
         this.guideBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "guideBtn");
         })
         this.guideBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "guideBtn");
         })
         this.guideBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.talkTxt)
	
         this.setLanguage(this.mGoodWillTxt)
	
 
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
 