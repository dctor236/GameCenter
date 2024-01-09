 

 @UIBind('UI/relation/Relationship.ui')
 export default class Relationship_Generate extends UIScript {
     	private close_Internal: mw.Button
	public get close(): mw.Button {
		if(!this.close_Internal&&this.uiWidgetBase) {
			this.close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/close') as mw.Button
		}
		return this.close_Internal
	}
	private selfBg_Internal: mw.Image
	public get selfBg(): mw.Image {
		if(!this.selfBg_Internal&&this.uiWidgetBase) {
			this.selfBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/selfBg') as mw.Image
		}
		return this.selfBg_Internal
	}
	private selfInput_Internal: mw.InputBox
	public get selfInput(): mw.InputBox {
		if(!this.selfInput_Internal&&this.uiWidgetBase) {
			this.selfInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/selfInput') as mw.InputBox
		}
		return this.selfInput_Internal
	}
	private selfText_Internal: mw.TextBlock
	public get selfText(): mw.TextBlock {
		if(!this.selfText_Internal&&this.uiWidgetBase) {
			this.selfText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/selfText') as mw.TextBlock
		}
		return this.selfText_Internal
	}
	private otherBg_Internal: mw.Image
	public get otherBg(): mw.Image {
		if(!this.otherBg_Internal&&this.uiWidgetBase) {
			this.otherBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/otherBg') as mw.Image
		}
		return this.otherBg_Internal
	}
	private otherInput_Internal: mw.InputBox
	public get otherInput(): mw.InputBox {
		if(!this.otherInput_Internal&&this.uiWidgetBase) {
			this.otherInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/otherInput') as mw.InputBox
		}
		return this.otherInput_Internal
	}
	private otherText_Internal: mw.TextBlock
	public get otherText(): mw.TextBlock {
		if(!this.otherText_Internal&&this.uiWidgetBase) {
			this.otherText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/otherText') as mw.TextBlock
		}
		return this.otherText_Internal
	}
	private sure_Internal: mw.StaleButton
	public get sure(): mw.StaleButton {
		if(!this.sure_Internal&&this.uiWidgetBase) {
			this.sure_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/sure') as mw.StaleButton
		}
		return this.sure_Internal
	}
	private clear_Internal: mw.StaleButton
	public get clear(): mw.StaleButton {
		if(!this.clear_Internal&&this.uiWidgetBase) {
			this.clear_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/clear') as mw.StaleButton
		}
		return this.clear_Internal
	}
	private select_Internal: mw.StaleButton
	public get select(): mw.StaleButton {
		if(!this.select_Internal&&this.uiWidgetBase) {
			this.select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/select') as mw.StaleButton
		}
		return this.select_Internal
	}
	private cancel_Internal: mw.StaleButton
	public get cancel(): mw.StaleButton {
		if(!this.cancel_Internal&&this.uiWidgetBase) {
			this.cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation/cancel') as mw.StaleButton
		}
		return this.cancel_Internal
	}
	private setDesignation_Internal: mw.Canvas
	public get setDesignation(): mw.Canvas {
		if(!this.setDesignation_Internal&&this.uiWidgetBase) {
			this.setDesignation_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/setDesignation') as mw.Canvas
		}
		return this.setDesignation_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectPlayer/mScroll/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectPlayer/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private selectPlayer_Internal: mw.Canvas
	public get selectPlayer(): mw.Canvas {
		if(!this.selectPlayer_Internal&&this.uiWidgetBase) {
			this.selectPlayer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectPlayer') as mw.Canvas
		}
		return this.selectPlayer_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.sure.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "sure");
         })
         this.sure.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "sure");
         })
         this.sure.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "sure");
         })
         this.sure.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.clear.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "clear");
         })
         this.clear.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "clear");
         })
         this.clear.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "clear");
         })
         this.clear.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.select.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "select");
         })
         this.select.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "select");
         })
         this.select.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "select");
         })
         this.select.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.cancel.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "cancel");
         })
         this.cancel.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "cancel");
         })
         this.cancel.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "cancel");
         })
         this.cancel.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.close.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "close");
         })
         this.close.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "close");
         })
         this.close.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "close");
         })
         this.close.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.sure);
	
         this.setLanguage(this.clear);
	
         this.setLanguage(this.select);
	
         this.setLanguage(this.cancel);
	
         //文本多语言
         this.setLanguage(this.selfText)
	
         this.setLanguage(this.otherText)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/setDesignation/Title") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/setDesignation/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/setDesignation/TextBlock_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/selectPlayer/TextBlock_2") as mw.TextBlock);
	
 
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
 