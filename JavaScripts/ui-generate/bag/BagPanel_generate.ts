﻿ 

 @UIBind('UI/bag/BagPanel.ui')
 export default class BagPanel_Generate extends UIScript {
     	private mClose_Internal: mw.StaleButton
	public get mClose(): mw.StaleButton {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClose') as mw.StaleButton
		}
		return this.mClose_Internal
	}
	private mTypeBtn1_Internal: mw.Button
	public get mTypeBtn1(): mw.Button {
		if(!this.mTypeBtn1_Internal&&this.uiWidgetBase) {
			this.mTypeBtn1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mTagCon/mTypeBtn1') as mw.Button
		}
		return this.mTypeBtn1_Internal
	}
	private mTypeBtn2_Internal: mw.Button
	public get mTypeBtn2(): mw.Button {
		if(!this.mTypeBtn2_Internal&&this.uiWidgetBase) {
			this.mTypeBtn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mTagCon/mTypeBtn2') as mw.Button
		}
		return this.mTypeBtn2_Internal
	}
	private mTypeBtn3_Internal: mw.Button
	public get mTypeBtn3(): mw.Button {
		if(!this.mTypeBtn3_Internal&&this.uiWidgetBase) {
			this.mTypeBtn3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mTagCon/mTypeBtn3') as mw.Button
		}
		return this.mTypeBtn3_Internal
	}
	private mTypeBtn4_Internal: mw.Button
	public get mTypeBtn4(): mw.Button {
		if(!this.mTypeBtn4_Internal&&this.uiWidgetBase) {
			this.mTypeBtn4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mTagCon/mTypeBtn4') as mw.Button
		}
		return this.mTypeBtn4_Internal
	}
	private mTagCon_Internal: mw.Canvas
	public get mTagCon(): mw.Canvas {
		if(!this.mTagCon_Internal&&this.uiWidgetBase) {
			this.mTagCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mTagCon') as mw.Canvas
		}
		return this.mTagCon_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mListCon/mScroll/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mListCon/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private mListCon_Internal: mw.Canvas
	public get mListCon(): mw.Canvas {
		if(!this.mListCon_Internal&&this.uiWidgetBase) {
			this.mListCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mListCon') as mw.Canvas
		}
		return this.mListCon_Internal
	}
	private mCloseBtn_Internal: mw.StaleButton
	public get mCloseBtn(): mw.StaleButton {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon/mCloseBtn') as mw.StaleButton
		}
		return this.mCloseBtn_Internal
	}
	private mBagCon_Internal: mw.Canvas
	public get mBagCon(): mw.Canvas {
		if(!this.mBagCon_Internal&&this.uiWidgetBase) {
			this.mBagCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCon') as mw.Canvas
		}
		return this.mBagCon_Internal
	}
	private mShortcutBar_Internal: mw.Canvas
	public get mShortcutBar(): mw.Canvas {
		if(!this.mShortcutBar_Internal&&this.uiWidgetBase) {
			this.mShortcutBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBarCon/mShortcutBar') as mw.Canvas
		}
		return this.mShortcutBar_Internal
	}
	private mClear_Internal: mw.Button
	public get mClear(): mw.Button {
		if(!this.mClear_Internal&&this.uiWidgetBase) {
			this.mClear_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBarCon/mClear') as mw.Button
		}
		return this.mClear_Internal
	}
	private mHideBar_Internal: mw.Button
	public get mHideBar(): mw.Button {
		if(!this.mHideBar_Internal&&this.uiWidgetBase) {
			this.mHideBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBarCon/mHideBar') as mw.Button
		}
		return this.mHideBar_Internal
	}
	private mBarCon_Internal: mw.Canvas
	public get mBarCon(): mw.Canvas {
		if(!this.mBarCon_Internal&&this.uiWidgetBase) {
			this.mBarCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBarCon') as mw.Canvas
		}
		return this.mBarCon_Internal
	}
	private detailBG_Internal: mw.Image
	public get detailBG(): mw.Image {
		if(!this.detailBG_Internal&&this.uiWidgetBase) {
			this.detailBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/detailBG') as mw.Image
		}
		return this.detailBG_Internal
	}
	private mDetailText_Internal: mw.TextBlock
	public get mDetailText(): mw.TextBlock {
		if(!this.mDetailText_Internal&&this.uiWidgetBase) {
			this.mDetailText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailText') as mw.TextBlock
		}
		return this.mDetailText_Internal
	}
	private mDetailIcon_Internal: mw.Image
	public get mDetailIcon(): mw.Image {
		if(!this.mDetailIcon_Internal&&this.uiWidgetBase) {
			this.mDetailIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailIcon') as mw.Image
		}
		return this.mDetailIcon_Internal
	}
	private mDetailClose_Internal: mw.Button
	public get mDetailClose(): mw.Button {
		if(!this.mDetailClose_Internal&&this.uiWidgetBase) {
			this.mDetailClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailClose') as mw.Button
		}
		return this.mDetailClose_Internal
	}
	private mDetailName_Internal: mw.TextBlock
	public get mDetailName(): mw.TextBlock {
		if(!this.mDetailName_Internal&&this.uiWidgetBase) {
			this.mDetailName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailName') as mw.TextBlock
		}
		return this.mDetailName_Internal
	}
	private mDetail_Internal: mw.Canvas
	public get mDetail(): mw.Canvas {
		if(!this.mDetail_Internal&&this.uiWidgetBase) {
			this.mDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail') as mw.Canvas
		}
		return this.mDetail_Internal
	}
	private mDescName_Internal: mw.TextBlock
	public get mDescName(): mw.TextBlock {
		if(!this.mDescName_Internal&&this.uiWidgetBase) {
			this.mDescName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDescription/mDescName') as mw.TextBlock
		}
		return this.mDescName_Internal
	}
	private mDescBtn_Internal: mw.Button
	public get mDescBtn(): mw.Button {
		if(!this.mDescBtn_Internal&&this.uiWidgetBase) {
			this.mDescBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDescription/mDescBtn') as mw.Button
		}
		return this.mDescBtn_Internal
	}
	private mDescription_Internal: mw.Canvas
	public get mDescription(): mw.Canvas {
		if(!this.mDescription_Internal&&this.uiWidgetBase) {
			this.mDescription_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDescription') as mw.Canvas
		}
		return this.mDescription_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClose");
         })
         this.mClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClose");
         })
         this.mClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClose");
         })
         this.mClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mCloseBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
         })
         this.mCloseBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mCloseBtn");
         })
         this.mCloseBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mCloseBtn");
         })
         this.mCloseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.mTypeBtn1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTypeBtn1");
         })
         this.mTypeBtn1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTypeBtn1");
         })
         this.mTypeBtn1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTypeBtn1");
         })
         this.mTypeBtn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTypeBtn2.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTypeBtn2");
         })
         this.mTypeBtn2.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTypeBtn2");
         })
         this.mTypeBtn2.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTypeBtn2");
         })
         this.mTypeBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTypeBtn3.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTypeBtn3");
         })
         this.mTypeBtn3.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTypeBtn3");
         })
         this.mTypeBtn3.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTypeBtn3");
         })
         this.mTypeBtn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTypeBtn4.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTypeBtn4");
         })
         this.mTypeBtn4.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTypeBtn4");
         })
         this.mTypeBtn4.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTypeBtn4");
         })
         this.mTypeBtn4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mClear.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClear");
         })
         this.mClear.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClear");
         })
         this.mClear.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClear");
         })
         this.mClear.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
	
         this.mDetailClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mDetailClose");
         })
         this.mDetailClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mDetailClose");
         })
         this.mDetailClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mDetailClose");
         })
         this.mDetailClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mDescBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mDescBtn");
         })
         this.mDescBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mDescBtn");
         })
         this.mDescBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mDescBtn");
         })
         this.mDescBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mClose);
	
         this.setLanguage(this.mCloseBtn);
	
         //文本多语言
         this.setLanguage(this.mDetailText)
	
         this.setLanguage(this.mDetailName)
	
         this.setLanguage(this.mDescName)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBagCon/mTagCon/mTypeBtn1/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBagCon/mTagCon/mTypeBtn2/TextBlock_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBagCon/mTagCon/mTypeBtn3/TextBlock_3") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBagCon/mTagCon/mTypeBtn4/TextBlock_2") as mw.TextBlock);
	
 
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
 