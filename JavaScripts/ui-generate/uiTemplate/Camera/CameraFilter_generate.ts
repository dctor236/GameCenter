 

 @UIBind('UI/uiTemplate/Camera/CameraFilter.ui')
 export default class CameraFilter_Generate extends UIScript {
     	private mScrollBox_1_Internal: mw.ScrollBox
	public get mScrollBox_1(): mw.ScrollBox {
		if(!this.mScrollBox_1_Internal&&this.uiWidgetBase) {
			this.mScrollBox_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_1/mScrollBox_1') as mw.ScrollBox
		}
		return this.mScrollBox_1_Internal
	}
	private mText_1_Internal: mw.TextBlock
	public get mText_1(): mw.TextBlock {
		if(!this.mText_1_Internal&&this.uiWidgetBase) {
			this.mText_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_1/mText_1') as mw.TextBlock
		}
		return this.mText_1_Internal
	}
	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mScrollBox_2_Internal: mw.ScrollBox
	public get mScrollBox_2(): mw.ScrollBox {
		if(!this.mScrollBox_2_Internal&&this.uiWidgetBase) {
			this.mScrollBox_2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_2/mScrollBox_2') as mw.ScrollBox
		}
		return this.mScrollBox_2_Internal
	}
	private mText_2_Internal: mw.TextBlock
	public get mText_2(): mw.TextBlock {
		if(!this.mText_2_Internal&&this.uiWidgetBase) {
			this.mText_2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_2/mText_2') as mw.TextBlock
		}
		return this.mText_2_Internal
	}
	private mCanvas_2_Internal: mw.Canvas
	public get mCanvas_2(): mw.Canvas {
		if(!this.mCanvas_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas/mCanvas_2') as mw.Canvas
		}
		return this.mCanvas_2_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
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
         this.setLanguage(this.mText_1)
	
         this.setLanguage(this.mText_2)
	
 
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
 