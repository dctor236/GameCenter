 

 @UIBind('UI/BackSchol.ui')
 export default class BackSchol_Generate extends UIScript {
     	private mText_time_Internal: mw.TextBlock
	public get mText_time(): mw.TextBlock {
		if(!this.mText_time_Internal&&this.uiWidgetBase) {
			this.mText_time_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mMask/mText_time') as mw.TextBlock
		}
		return this.mText_time_Internal
	}
	private mMask_Internal: mw.Canvas
	public get mMask(): mw.Canvas {
		if(!this.mMask_Internal&&this.uiWidgetBase) {
			this.mMask_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mMask') as mw.Canvas
		}
		return this.mMask_Internal
	}
	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
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
         this.setLanguage(this.mText_time)
	
 
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
 