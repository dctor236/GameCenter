 

 @UIBind('UI/beautybattle/UIShop.ui')
 export default class UIShop_Generate extends UIScript {
     	private totalcoin_Internal: mw.Image
	public get totalcoin(): mw.Image {
		if(!this.totalcoin_Internal&&this.uiWidgetBase) {
			this.totalcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/totalcoin') as mw.Image
		}
		return this.totalcoin_Internal
	}
	private totalcoinnum_Internal: mw.TextBlock
	public get totalcoinnum(): mw.TextBlock {
		if(!this.totalcoinnum_Internal&&this.uiWidgetBase) {
			this.totalcoinnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/totalcoinnum') as mw.TextBlock
		}
		return this.totalcoinnum_Internal
	}
	private shopClose_Internal: mw.Button
	public get shopClose(): mw.Button {
		if(!this.shopClose_Internal&&this.uiWidgetBase) {
			this.shopClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/shopClose') as mw.Button
		}
		return this.shopClose_Internal
	}
	private characterModel_Internal: mw.Image
	public get characterModel(): mw.Image {
		if(!this.characterModel_Internal&&this.uiWidgetBase) {
			this.characterModel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/characterModel') as mw.Image
		}
		return this.characterModel_Internal
	}
	private check_Internal: mw.StaleButton
	public get check(): mw.StaleButton {
		if(!this.check_Internal&&this.uiWidgetBase) {
			this.check_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/check') as mw.StaleButton
		}
		return this.check_Internal
	}
	private checkpic_Internal: mw.Image
	public get checkpic(): mw.Image {
		if(!this.checkpic_Internal&&this.uiWidgetBase) {
			this.checkpic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainUI/checkpic') as mw.Image
		}
		return this.checkpic_Internal
	}
	private goodBackgroundcolor_Internal: mw.Image
	public get goodBackgroundcolor(): mw.Image {
		if(!this.goodBackgroundcolor_Internal&&this.uiWidgetBase) {
			this.goodBackgroundcolor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodBackgroundcolor') as mw.Image
		}
		return this.goodBackgroundcolor_Internal
	}
	private goodQualitycolor_Internal: mw.Image
	public get goodQualitycolor(): mw.Image {
		if(!this.goodQualitycolor_Internal&&this.uiWidgetBase) {
			this.goodQualitycolor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodQualitycolor') as mw.Image
		}
		return this.goodQualitycolor_Internal
	}
	private goodIcon_Internal: mw.Image
	public get goodIcon(): mw.Image {
		if(!this.goodIcon_Internal&&this.uiWidgetBase) {
			this.goodIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodIcon') as mw.Image
		}
		return this.goodIcon_Internal
	}
	private goodName_Internal: mw.TextBlock
	public get goodName(): mw.TextBlock {
		if(!this.goodName_Internal&&this.uiWidgetBase) {
			this.goodName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodName') as mw.TextBlock
		}
		return this.goodName_Internal
	}
	private goodDescription_Internal: mw.TextBlock
	public get goodDescription(): mw.TextBlock {
		if(!this.goodDescription_Internal&&this.uiWidgetBase) {
			this.goodDescription_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodDescription') as mw.TextBlock
		}
		return this.goodDescription_Internal
	}
	private goodLessNumber_Internal: mw.TextBlock
	public get goodLessNumber(): mw.TextBlock {
		if(!this.goodLessNumber_Internal&&this.uiWidgetBase) {
			this.goodLessNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/goodLessNumber') as mw.TextBlock
		}
		return this.goodLessNumber_Internal
	}
	private buttonBackground_Internal: mw.StaleButton
	public get buttonBackground(): mw.StaleButton {
		if(!this.buttonBackground_Internal&&this.uiWidgetBase) {
			this.buttonBackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton/buttonBackground') as mw.StaleButton
		}
		return this.buttonBackground_Internal
	}
	private coin_Internal: mw.Image
	public get coin(): mw.Image {
		if(!this.coin_Internal&&this.uiWidgetBase) {
			this.coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton/coin') as mw.Image
		}
		return this.coin_Internal
	}
	private pruchaseButton_Internal: mw.Canvas
	public get pruchaseButton(): mw.Canvas {
		if(!this.pruchaseButton_Internal&&this.uiWidgetBase) {
			this.pruchaseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1/pruchaseButton') as mw.Canvas
		}
		return this.pruchaseButton_Internal
	}
	private good1_Internal: mw.Canvas
	public get good1(): mw.Canvas {
		if(!this.good1_Internal&&this.uiWidgetBase) {
			this.good1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition/good1') as mw.Canvas
		}
		return this.good1_Internal
	}
	private goodexhibition_Internal: mw.Canvas
	public get goodexhibition(): mw.Canvas {
		if(!this.goodexhibition_Internal&&this.uiWidgetBase) {
			this.goodexhibition_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea/goodexhibition') as mw.Canvas
		}
		return this.goodexhibition_Internal
	}
	private goodsrollarea_Internal: mw.ScrollBox
	public get goodsrollarea(): mw.ScrollBox {
		if(!this.goodsrollarea_Internal&&this.uiWidgetBase) {
			this.goodsrollarea_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/goodsrollarea') as mw.ScrollBox
		}
		return this.goodsrollarea_Internal
	}
	private listbackground_Internal: mw.Image
	public get listbackground(): mw.Image {
		if(!this.listbackground_Internal&&this.uiWidgetBase) {
			this.listbackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/listbackground') as mw.Image
		}
		return this.listbackground_Internal
	}
	private clothclassification1_Internal: mw.StaleButton
	public get clothclassification1(): mw.StaleButton {
		if(!this.clothclassification1_Internal&&this.uiWidgetBase) {
			this.clothclassification1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/clothclassification1') as mw.StaleButton
		}
		return this.clothclassification1_Internal
	}
	private clothclassification2_Internal: mw.Image
	public get clothclassification2(): mw.Image {
		if(!this.clothclassification2_Internal&&this.uiWidgetBase) {
			this.clothclassification2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/clothclassification2') as mw.Image
		}
		return this.clothclassification2_Internal
	}
	private character_Internal: mw.TextBlock
	public get character(): mw.TextBlock {
		if(!this.character_Internal&&this.uiWidgetBase) {
			this.character_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/character') as mw.TextBlock
		}
		return this.character_Internal
	}
	private heaBarItem_Internal: mw.StaleButton
	public get heaBarItem(): mw.StaleButton {
		if(!this.heaBarItem_Internal&&this.uiWidgetBase) {
			this.heaBarItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem') as mw.StaleButton
		}
		return this.heaBarItem_Internal
	}
	private heaBarItem2_Internal: mw.StaleButton
	public get heaBarItem2(): mw.StaleButton {
		if(!this.heaBarItem2_Internal&&this.uiWidgetBase) {
			this.heaBarItem2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem2') as mw.StaleButton
		}
		return this.heaBarItem2_Internal
	}
	private heaBarItem3_Internal: mw.StaleButton
	public get heaBarItem3(): mw.StaleButton {
		if(!this.heaBarItem3_Internal&&this.uiWidgetBase) {
			this.heaBarItem3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem3') as mw.StaleButton
		}
		return this.heaBarItem3_Internal
	}
	private heaBarItem4_Internal: mw.StaleButton
	public get heaBarItem4(): mw.StaleButton {
		if(!this.heaBarItem4_Internal&&this.uiWidgetBase) {
			this.heaBarItem4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel/heaBarItem4') as mw.StaleButton
		}
		return this.heaBarItem4_Internal
	}
	private characterPanel_Internal: mw.Canvas
	public get characterPanel(): mw.Canvas {
		if(!this.characterPanel_Internal&&this.uiWidgetBase) {
			this.characterPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/characterPanel') as mw.Canvas
		}
		return this.characterPanel_Internal
	}
	private map_Internal: mw.TextBlock
	public get map(): mw.TextBlock {
		if(!this.map_Internal&&this.uiWidgetBase) {
			this.map_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2/map') as mw.TextBlock
		}
		return this.map_Internal
	}
	private themeclassification_Internal: mw.StaleButton
	public get themeclassification(): mw.StaleButton {
		if(!this.themeclassification_Internal&&this.uiWidgetBase) {
			this.themeclassification_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2/themeclassification') as mw.StaleButton
		}
		return this.themeclassification_Internal
	}
	private mapclassification2_Internal: mw.Canvas
	public get mapclassification2(): mw.Canvas {
		if(!this.mapclassification2_Internal&&this.uiWidgetBase) {
			this.mapclassification2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton/mapclassification2') as mw.Canvas
		}
		return this.mapclassification2_Internal
	}
	private clothbutton_Internal: mw.Canvas
	public get clothbutton(): mw.Canvas {
		if(!this.clothbutton_Internal&&this.uiWidgetBase) {
			this.clothbutton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel/clothbutton') as mw.Canvas
		}
		return this.clothbutton_Internal
	}
	private clothPanel_Internal: mw.Canvas
	public get clothPanel(): mw.Canvas {
		if(!this.clothPanel_Internal&&this.uiWidgetBase) {
			this.clothPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll/clothPanel') as mw.Canvas
		}
		return this.clothPanel_Internal
	}
	private shoplistroll_Internal: mw.ScrollBox
	public get shoplistroll(): mw.ScrollBox {
		if(!this.shoplistroll_Internal&&this.uiWidgetBase) {
			this.shoplistroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shoplistroll') as mw.ScrollBox
		}
		return this.shoplistroll_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.check.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "check");
         })
         this.check.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "check");
         })
         this.check.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "check");
         })
         this.check.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.buttonBackground.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "buttonBackground");
         })
         this.buttonBackground.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "buttonBackground");
         })
         this.buttonBackground.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "buttonBackground");
         })
         this.buttonBackground.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.clothclassification1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "clothclassification1");
         })
         this.clothclassification1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "clothclassification1");
         })
         this.clothclassification1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "clothclassification1");
         })
         this.clothclassification1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem");
         })
         this.heaBarItem.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem");
         })
         this.heaBarItem.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem");
         })
         this.heaBarItem.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem2.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem2");
         })
         this.heaBarItem2.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem2");
         })
         this.heaBarItem2.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem2");
         })
         this.heaBarItem2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem3.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem3");
         })
         this.heaBarItem3.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem3");
         })
         this.heaBarItem3.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem3");
         })
         this.heaBarItem3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.heaBarItem4.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "heaBarItem4");
         })
         this.heaBarItem4.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "heaBarItem4");
         })
         this.heaBarItem4.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "heaBarItem4");
         })
         this.heaBarItem4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.themeclassification.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "themeclassification");
         })
         this.themeclassification.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "themeclassification");
         })
         this.themeclassification.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "themeclassification");
         })
         this.themeclassification.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.shopClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "shopClose");
         })
         this.shopClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "shopClose");
         })
         this.shopClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "shopClose");
         })
         this.shopClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.check);
	
         this.setLanguage(this.buttonBackground);
	
         this.setLanguage(this.clothclassification1);
	
         this.setLanguage(this.heaBarItem);
	
         this.setLanguage(this.heaBarItem2);
	
         this.setLanguage(this.heaBarItem3);
	
         this.setLanguage(this.heaBarItem4);
	
         this.setLanguage(this.themeclassification);
	
         //文本多语言
         this.setLanguage(this.totalcoinnum)
	
         this.setLanguage(this.goodName)
	
         this.setLanguage(this.goodDescription)
	
         this.setLanguage(this.goodLessNumber)
	
         this.setLanguage(this.character)
	
         this.setLanguage(this.map)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MainUI/Store") as mw.TextBlock);
	
 
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
 