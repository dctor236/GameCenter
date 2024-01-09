 

 @UIBind('UI/uiTemplate/Camera/CameraMain.ui')
 export default class CameraMain_Generate extends UIScript {
     	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private mButton_Filter_Internal: mw.Button
	public get mButton_Filter(): mw.Button {
		if(!this.mButton_Filter_Internal&&this.uiWidgetBase) {
			this.mButton_Filter_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Setting/mCanvas_Filter/mButton_Filter') as mw.Button
		}
		return this.mButton_Filter_Internal
	}
	private mCanvas_Filter_Internal: mw.Canvas
	public get mCanvas_Filter(): mw.Canvas {
		if(!this.mCanvas_Filter_Internal&&this.uiWidgetBase) {
			this.mCanvas_Filter_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Setting/mCanvas_Filter') as mw.Canvas
		}
		return this.mCanvas_Filter_Internal
	}
	private mButton_Action_Internal: mw.Button
	public get mButton_Action(): mw.Button {
		if(!this.mButton_Action_Internal&&this.uiWidgetBase) {
			this.mButton_Action_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Setting/mCanvas_Action/mButton_Action') as mw.Button
		}
		return this.mButton_Action_Internal
	}
	private mCanvas_Action_Internal: mw.Canvas
	public get mCanvas_Action(): mw.Canvas {
		if(!this.mCanvas_Action_Internal&&this.uiWidgetBase) {
			this.mCanvas_Action_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Setting/mCanvas_Action') as mw.Canvas
		}
		return this.mCanvas_Action_Internal
	}
	private mCanvas_Setting_Internal: mw.Canvas
	public get mCanvas_Setting(): mw.Canvas {
		if(!this.mCanvas_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Setting_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Setting') as mw.Canvas
		}
		return this.mCanvas_Setting_Internal
	}
	private mProgressBar_LR_Internal: mw.ProgressBar
	public get mProgressBar_LR(): mw.ProgressBar {
		if(!this.mProgressBar_LR_Internal&&this.uiWidgetBase) {
			this.mProgressBar_LR_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_LR/mProgressBar_LR') as mw.ProgressBar
		}
		return this.mProgressBar_LR_Internal
	}
	private mCanvas_LR_Internal: mw.Canvas
	public get mCanvas_LR(): mw.Canvas {
		if(!this.mCanvas_LR_Internal&&this.uiWidgetBase) {
			this.mCanvas_LR_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_LR') as mw.Canvas
		}
		return this.mCanvas_LR_Internal
	}
	private mButton_Camera_Internal: mw.Button
	public get mButton_Camera(): mw.Button {
		if(!this.mButton_Camera_Internal&&this.uiWidgetBase) {
			this.mButton_Camera_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Camera/mButton_Camera') as mw.Button
		}
		return this.mButton_Camera_Internal
	}
	private mCanvas_Camera_Internal: mw.Canvas
	public get mCanvas_Camera(): mw.Canvas {
		if(!this.mCanvas_Camera_Internal&&this.uiWidgetBase) {
			this.mCanvas_Camera_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Camera') as mw.Canvas
		}
		return this.mCanvas_Camera_Internal
	}
	private mProgressBar_Distance_Internal: mw.ProgressBar
	public get mProgressBar_Distance(): mw.ProgressBar {
		if(!this.mProgressBar_Distance_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Distance_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Distance/mProgressBar_Distance') as mw.ProgressBar
		}
		return this.mProgressBar_Distance_Internal
	}
	private mCanvas_Distance_Internal: mw.Canvas
	public get mCanvas_Distance(): mw.Canvas {
		if(!this.mCanvas_Distance_Internal&&this.uiWidgetBase) {
			this.mCanvas_Distance_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Distance') as mw.Canvas
		}
		return this.mCanvas_Distance_Internal
	}
	private mButton_Switch_Internal: mw.Button
	public get mButton_Switch(): mw.Button {
		if(!this.mButton_Switch_Internal&&this.uiWidgetBase) {
			this.mButton_Switch_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Switch/mButton_Switch') as mw.Button
		}
		return this.mButton_Switch_Internal
	}
	private mCanvas_Switch_Internal: mw.Canvas
	public get mCanvas_Switch(): mw.Canvas {
		if(!this.mCanvas_Switch_Internal&&this.uiWidgetBase) {
			this.mCanvas_Switch_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Switch') as mw.Canvas
		}
		return this.mCanvas_Switch_Internal
	}
	private mButton_Left_Internal: mw.Button
	public get mButton_Left(): mw.Button {
		if(!this.mButton_Left_Internal&&this.uiWidgetBase) {
			this.mButton_Left_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Move/mButton_Left') as mw.Button
		}
		return this.mButton_Left_Internal
	}
	private mButton_Right_Internal: mw.Button
	public get mButton_Right(): mw.Button {
		if(!this.mButton_Right_Internal&&this.uiWidgetBase) {
			this.mButton_Right_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Move/mButton_Right') as mw.Button
		}
		return this.mButton_Right_Internal
	}
	private mButton_UP_Internal: mw.Button
	public get mButton_UP(): mw.Button {
		if(!this.mButton_UP_Internal&&this.uiWidgetBase) {
			this.mButton_UP_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Move/mButton_UP') as mw.Button
		}
		return this.mButton_UP_Internal
	}
	private mButton_Down_Internal: mw.Button
	public get mButton_Down(): mw.Button {
		if(!this.mButton_Down_Internal&&this.uiWidgetBase) {
			this.mButton_Down_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Move/mButton_Down') as mw.Button
		}
		return this.mButton_Down_Internal
	}
	private mCanvas_Move_Internal: mw.Canvas
	public get mCanvas_Move(): mw.Canvas {
		if(!this.mCanvas_Move_Internal&&this.uiWidgetBase) {
			this.mCanvas_Move_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Move') as mw.Canvas
		}
		return this.mCanvas_Move_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Close/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mCanvas_Close_Internal: mw.Canvas
	public get mCanvas_Close(): mw.Canvas {
		if(!this.mCanvas_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Close_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Close') as mw.Canvas
		}
		return this.mCanvas_Close_Internal
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
         this.mButton_Filter.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Filter");
         })
         this.mButton_Filter.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Filter");
         })
         this.mButton_Filter.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Filter");
         })
         this.mButton_Filter.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Action.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Action");
         })
         this.mButton_Action.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Action");
         })
         this.mButton_Action.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Action");
         })
         this.mButton_Action.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Camera.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Camera");
         })
         this.mButton_Camera.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Camera");
         })
         this.mButton_Camera.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Camera");
         })
         this.mButton_Camera.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Switch.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Switch");
         })
         this.mButton_Switch.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Switch");
         })
         this.mButton_Switch.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Switch");
         })
         this.mButton_Switch.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Left.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Left");
         })
         this.mButton_Left.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Left");
         })
         this.mButton_Left.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Left");
         })
         this.mButton_Left.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Right.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Right");
         })
         this.mButton_Right.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Right");
         })
         this.mButton_Right.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Right");
         })
         this.mButton_Right.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_UP.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_UP");
         })
         this.mButton_UP.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_UP");
         })
         this.mButton_UP.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_UP");
         })
         this.mButton_UP.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Down.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Down");
         })
         this.mButton_Down.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Down");
         })
         this.mButton_Down.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Down");
         })
         this.mButton_Down.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_Close.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
         })
         this.mButton_Close.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_Close");
         })
         this.mButton_Close.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_Close");
         })
         this.mButton_Close.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
 