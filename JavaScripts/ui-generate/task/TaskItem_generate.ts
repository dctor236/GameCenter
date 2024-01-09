 

 @UIBind('UI/task/TaskItem.ui')
 export default class TaskItem_Generate extends UIScript {
     	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private txt_num_Internal: mw.TextBlock
	public get txt_num(): mw.TextBlock {
		if(!this.txt_num_Internal&&this.uiWidgetBase) {
			this.txt_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_num') as mw.TextBlock
		}
		return this.txt_num_Internal
	}
	private txt_Name_Internal: mw.TextBlock
	public get txt_Name(): mw.TextBlock {
		if(!this.txt_Name_Internal&&this.uiWidgetBase) {
			this.txt_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/txt_Name') as mw.TextBlock
		}
		return this.txt_Name_Internal
	}
	private txt_Des_Internal: mw.TextBlock
	public get txt_Des(): mw.TextBlock {
		if(!this.txt_Des_Internal&&this.uiWidgetBase) {
			this.txt_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/txt_Des') as mw.TextBlock
		}
		return this.txt_Des_Internal
	}
	private btn_Guide_Internal: mw.StaleButton
	public get btn_Guide(): mw.StaleButton {
		if(!this.btn_Guide_Internal&&this.uiWidgetBase) {
			this.btn_Guide_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/btn_Guide') as mw.StaleButton
		}
		return this.btn_Guide_Internal
	}
	private btn_To_Internal: mw.StaleButton
	public get btn_To(): mw.StaleButton {
		if(!this.btn_To_Internal&&this.uiWidgetBase) {
			this.btn_To_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/guideCanvas/btn_To') as mw.StaleButton
		}
		return this.btn_To_Internal
	}
	private mGuideTex_Internal: mw.TextBlock
	public get mGuideTex(): mw.TextBlock {
		if(!this.mGuideTex_Internal&&this.uiWidgetBase) {
			this.mGuideTex_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/guideCanvas/mGuideTex') as mw.TextBlock
		}
		return this.mGuideTex_Internal
	}
	private guideCanvas_Internal: mw.Canvas
	public get guideCanvas(): mw.Canvas {
		if(!this.guideCanvas_Internal&&this.uiWidgetBase) {
			this.guideCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/guideCanvas') as mw.Canvas
		}
		return this.guideCanvas_Internal
	}
	private mStateText_Internal: mw.TextBlock
	public get mStateText(): mw.TextBlock {
		if(!this.mStateText_Internal&&this.uiWidgetBase) {
			this.mStateText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/mStateText') as mw.TextBlock
		}
		return this.mStateText_Internal
	}
	private mMask_Internal: mw.Image
	public get mMask(): mw.Image {
		if(!this.mMask_Internal&&this.uiWidgetBase) {
			this.mMask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/mMask') as mw.Image
		}
		return this.mMask_Internal
	}
	private mFinish_Internal: mw.Image
	public get mFinish(): mw.Image {
		if(!this.mFinish_Internal&&this.uiWidgetBase) {
			this.mFinish_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState/mFinish') as mw.Image
		}
		return this.mFinish_Internal
	}
	private mGuidState_Internal: mw.Canvas
	public get mGuidState(): mw.Canvas {
		if(!this.mGuidState_Internal&&this.uiWidgetBase) {
			this.mGuidState_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGuidState') as mw.Canvas
		}
		return this.mGuidState_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.btn_Guide.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_Guide");
         })
         this.btn_Guide.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_Guide");
         })
         this.btn_Guide.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_Guide");
         })
         this.btn_Guide.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn_To.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_To");
         })
         this.btn_To.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_To");
         })
         this.btn_To.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_To");
         })
         this.btn_To.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.btn_Guide);
	
         this.setLanguage(this.btn_To);
	
         //文本多语言
         this.setLanguage(this.txt_num)
	
         this.setLanguage(this.txt_Name)
	
         this.setLanguage(this.txt_Des)
	
         this.setLanguage(this.mGuideTex)
	
         this.setLanguage(this.mStateText)
	
 
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
 