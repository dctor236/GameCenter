 

 @UIBind('UI/SettingUI.ui')
 export default class SettingUI_Generate extends UIScript {
     	private mBtn_NameCard_Internal: mw.Button
	public get mBtn_NameCard(): mw.Button {
		if(!this.mBtn_NameCard_Internal&&this.uiWidgetBase) {
			this.mBtn_NameCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_NameCard') as mw.Button
		}
		return this.mBtn_NameCard_Internal
	}
	private mBtn_Graphics_Internal: mw.Button
	public get mBtn_Graphics(): mw.Button {
		if(!this.mBtn_Graphics_Internal&&this.uiWidgetBase) {
			this.mBtn_Graphics_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Graphics') as mw.Button
		}
		return this.mBtn_Graphics_Internal
	}
	private mBtn_Sound_Internal: mw.Button
	public get mBtn_Sound(): mw.Button {
		if(!this.mBtn_Sound_Internal&&this.uiWidgetBase) {
			this.mBtn_Sound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Sound') as mw.Button
		}
		return this.mBtn_Sound_Internal
	}
	private mInput_Title_Internal: mw.InputBox
	public get mInput_Title(): mw.InputBox {
		if(!this.mInput_Title_Internal&&this.uiWidgetBase) {
			this.mInput_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasNameCard/mInput_Title') as mw.InputBox
		}
		return this.mInput_Title_Internal
	}
	private mBtn_ResetTitle_Internal: mw.Button
	public get mBtn_ResetTitle(): mw.Button {
		if(!this.mBtn_ResetTitle_Internal&&this.uiWidgetBase) {
			this.mBtn_ResetTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasNameCard/mBtn_ResetTitle') as mw.Button
		}
		return this.mBtn_ResetTitle_Internal
	}
	private mBtn_EnterTitle_Internal: mw.Button
	public get mBtn_EnterTitle(): mw.Button {
		if(!this.mBtn_EnterTitle_Internal&&this.uiWidgetBase) {
			this.mBtn_EnterTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasNameCard/mBtn_EnterTitle') as mw.Button
		}
		return this.mBtn_EnterTitle_Internal
	}
	private mCanvasNameCard_Internal: mw.Canvas
	public get mCanvasNameCard(): mw.Canvas {
		if(!this.mCanvasNameCard_Internal&&this.uiWidgetBase) {
			this.mCanvasNameCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasNameCard') as mw.Canvas
		}
		return this.mCanvasNameCard_Internal
	}
	private mBar_Music_Internal: mw.ProgressBar
	public get mBar_Music(): mw.ProgressBar {
		if(!this.mBar_Music_Internal&&this.uiWidgetBase) {
			this.mBar_Music_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSound/mBar_Music') as mw.ProgressBar
		}
		return this.mBar_Music_Internal
	}
	private mBar_Sound_Internal: mw.ProgressBar
	public get mBar_Sound(): mw.ProgressBar {
		if(!this.mBar_Sound_Internal&&this.uiWidgetBase) {
			this.mBar_Sound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSound/mBar_Sound') as mw.ProgressBar
		}
		return this.mBar_Sound_Internal
	}
	private mCanvasSound_Internal: mw.Canvas
	public get mCanvasSound(): mw.Canvas {
		if(!this.mCanvasSound_Internal&&this.uiWidgetBase) {
			this.mCanvasSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSound') as mw.Canvas
		}
		return this.mCanvasSound_Internal
	}
	private mBtn_Exit_Internal: mw.Button
	public get mBtn_Exit(): mw.Button {
		if(!this.mBtn_Exit_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Exit') as mw.Button
		}
		return this.mBtn_Exit_Internal
	}
	private mBar_GraphicsLev_Internal: mw.ProgressBar
	public get mBar_GraphicsLev(): mw.ProgressBar {
		if(!this.mBar_GraphicsLev_Internal&&this.uiWidgetBase) {
			this.mBar_GraphicsLev_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics/CanvasGraphics/mBar_GraphicsLev') as mw.ProgressBar
		}
		return this.mBar_GraphicsLev_Internal
	}
	private mBtn_GrapReset_Internal: mw.StaleButton
	public get mBtn_GrapReset(): mw.StaleButton {
		if(!this.mBtn_GrapReset_Internal&&this.uiWidgetBase) {
			this.mBtn_GrapReset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics/CanvasGraphics/mBtn_GrapReset') as mw.StaleButton
		}
		return this.mBtn_GrapReset_Internal
	}
	private mBtn_GrapCancel_Internal: mw.StaleButton
	public get mBtn_GrapCancel(): mw.StaleButton {
		if(!this.mBtn_GrapCancel_Internal&&this.uiWidgetBase) {
			this.mBtn_GrapCancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics/CanvasGraphics/mBtn_GrapCancel') as mw.StaleButton
		}
		return this.mBtn_GrapCancel_Internal
	}
	private mBtn_GrapEnter_Internal: mw.StaleButton
	public get mBtn_GrapEnter(): mw.StaleButton {
		if(!this.mBtn_GrapEnter_Internal&&this.uiWidgetBase) {
			this.mBtn_GrapEnter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics/CanvasGraphics/mBtn_GrapEnter') as mw.StaleButton
		}
		return this.mBtn_GrapEnter_Internal
	}
	private mTxt_GrapLevNum_Internal: mw.TextBlock
	public get mTxt_GrapLevNum(): mw.TextBlock {
		if(!this.mTxt_GrapLevNum_Internal&&this.uiWidgetBase) {
			this.mTxt_GrapLevNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics/CanvasGraphics/mTxt_GrapLevNum') as mw.TextBlock
		}
		return this.mTxt_GrapLevNum_Internal
	}
	private mCanvasGraphics_Internal: mw.Canvas
	public get mCanvasGraphics(): mw.Canvas {
		if(!this.mCanvasGraphics_Internal&&this.uiWidgetBase) {
			this.mCanvasGraphics_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasGraphics') as mw.Canvas
		}
		return this.mCanvasGraphics_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mBtn_GrapReset.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_GrapReset");
         })
         this.mBtn_GrapReset.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_GrapReset");
         })
         this.mBtn_GrapReset.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_GrapReset");
         })
         this.mBtn_GrapReset.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_GrapCancel.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_GrapCancel");
         })
         this.mBtn_GrapCancel.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_GrapCancel");
         })
         this.mBtn_GrapCancel.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_GrapCancel");
         })
         this.mBtn_GrapCancel.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_GrapEnter.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_GrapEnter");
         })
         this.mBtn_GrapEnter.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_GrapEnter");
         })
         this.mBtn_GrapEnter.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_GrapEnter");
         })
         this.mBtn_GrapEnter.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.mBtn_NameCard.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_NameCard");
         })
         this.mBtn_NameCard.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_NameCard");
         })
         this.mBtn_NameCard.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_NameCard");
         })
         this.mBtn_NameCard.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_Graphics.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_Graphics");
         })
         this.mBtn_Graphics.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_Graphics");
         })
         this.mBtn_Graphics.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_Graphics");
         })
         this.mBtn_Graphics.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_Sound.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_Sound");
         })
         this.mBtn_Sound.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_Sound");
         })
         this.mBtn_Sound.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_Sound");
         })
         this.mBtn_Sound.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_ResetTitle.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_ResetTitle");
         })
         this.mBtn_ResetTitle.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_ResetTitle");
         })
         this.mBtn_ResetTitle.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_ResetTitle");
         })
         this.mBtn_ResetTitle.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_EnterTitle.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_EnterTitle");
         })
         this.mBtn_EnterTitle.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_EnterTitle");
         })
         this.mBtn_EnterTitle.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_EnterTitle");
         })
         this.mBtn_EnterTitle.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_Exit.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_Exit");
         })
         this.mBtn_Exit.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_Exit");
         })
         this.mBtn_Exit.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_Exit");
         })
         this.mBtn_Exit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mBtn_GrapReset);
	
         this.setLanguage(this.mBtn_GrapCancel);
	
         this.setLanguage(this.mBtn_GrapEnter);
	
         //文本多语言
         this.setLanguage(this.mTxt_GrapLevNum)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_NameCard/TextBlock_2") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Graphics/TextBlock_3") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Sound/TextBlock_4") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasNameCard/TextBlock_6") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasNameCard/mBtn_ResetTitle/TextBlock_5_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasNameCard/mBtn_EnterTitle/TextBlock_5") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSound/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasSound/TextBlock_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasGraphics/CanvasGraphics/TextBlock_7") as mw.TextBlock);
	
 
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
 