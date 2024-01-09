 

 @UIBind('UI/bag/BagHub.ui')
 export default class BagHub_Generate extends UIScript {
     	private mShortcutBar_Internal: mw.Canvas
	public get mShortcutBar(): mw.Canvas {
		if(!this.mShortcutBar_Internal&&this.uiWidgetBase) {
			this.mShortcutBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContent/mBarCon/mShortcutBar') as mw.Canvas
		}
		return this.mShortcutBar_Internal
	}
	private mClearBar_Internal: mw.Button
	public get mClearBar(): mw.Button {
		if(!this.mClearBar_Internal&&this.uiWidgetBase) {
			this.mClearBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContent/mBarCon/mClearBar') as mw.Button
		}
		return this.mClearBar_Internal
	}
	private mBarCon_Internal: mw.Canvas
	public get mBarCon(): mw.Canvas {
		if(!this.mBarCon_Internal&&this.uiWidgetBase) {
			this.mBarCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContent/mBarCon') as mw.Canvas
		}
		return this.mBarCon_Internal
	}
	private mHideBar_Internal: mw.Button
	public get mHideBar(): mw.Button {
		if(!this.mHideBar_Internal&&this.uiWidgetBase) {
			this.mHideBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContent/mHideBar') as mw.Button
		}
		return this.mHideBar_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mFlyHalo_Internal: mw.Image
	public get mFlyHalo(): mw.Image {
		if(!this.mFlyHalo_Internal&&this.uiWidgetBase) {
			this.mFlyHalo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFlyCon/mFlyHalo') as mw.Image
		}
		return this.mFlyHalo_Internal
	}
	private mFly_Internal: mw.Image
	public get mFly(): mw.Image {
		if(!this.mFly_Internal&&this.uiWidgetBase) {
			this.mFly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFlyCon/mFly') as mw.Image
		}
		return this.mFly_Internal
	}
	private mFlyCon_Internal: mw.Canvas
	public get mFlyCon(): mw.Canvas {
		if(!this.mFlyCon_Internal&&this.uiWidgetBase) {
			this.mFlyCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFlyCon') as mw.Canvas
		}
		return this.mFlyCon_Internal
	}
	private mGuideBtn_Internal: mw.Button
	public get mGuideBtn(): mw.Button {
		if(!this.mGuideBtn_Internal&&this.uiWidgetBase) {
			this.mGuideBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuideBtn') as mw.Button
		}
		return this.mGuideBtn_Internal
	}
	private guideBtn_Internal: mw.Button
	public get guideBtn(): mw.Button {
		if(!this.guideBtn_Internal&&this.uiWidgetBase) {
			this.guideBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/guideBtn') as mw.Button
		}
		return this.guideBtn_Internal
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
         this.mClearBar.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClearBar");
         })
         this.mClearBar.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClearBar");
         })
         this.mClearBar.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClearBar");
         })
         this.mClearBar.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mHideBar.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mHideBar");
         })
         this.mHideBar.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mHideBar");
         })
         this.mHideBar.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mHideBar");
         })
         this.mHideBar.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mGuideBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mGuideBtn");
         })
         this.mGuideBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mGuideBtn");
         })
         this.mGuideBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mGuideBtn");
         })
         this.mGuideBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
 