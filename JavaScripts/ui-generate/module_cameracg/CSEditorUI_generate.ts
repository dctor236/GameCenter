 

 @UIBind('UI/module_cameracg/CSEditorUI.ui')
 export default class CSEditorUI_Generate extends UIScript {
     	private mBtnPlay_Internal: mw.Button
	public get mBtnPlay(): mw.Button {
		if(!this.mBtnPlay_Internal&&this.uiWidgetBase) {
			this.mBtnPlay_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnPlay/mBtnPlay') as mw.Button
		}
		return this.mBtnPlay_Internal
	}
	private mBtnRecord_Internal: mw.Button
	public get mBtnRecord(): mw.Button {
		if(!this.mBtnRecord_Internal&&this.uiWidgetBase) {
			this.mBtnRecord_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnRecord/mBtnRecord') as mw.Button
		}
		return this.mBtnRecord_Internal
	}
	private mBtnClear_Internal: mw.Button
	public get mBtnClear(): mw.Button {
		if(!this.mBtnClear_Internal&&this.uiWidgetBase) {
			this.mBtnClear_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnClear/mBtnClear') as mw.Button
		}
		return this.mBtnClear_Internal
	}
	private mBtnSetting_Internal: mw.Button
	public get mBtnSetting(): mw.Button {
		if(!this.mBtnSetting_Internal&&this.uiWidgetBase) {
			this.mBtnSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnSetting/mBtnSetting') as mw.Button
		}
		return this.mBtnSetting_Internal
	}
	private mCanvasBtns_Internal: mw.Canvas
	public get mCanvasBtns(): mw.Canvas {
		if(!this.mCanvasBtns_Internal&&this.uiWidgetBase) {
			this.mCanvasBtns_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasBtns') as mw.Canvas
		}
		return this.mCanvasBtns_Internal
	}
	private mBtnResetFOV_Internal: mw.Button
	public get mBtnResetFOV(): mw.Button {
		if(!this.mBtnResetFOV_Internal&&this.uiWidgetBase) {
			this.mBtnResetFOV_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasResetFOV/mBtnResetFOV') as mw.Button
		}
		return this.mBtnResetFOV_Internal
	}
	private mBtnCameraSync_Internal: mw.Button
	public get mBtnCameraSync(): mw.Button {
		if(!this.mBtnCameraSync_Internal&&this.uiWidgetBase) {
			this.mBtnCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/mBtnCameraSync') as mw.Button
		}
		return this.mBtnCameraSync_Internal
	}
	private mTextBtnCameraSync_Internal: mw.TextBlock
	public get mTextBtnCameraSync(): mw.TextBlock {
		if(!this.mTextBtnCameraSync_Internal&&this.uiWidgetBase) {
			this.mTextBtnCameraSync_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/mTextBtnCameraSync') as mw.TextBlock
		}
		return this.mTextBtnCameraSync_Internal
	}
	private mBtnLoad_Internal: mw.Button
	public get mBtnLoad(): mw.Button {
		if(!this.mBtnLoad_Internal&&this.uiWidgetBase) {
			this.mBtnLoad_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasBtnLoad/mBtnLoad') as mw.Button
		}
		return this.mBtnLoad_Internal
	}
	private mBtnSave_Internal: mw.Button
	public get mBtnSave(): mw.Button {
		if(!this.mBtnSave_Internal&&this.uiWidgetBase) {
			this.mBtnSave_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSave/mBtnSave') as mw.Button
		}
		return this.mBtnSave_Internal
	}
	private mCanvasSetting_Internal: mw.Canvas
	public get mCanvasSetting(): mw.Canvas {
		if(!this.mCanvasSetting_Internal&&this.uiWidgetBase) {
			this.mCanvasSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasSetting') as mw.Canvas
		}
		return this.mCanvasSetting_Internal
	}
	private mCanvasTimePoint_Internal: mw.Canvas
	public get mCanvasTimePoint(): mw.Canvas {
		if(!this.mCanvasTimePoint_Internal&&this.uiWidgetBase) {
			this.mCanvasTimePoint_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasTimePoint') as mw.Canvas
		}
		return this.mCanvasTimePoint_Internal
	}
	private mBtnBar_Internal: mw.Button
	public get mBtnBar(): mw.Button {
		if(!this.mBtnBar_Internal&&this.uiWidgetBase) {
			this.mBtnBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnBar') as mw.Button
		}
		return this.mBtnBar_Internal
	}
	private mBtnCurrentTime_Internal: mw.Button
	public get mBtnCurrentTime(): mw.Button {
		if(!this.mBtnCurrentTime_Internal&&this.uiWidgetBase) {
			this.mBtnCurrentTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mBtnCurrentTime') as mw.Button
		}
		return this.mBtnCurrentTime_Internal
	}
	private mCanvasKeyFrame_Internal: mw.Canvas
	public get mCanvasKeyFrame(): mw.Canvas {
		if(!this.mCanvasKeyFrame_Internal&&this.uiWidgetBase) {
			this.mCanvasKeyFrame_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/mCanvasKeyFrame') as mw.Canvas
		}
		return this.mCanvasKeyFrame_Internal
	}
	private mBtnAddTime_Internal: mw.Button
	public get mBtnAddTime(): mw.Button {
		if(!this.mBtnAddTime_Internal&&this.uiWidgetBase) {
			this.mBtnAddTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnAddTime/mBtnAddTime') as mw.Button
		}
		return this.mBtnAddTime_Internal
	}
	private mBtnSubTime_Internal: mw.Button
	public get mBtnSubTime(): mw.Button {
		if(!this.mBtnSubTime_Internal&&this.uiWidgetBase) {
			this.mBtnSubTime_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnSubTime/mBtnSubTime') as mw.Button
		}
		return this.mBtnSubTime_Internal
	}
	private mCanvasTimeLine_Internal: mw.Canvas
	public get mCanvasTimeLine(): mw.Canvas {
		if(!this.mCanvasTimeLine_Internal&&this.uiWidgetBase) {
			this.mCanvasTimeLine_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasTimeLine') as mw.Canvas
		}
		return this.mCanvasTimeLine_Internal
	}
	private mInputLocX_Internal: mw.InputBox
	public get mInputLocX(): mw.InputBox {
		if(!this.mInputLocX_Internal&&this.uiWidgetBase) {
			this.mInputLocX_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/mInputLocX') as mw.InputBox
		}
		return this.mInputLocX_Internal
	}
	private mInputLocY_Internal: mw.InputBox
	public get mInputLocY(): mw.InputBox {
		if(!this.mInputLocY_Internal&&this.uiWidgetBase) {
			this.mInputLocY_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/mInputLocY') as mw.InputBox
		}
		return this.mInputLocY_Internal
	}
	private mInputLocZ_Internal: mw.InputBox
	public get mInputLocZ(): mw.InputBox {
		if(!this.mInputLocZ_Internal&&this.uiWidgetBase) {
			this.mInputLocZ_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/mInputLocZ') as mw.InputBox
		}
		return this.mInputLocZ_Internal
	}
	private mInputRotP_Internal: mw.InputBox
	public get mInputRotP(): mw.InputBox {
		if(!this.mInputRotP_Internal&&this.uiWidgetBase) {
			this.mInputRotP_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/mInputRotP') as mw.InputBox
		}
		return this.mInputRotP_Internal
	}
	private mInputRotY_Internal: mw.InputBox
	public get mInputRotY(): mw.InputBox {
		if(!this.mInputRotY_Internal&&this.uiWidgetBase) {
			this.mInputRotY_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/mInputRotY') as mw.InputBox
		}
		return this.mInputRotY_Internal
	}
	private mInputRotR_Internal: mw.InputBox
	public get mInputRotR(): mw.InputBox {
		if(!this.mInputRotR_Internal&&this.uiWidgetBase) {
			this.mInputRotR_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/mInputRotR') as mw.InputBox
		}
		return this.mInputRotR_Internal
	}
	private mInputFOV_Internal: mw.InputBox
	public get mInputFOV(): mw.InputBox {
		if(!this.mInputFOV_Internal&&this.uiWidgetBase) {
			this.mInputFOV_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditOther/mInputFOV') as mw.InputBox
		}
		return this.mInputFOV_Internal
	}
	private mBtnDelKeyFrame_Internal: mw.Button
	public get mBtnDelKeyFrame(): mw.Button {
		if(!this.mBtnDelKeyFrame_Internal&&this.uiWidgetBase) {
			this.mBtnDelKeyFrame_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditOther/CanvasBtnDelKeyFrame/mBtnDelKeyFrame') as mw.Button
		}
		return this.mBtnDelKeyFrame_Internal
	}
	private mCanvasFramesEdit_Internal: mw.Canvas
	public get mCanvasFramesEdit(): mw.Canvas {
		if(!this.mCanvasFramesEdit_Internal&&this.uiWidgetBase) {
			this.mCanvasFramesEdit_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar/mCanvasFramesEdit') as mw.Canvas
		}
		return this.mCanvasFramesEdit_Internal
	}
	private mCanvasActionBar_Internal: mw.Canvas
	public get mCanvasActionBar(): mw.Canvas {
		if(!this.mCanvasActionBar_Internal&&this.uiWidgetBase) {
			this.mCanvasActionBar_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mCanvasActionBar') as mw.Canvas
		}
		return this.mCanvasActionBar_Internal
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
         this.mBtnPlay.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnPlay");
         })
         this.mBtnPlay.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnPlay");
         })
         this.mBtnPlay.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnPlay");
         })
         this.mBtnPlay.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnRecord.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnRecord");
         })
         this.mBtnRecord.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnRecord");
         })
         this.mBtnRecord.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnRecord");
         })
         this.mBtnRecord.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnClear.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnClear");
         })
         this.mBtnClear.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnClear");
         })
         this.mBtnClear.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnClear");
         })
         this.mBtnClear.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnSetting.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSetting");
         })
         this.mBtnSetting.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSetting");
         })
         this.mBtnSetting.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSetting");
         })
         this.mBtnSetting.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnResetFOV.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnResetFOV");
         })
         this.mBtnResetFOV.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnResetFOV");
         })
         this.mBtnResetFOV.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnResetFOV");
         })
         this.mBtnResetFOV.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnCameraSync.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnCameraSync");
         })
         this.mBtnCameraSync.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnCameraSync");
         })
         this.mBtnCameraSync.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnCameraSync");
         })
         this.mBtnCameraSync.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnLoad.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnLoad");
         })
         this.mBtnLoad.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnLoad");
         })
         this.mBtnLoad.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnLoad");
         })
         this.mBtnLoad.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnSave.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSave");
         })
         this.mBtnSave.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSave");
         })
         this.mBtnSave.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSave");
         })
         this.mBtnSave.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnBar.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnBar");
         })
         this.mBtnBar.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnBar");
         })
         this.mBtnBar.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnBar");
         })
         this.mBtnBar.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnCurrentTime.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnCurrentTime");
         })
         this.mBtnCurrentTime.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnCurrentTime");
         })
         this.mBtnCurrentTime.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnCurrentTime");
         })
         this.mBtnCurrentTime.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnAddTime.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnAddTime");
         })
         this.mBtnAddTime.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnAddTime");
         })
         this.mBtnAddTime.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnAddTime");
         })
         this.mBtnAddTime.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnSubTime.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSubTime");
         })
         this.mBtnSubTime.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSubTime");
         })
         this.mBtnSubTime.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSubTime");
         })
         this.mBtnSubTime.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnDelKeyFrame.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnDelKeyFrame");
         })
         this.mBtnDelKeyFrame.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnDelKeyFrame");
         })
         this.mBtnDelKeyFrame.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnDelKeyFrame");
         })
         this.mBtnDelKeyFrame.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mTextBtnCameraSync)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasBtns/CanvasBtnSetting/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasResetFOV/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasCameraSync/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasBtnLoad/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasSetting/CanvasSave/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnAddTime/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasTimeLine/CanvasBtnSubTime/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/TextLoc") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/TextX") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/TextY") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditLoc/TextZ") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/TextRot") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/TextP") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/TextY") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditRot/TextR") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditOther/TextFOV") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/mCanvasActionBar/mCanvasFramesEdit/CanvasEditOther/CanvasBtnDelKeyFrame/Text") as mw.TextBlock);
	
 
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
 