 

 @UIBind('UI/facadModule/WearItem.ui')
 export default class WearItem_Generate extends UIScript {
     	private mImgBG_Internal: mw.Image
	public get mImgBG(): mw.Image {
		if(!this.mImgBG_Internal&&this.uiWidgetBase) {
			this.mImgBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mImgBG') as mw.Image
		}
		return this.mImgBG_Internal
	}
	private mWearImg_Internal: mw.Image
	public get mWearImg(): mw.Image {
		if(!this.mWearImg_Internal&&this.uiWidgetBase) {
			this.mWearImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mWearImg') as mw.Image
		}
		return this.mWearImg_Internal
	}
	private mPrice_Internal: mw.TextBlock
	public get mPrice(): mw.TextBlock {
		if(!this.mPrice_Internal&&this.uiWidgetBase) {
			this.mPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mPrice') as mw.TextBlock
		}
		return this.mPrice_Internal
	}
	private mGoldImg_Internal: mw.Image
	public get mGoldImg(): mw.Image {
		if(!this.mGoldImg_Internal&&this.uiWidgetBase) {
			this.mGoldImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mGoldImg') as mw.Image
		}
		return this.mGoldImg_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mGetTip_Internal: mw.TextBlock
	public get mGetTip(): mw.TextBlock {
		if(!this.mGetTip_Internal&&this.uiWidgetBase) {
			this.mGetTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mGetTip') as mw.TextBlock
		}
		return this.mGetTip_Internal
	}
	private mWearItem_Internal: mw.Canvas
	public get mWearItem(): mw.Canvas {
		if(!this.mWearItem_Internal&&this.uiWidgetBase) {
			this.mWearItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem') as mw.Canvas
		}
		return this.mWearItem_Internal
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
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mPrice)
	
         this.setLanguage(this.mGetTip)
	
 
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
 