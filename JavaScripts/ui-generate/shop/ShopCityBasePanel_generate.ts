 

 @UIBind('UI/shop/ShopCityBasePanel.ui')
 export default class ShopCityBasePanel_Generate extends UIScript {
     	private mCloseTips_btn_Internal: mw.StaleButton
	public get mCloseTips_btn(): mw.StaleButton {
		if(!this.mCloseTips_btn_Internal&&this.uiWidgetBase) {
			this.mCloseTips_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mCloseTips_btn') as mw.StaleButton
		}
		return this.mCloseTips_btn_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mBgIcon_Internal: mw.Image
	public get mBgIcon(): mw.Image {
		if(!this.mBgIcon_Internal&&this.uiWidgetBase) {
			this.mBgIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/ItemIcoBox/mBgIcon') as mw.Image
		}
		return this.mBgIcon_Internal
	}
	private mTipsIco_img_Internal: mw.Image
	public get mTipsIco_img(): mw.Image {
		if(!this.mTipsIco_img_Internal&&this.uiWidgetBase) {
			this.mTipsIco_img_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/ItemIcoBox/mTipsIco_img') as mw.Image
		}
		return this.mTipsIco_img_Internal
	}
	private mTipsGoodsName_txt_Internal: mw.TextBlock
	public get mTipsGoodsName_txt(): mw.TextBlock {
		if(!this.mTipsGoodsName_txt_Internal&&this.uiWidgetBase) {
			this.mTipsGoodsName_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsGoodsName_txt') as mw.TextBlock
		}
		return this.mTipsGoodsName_txt_Internal
	}
	private mTipsHasNum_txt_Internal: mw.TextBlock
	public get mTipsHasNum_txt(): mw.TextBlock {
		if(!this.mTipsHasNum_txt_Internal&&this.uiWidgetBase) {
			this.mTipsHasNum_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsHasNum_txt') as mw.TextBlock
		}
		return this.mTipsHasNum_txt_Internal
	}
	private mTipsMsg_txt_Internal: mw.TextBlock
	public get mTipsMsg_txt(): mw.TextBlock {
		if(!this.mTipsMsg_txt_Internal&&this.uiWidgetBase) {
			this.mTipsMsg_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsMsg_txt') as mw.TextBlock
		}
		return this.mTipsMsg_txt_Internal
	}
	private mTipsBuy_btn_Internal: mw.StaleButton
	public get mTipsBuy_btn(): mw.StaleButton {
		if(!this.mTipsBuy_btn_Internal&&this.uiWidgetBase) {
			this.mTipsBuy_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/buyCanvas/mTipsBuy_btn') as mw.StaleButton
		}
		return this.mTipsBuy_btn_Internal
	}
	private mTipsBuy_txt_Internal: mw.TextBlock
	public get mTipsBuy_txt(): mw.TextBlock {
		if(!this.mTipsBuy_txt_Internal&&this.uiWidgetBase) {
			this.mTipsBuy_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/buyCanvas/mTipsBuy_txt') as mw.TextBlock
		}
		return this.mTipsBuy_txt_Internal
	}
	private buyCanvas_Internal: mw.Canvas
	public get buyCanvas(): mw.Canvas {
		if(!this.buyCanvas_Internal&&this.uiWidgetBase) {
			this.buyCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/buyCanvas') as mw.Canvas
		}
		return this.buyCanvas_Internal
	}
	private mReset_Internal: mw.StaleButton
	public get mReset(): mw.StaleButton {
		if(!this.mReset_Internal&&this.uiWidgetBase) {
			this.mReset_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/resetCanvas/mReset') as mw.StaleButton
		}
		return this.mReset_Internal
	}
	private resetCanvas_Internal: mw.Canvas
	public get resetCanvas(): mw.Canvas {
		if(!this.resetCanvas_Internal&&this.uiWidgetBase) {
			this.resetCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/resetCanvas') as mw.Canvas
		}
		return this.resetCanvas_Internal
	}
	private mTipsBuy_txt_1_Internal: mw.TextBlock
	public get mTipsBuy_txt_1(): mw.TextBlock {
		if(!this.mTipsBuy_txt_1_Internal&&this.uiWidgetBase) {
			this.mTipsBuy_txt_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/tryCanvas/mTipsBuy_txt_1') as mw.TextBlock
		}
		return this.mTipsBuy_txt_1_Internal
	}
	private mTry_Internal: mw.StaleButton
	public get mTry(): mw.StaleButton {
		if(!this.mTry_Internal&&this.uiWidgetBase) {
			this.mTry_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/tryCanvas/mTry') as mw.StaleButton
		}
		return this.mTry_Internal
	}
	private tryCanvas_Internal: mw.Canvas
	public get tryCanvas(): mw.Canvas {
		if(!this.tryCanvas_Internal&&this.uiWidgetBase) {
			this.tryCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom/tryCanvas') as mw.Canvas
		}
		return this.tryCanvas_Internal
	}
	private mTipsBottom_Internal: mw.Canvas
	public get mTipsBottom(): mw.Canvas {
		if(!this.mTipsBottom_Internal&&this.uiWidgetBase) {
			this.mTipsBottom_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/Info/mTipsBottom') as mw.Canvas
		}
		return this.mTipsBottom_Internal
	}
	private mTips_Internal: mw.Canvas
	public get mTips(): mw.Canvas {
		if(!this.mTips_Internal&&this.uiWidgetBase) {
			this.mTips_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips') as mw.Canvas
		}
		return this.mTips_Internal
	}
	private mClose_btn_Internal: mw.StaleButton
	public get mClose_btn(): mw.StaleButton {
		if(!this.mClose_btn_Internal&&this.uiWidgetBase) {
			this.mClose_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mClose_btn') as mw.StaleButton
		}
		return this.mClose_btn_Internal
	}
	private mMoneyTex1_Internal: mw.TextBlock
	public get mMoneyTex1(): mw.TextBlock {
		if(!this.mMoneyTex1_Internal&&this.uiWidgetBase) {
			this.mMoneyTex1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mMoneyState/Item1/mMoneyTex1') as mw.TextBlock
		}
		return this.mMoneyTex1_Internal
	}
	private mMoneyState_Internal: mw.Canvas
	public get mMoneyState(): mw.Canvas {
		if(!this.mMoneyState_Internal&&this.uiWidgetBase) {
			this.mMoneyState_Internal = this.uiWidgetBase.findChildByPath('Canvas/mMoneyState') as mw.Canvas
		}
		return this.mMoneyState_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mCloseTips_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mCloseTips_btn");
         })
         this.mCloseTips_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mCloseTips_btn");
         })
         this.mCloseTips_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mCloseTips_btn");
         })
         this.mCloseTips_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTipsBuy_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTipsBuy_btn");
         })
         this.mTipsBuy_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTipsBuy_btn");
         })
         this.mTipsBuy_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTipsBuy_btn");
         })
         this.mTipsBuy_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mReset.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mReset");
         })
         this.mReset.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mReset");
         })
         this.mReset.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mReset");
         })
         this.mReset.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTry.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTry");
         })
         this.mTry.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTry");
         })
         this.mTry.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTry");
         })
         this.mTry.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mClose_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClose_btn");
         })
         this.mClose_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClose_btn");
         })
         this.mClose_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClose_btn");
         })
         this.mClose_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mCloseTips_btn);
	
         this.setLanguage(this.mTipsBuy_btn);
	
         this.setLanguage(this.mReset);
	
         this.setLanguage(this.mTry);
	
         this.setLanguage(this.mClose_btn);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mMoneyState/Item1/Butn1") as mw.StaleButton);
	
         //文本多语言
         this.setLanguage(this.mTipsGoodsName_txt)
	
         this.setLanguage(this.mTipsHasNum_txt)
	
         this.setLanguage(this.mTipsMsg_txt)
	
         this.setLanguage(this.mTipsBuy_txt)
	
         this.setLanguage(this.mTipsBuy_txt_1)
	
         this.setLanguage(this.mMoneyTex1)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTips/Info/mTipsBottom/resetCanvas/ReturnTex") as mw.TextBlock);
	
 
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
 