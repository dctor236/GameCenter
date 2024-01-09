 

 @UIBind('UI/task/TaskMain.ui')
 export default class TaskMain_Generate extends UIScript {
     	private mContentFinish_Internal: mw.Canvas
	public get mContentFinish(): mw.Canvas {
		if(!this.mContentFinish_Internal&&this.uiWidgetBase) {
			this.mContentFinish_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel2/mScrollFinish/mContentFinish') as mw.Canvas
		}
		return this.mContentFinish_Internal
	}
	private mScrollFinish_Internal: mw.ScrollBox
	public get mScrollFinish(): mw.ScrollBox {
		if(!this.mScrollFinish_Internal&&this.uiWidgetBase) {
			this.mScrollFinish_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel2/mScrollFinish') as mw.ScrollBox
		}
		return this.mScrollFinish_Internal
	}
	private mPanel2_Internal: mw.Canvas
	public get mPanel2(): mw.Canvas {
		if(!this.mPanel2_Internal&&this.uiWidgetBase) {
			this.mPanel2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel2') as mw.Canvas
		}
		return this.mPanel2_Internal
	}
	private mContentUnAcc_Internal: mw.Canvas
	public get mContentUnAcc(): mw.Canvas {
		if(!this.mContentUnAcc_Internal&&this.uiWidgetBase) {
			this.mContentUnAcc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel1/mScrollUnAccept/mContentUnAcc') as mw.Canvas
		}
		return this.mContentUnAcc_Internal
	}
	private mScrollUnAccept_Internal: mw.ScrollBox
	public get mScrollUnAccept(): mw.ScrollBox {
		if(!this.mScrollUnAccept_Internal&&this.uiWidgetBase) {
			this.mScrollUnAccept_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel1/mScrollUnAccept') as mw.ScrollBox
		}
		return this.mScrollUnAccept_Internal
	}
	private mPanel1_Internal: mw.Canvas
	public get mPanel1(): mw.Canvas {
		if(!this.mPanel1_Internal&&this.uiWidgetBase) {
			this.mPanel1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mPanel1') as mw.Canvas
		}
		return this.mPanel1_Internal
	}
	private btn_Close_Internal: mw.Button
	public get btn_Close(): mw.Button {
		if(!this.btn_Close_Internal&&this.uiWidgetBase) {
			this.btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_Close') as mw.Button
		}
		return this.btn_Close_Internal
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
         this.btn_Close.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_Close");
         })
         this.btn_Close.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_Close");
         })
         this.btn_Close.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_Close");
         })
         this.btn_Close.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mPanel2/TextBlock_2") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mPanel1/TextBlock_2") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as mw.TextBlock);
	
 
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
 