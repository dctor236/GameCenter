 

 @UIBind('UI/uiTemplate/UI_Travel_Window.ui')
 export default class UI_Travel_Window_Generate extends UIScript {
     	private mImg_Internal: mw.Image
	public get mImg(): mw.Image {
		if(!this.mImg_Internal&&this.uiWidgetBase) {
			this.mImg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain/mImg') as mw.Image
		}
		return this.mImg_Internal
	}
	private mTitleImg_Internal: mw.Image
	public get mTitleImg(): mw.Image {
		if(!this.mTitleImg_Internal&&this.uiWidgetBase) {
			this.mTitleImg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain/mTitleImg') as mw.Image
		}
		return this.mTitleImg_Internal
	}
	private mBtnBack_Internal: mw.Button
	public get mBtnBack(): mw.Button {
		if(!this.mBtnBack_Internal&&this.uiWidgetBase) {
			this.mBtnBack_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain/mBtnBack') as mw.Button
		}
		return this.mBtnBack_Internal
	}
	private mBTnJoin_Internal: mw.Button
	public get mBTnJoin(): mw.Button {
		if(!this.mBTnJoin_Internal&&this.uiWidgetBase) {
			this.mBTnJoin_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain/mBTnJoin') as mw.Button
		}
		return this.mBTnJoin_Internal
	}
	private mTextJoin_Internal: mw.TextBlock
	public get mTextJoin(): mw.TextBlock {
		if(!this.mTextJoin_Internal&&this.uiWidgetBase) {
			this.mTextJoin_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain/mTextJoin') as mw.TextBlock
		}
		return this.mTextJoin_Internal
	}
	private mCanvasMain_Internal: mw.Canvas
	public get mCanvasMain(): mw.Canvas {
		if(!this.mCanvasMain_Internal&&this.uiWidgetBase) {
			this.mCanvasMain_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasMain') as mw.Canvas
		}
		return this.mCanvasMain_Internal
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
         this.mBtnBack.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnBack");
         })
         this.mBtnBack.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnBack");
         })
         this.mBtnBack.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnBack");
         })
         this.mBtnBack.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBTnJoin.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBTnJoin");
         })
         this.mBTnJoin.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBTnJoin");
         })
         this.mBTnJoin.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBTnJoin");
         })
         this.mBTnJoin.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mTextJoin)
	
 
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
 