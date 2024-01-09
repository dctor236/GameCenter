 

 @UIBind('UI/uiTemplate/gameModule/Game_HUD.ui')
 export default class Game_HUD_Generate extends UIScript {
     	private mBtn_Trans_Internal: mw.Button
	public get mBtn_Trans(): mw.Button {
		if(!this.mBtn_Trans_Internal&&this.uiWidgetBase) {
			this.mBtn_Trans_Internal = this.uiWidgetBase.findChildByPath('Canvas/JoyStick/mBtn_Trans') as mw.Button
		}
		return this.mBtn_Trans_Internal
	}
	private mRightDownCon_Internal: mw.Canvas
	public get mRightDownCon(): mw.Canvas {
		if(!this.mRightDownCon_Internal&&this.uiWidgetBase) {
			this.mRightDownCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon') as mw.Canvas
		}
		return this.mRightDownCon_Internal
	}
	private mJump_btn_Internal: mw.StaleButton
	public get mJump_btn(): mw.StaleButton {
		if(!this.mJump_btn_Internal&&this.uiWidgetBase) {
			this.mJump_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mJump_btn') as mw.StaleButton
		}
		return this.mJump_btn_Internal
	}
	private mItemAction_btn_Internal: mw.StaleButton
	public get mItemAction_btn(): mw.StaleButton {
		if(!this.mItemAction_btn_Internal&&this.uiWidgetBase) {
			this.mItemAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mItemAction_btn') as mw.StaleButton
		}
		return this.mItemAction_btn_Internal
	}
	private mExitInteractive_btn_Internal: mw.StaleButton
	public get mExitInteractive_btn(): mw.StaleButton {
		if(!this.mExitInteractive_btn_Internal&&this.uiWidgetBase) {
			this.mExitInteractive_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mExitInteractive_btn') as mw.StaleButton
		}
		return this.mExitInteractive_btn_Internal
	}
	private mIdCard_btn_Internal: mw.Button
	public get mIdCard_btn(): mw.Button {
		if(!this.mIdCard_btn_Internal&&this.uiWidgetBase) {
			this.mIdCard_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mIdCard_btn') as mw.Button
		}
		return this.mIdCard_btn_Internal
	}
	private mPulloff_btn_Internal: mw.Button
	public get mPulloff_btn(): mw.Button {
		if(!this.mPulloff_btn_Internal&&this.uiWidgetBase) {
			this.mPulloff_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mPulloff_btn') as mw.Button
		}
		return this.mPulloff_btn_Internal
	}
	private canvas_emoji_Internal: mw.Canvas
	public get canvas_emoji(): mw.Canvas {
		if(!this.canvas_emoji_Internal&&this.uiWidgetBase) {
			this.canvas_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_emoji') as mw.Canvas
		}
		return this.canvas_emoji_Internal
	}
	private scrollBox_emoji_Internal: mw.ScrollBox
	public get scrollBox_emoji(): mw.ScrollBox {
		if(!this.scrollBox_emoji_Internal&&this.uiWidgetBase) {
			this.scrollBox_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_emoji/scrollBox_emoji') as mw.ScrollBox
		}
		return this.scrollBox_emoji_Internal
	}
	private canvas_word_Internal: mw.Canvas
	public get canvas_word(): mw.Canvas {
		if(!this.canvas_word_Internal&&this.uiWidgetBase) {
			this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_word') as mw.Canvas
		}
		return this.canvas_word_Internal
	}
	private scrollBox_word_Internal: mw.ScrollBox
	public get scrollBox_word(): mw.ScrollBox {
		if(!this.scrollBox_word_Internal&&this.uiWidgetBase) {
			this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_word/scrollBox_word') as mw.ScrollBox
		}
		return this.scrollBox_word_Internal
	}
	private canvas_Expression_Internal: mw.Canvas
	public get canvas_Expression(): mw.Canvas {
		if(!this.canvas_Expression_Internal&&this.uiWidgetBase) {
			this.canvas_Expression_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Expression') as mw.Canvas
		}
		return this.canvas_Expression_Internal
	}
	private emojiBtn_Internal: mw.StaleButton
	public get emojiBtn(): mw.StaleButton {
		if(!this.emojiBtn_Internal&&this.uiWidgetBase) {
			this.emojiBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Expression/emojiBtn') as mw.StaleButton
		}
		return this.emojiBtn_Internal
	}
	private wordBtn_Internal: mw.StaleButton
	public get wordBtn(): mw.StaleButton {
		if(!this.wordBtn_Internal&&this.uiWidgetBase) {
			this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Expression/wordBtn') as mw.StaleButton
		}
		return this.wordBtn_Internal
	}
	private mCanvas_choose_Internal: mw.Canvas
	public get mCanvas_choose(): mw.Canvas {
		if(!this.mCanvas_choose_Internal&&this.uiWidgetBase) {
			this.mCanvas_choose_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_choose') as mw.Canvas
		}
		return this.mCanvas_choose_Internal
	}
	private mBtn_choose_Internal: mw.Button
	public get mBtn_choose(): mw.Button {
		if(!this.mBtn_choose_Internal&&this.uiWidgetBase) {
			this.mBtn_choose_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_choose/mBtn_choose') as mw.Button
		}
		return this.mBtn_choose_Internal
	}
	private mCanvasCamera_Internal: mw.Canvas
	public get mCanvasCamera(): mw.Canvas {
		if(!this.mCanvasCamera_Internal&&this.uiWidgetBase) {
			this.mCanvasCamera_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasCamera') as mw.Canvas
		}
		return this.mCanvasCamera_Internal
	}
	private mButton_1_Internal: mw.Button
	public get mButton_1(): mw.Button {
		if(!this.mButton_1_Internal&&this.uiWidgetBase) {
			this.mButton_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasCamera/mButton_1') as mw.Button
		}
		return this.mButton_1_Internal
	}
	private mCanvasAction_Internal: mw.Canvas
	public get mCanvasAction(): mw.Canvas {
		if(!this.mCanvasAction_Internal&&this.uiWidgetBase) {
			this.mCanvasAction_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasAction') as mw.Canvas
		}
		return this.mCanvasAction_Internal
	}
	private mAction_btn_Internal: mw.Button
	public get mAction_btn(): mw.Button {
		if(!this.mAction_btn_Internal&&this.uiWidgetBase) {
			this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasAction/mAction_btn') as mw.Button
		}
		return this.mAction_btn_Internal
	}
	private textBtn_Internal: mw.TextBlock
	public get textBtn(): mw.TextBlock {
		if(!this.textBtn_Internal&&this.uiWidgetBase) {
			this.textBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasAction/mAction_btn/textBtn') as mw.TextBlock
		}
		return this.textBtn_Internal
	}
	private mBagBtn_Internal: mw.Button
	public get mBagBtn(): mw.Button {
		if(!this.mBagBtn_Internal&&this.uiWidgetBase) {
			this.mBagBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBagBtn') as mw.Button
		}
		return this.mBagBtn_Internal
	}
	private canvas_Task_Internal: mw.Canvas
	public get canvas_Task(): mw.Canvas {
		if(!this.canvas_Task_Internal&&this.uiWidgetBase) {
			this.canvas_Task_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task') as mw.Canvas
		}
		return this.canvas_Task_Internal
	}
	private txt_task_Des_Internal: mw.TextBlock
	public get txt_task_Des(): mw.TextBlock {
		if(!this.txt_task_Des_Internal&&this.uiWidgetBase) {
			this.txt_task_Des_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/txt_task_Des') as mw.TextBlock
		}
		return this.txt_task_Des_Internal
	}
	private txt_task_Title_Internal: mw.TextBlock
	public get txt_task_Title(): mw.TextBlock {
		if(!this.txt_task_Title_Internal&&this.uiWidgetBase) {
			this.txt_task_Title_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/txt_task_Title') as mw.TextBlock
		}
		return this.txt_task_Title_Internal
	}
	private btn_Task_Internal: mw.StaleButton
	public get btn_Task(): mw.StaleButton {
		if(!this.btn_Task_Internal&&this.uiWidgetBase) {
			this.btn_Task_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/btn_Task') as mw.StaleButton
		}
		return this.btn_Task_Internal
	}
	private mBtnGuideTask_Internal: mw.Button
	public get mBtnGuideTask(): mw.Button {
		if(!this.mBtnGuideTask_Internal&&this.uiWidgetBase) {
			this.mBtnGuideTask_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/mBtnGuideTask') as mw.Button
		}
		return this.mBtnGuideTask_Internal
	}
	private mTexGuideTask_Internal: mw.TextBlock
	public get mTexGuideTask(): mw.TextBlock {
		if(!this.mTexGuideTask_Internal&&this.uiWidgetBase) {
			this.mTexGuideTask_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/mBtnGuideTask/mTexGuideTask') as mw.TextBlock
		}
		return this.mTexGuideTask_Internal
	}
	private mAward_Internal: mw.Canvas
	public get mAward(): mw.Canvas {
		if(!this.mAward_Internal&&this.uiWidgetBase) {
			this.mAward_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/mAward') as mw.Canvas
		}
		return this.mAward_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/mAward/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private txt_num_Internal: mw.TextBlock
	public get txt_num(): mw.TextBlock {
		if(!this.txt_num_Internal&&this.uiWidgetBase) {
			this.txt_num_Internal = this.uiWidgetBase.findChildByPath('Canvas/canvas_Task/mAward/txt_num') as mw.TextBlock
		}
		return this.txt_num_Internal
	}
	private mNpcInternect_Internal: mw.Canvas
	public get mNpcInternect(): mw.Canvas {
		if(!this.mNpcInternect_Internal&&this.uiWidgetBase) {
			this.mNpcInternect_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNpcInternect') as mw.Canvas
		}
		return this.mNpcInternect_Internal
	}
	private mTexNpcInter_Internal: mw.TextBlock
	public get mTexNpcInter(): mw.TextBlock {
		if(!this.mTexNpcInter_Internal&&this.uiWidgetBase) {
			this.mTexNpcInter_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNpcInternect/mTexNpcInter') as mw.TextBlock
		}
		return this.mTexNpcInter_Internal
	}
	private mget_back_Internal: mw.Image
	public get mget_back(): mw.Image {
		if(!this.mget_back_Internal&&this.uiWidgetBase) {
			this.mget_back_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNpcInternect/mget_back') as mw.Image
		}
		return this.mget_back_Internal
	}
	private mBtnNPCInter_Internal: mw.StaleButton
	public get mBtnNPCInter(): mw.StaleButton {
		if(!this.mBtnNPCInter_Internal&&this.uiWidgetBase) {
			this.mBtnNPCInter_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNpcInternect/mBtnNPCInter') as mw.StaleButton
		}
		return this.mBtnNPCInter_Internal
	}
	private mCanvasDress_Internal: mw.Canvas
	public get mCanvasDress(): mw.Canvas {
		if(!this.mCanvasDress_Internal&&this.uiWidgetBase) {
			this.mCanvasDress_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasDress') as mw.Canvas
		}
		return this.mCanvasDress_Internal
	}
	private mBtnChange_Internal: mw.StaleButton
	public get mBtnChange(): mw.StaleButton {
		if(!this.mBtnChange_Internal&&this.uiWidgetBase) {
			this.mBtnChange_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasDress/mBtnChange') as mw.StaleButton
		}
		return this.mBtnChange_Internal
	}
	private mNewCloth_Internal: mw.TextBlock
	public get mNewCloth(): mw.TextBlock {
		if(!this.mNewCloth_Internal&&this.uiWidgetBase) {
			this.mNewCloth_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasDress/mNewCloth') as mw.TextBlock
		}
		return this.mNewCloth_Internal
	}
	private mCanvasClothReset_Internal: mw.Canvas
	public get mCanvasClothReset(): mw.Canvas {
		if(!this.mCanvasClothReset_Internal&&this.uiWidgetBase) {
			this.mCanvasClothReset_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasClothReset') as mw.Canvas
		}
		return this.mCanvasClothReset_Internal
	}
	private mBtnCloth_Internal: mw.StaleButton
	public get mBtnCloth(): mw.StaleButton {
		if(!this.mBtnCloth_Internal&&this.uiWidgetBase) {
			this.mBtnCloth_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasClothReset/mBtnCloth') as mw.StaleButton
		}
		return this.mBtnCloth_Internal
	}
	private img_low_hp_Internal: mw.Image
	public get img_low_hp(): mw.Image {
		if(!this.img_low_hp_Internal&&this.uiWidgetBase) {
			this.img_low_hp_Internal = this.uiWidgetBase.findChildByPath('Canvas/img_low_hp') as mw.Image
		}
		return this.img_low_hp_Internal
	}


     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         //this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mJump_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mJump_btn");
         })
         this.mJump_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mJump_btn");
         })
         this.mJump_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mJump_btn");
         })
         this.mJump_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mItemAction_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mItemAction_btn");
         })
         this.mItemAction_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mItemAction_btn");
         })
         this.mItemAction_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mItemAction_btn");
         })
         this.mItemAction_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mExitInteractive_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mExitInteractive_btn");
         })
         this.mExitInteractive_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mExitInteractive_btn");
         })
         this.mExitInteractive_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mExitInteractive_btn");
         })
         this.mExitInteractive_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.emojiBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
         })
         this.emojiBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "emojiBtn");
         })
         this.emojiBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "emojiBtn");
         })
         this.emojiBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.wordBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "wordBtn");
         })
         this.wordBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "wordBtn");
         })
         this.wordBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "wordBtn");
         })
         this.wordBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn_Task.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn_Task");
         })
         this.btn_Task.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn_Task");
         })
         this.btn_Task.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn_Task");
         })
         this.btn_Task.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnNPCInter.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnNPCInter");
         })
         this.mBtnNPCInter.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnNPCInter");
         })
         this.mBtnNPCInter.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnNPCInter");
         })
         this.mBtnNPCInter.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnChange.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnChange");
         })
         this.mBtnChange.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnChange");
         })
         this.mBtnChange.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnChange");
         })
         this.mBtnChange.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnCloth.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnCloth");
         })
         this.mBtnCloth.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnCloth");
         })
         this.mBtnCloth.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnCloth");
         })
         this.mBtnCloth.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.mBtn_Trans.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_Trans");
         })
         this.mBtn_Trans.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_Trans");
         })
         this.mBtn_Trans.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_Trans");
         })
         this.mBtn_Trans.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mIdCard_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mIdCard_btn");
         })
         this.mIdCard_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mIdCard_btn");
         })
         this.mIdCard_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mIdCard_btn");
         })
         this.mIdCard_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mPulloff_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mPulloff_btn");
         })
         this.mPulloff_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mPulloff_btn");
         })
         this.mPulloff_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mPulloff_btn");
         })
         this.mPulloff_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn_choose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn_choose");
         })
         this.mBtn_choose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn_choose");
         })
         this.mBtn_choose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn_choose");
         })
         this.mBtn_choose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButton_1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButton_1");
         })
         this.mButton_1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButton_1");
         })
         this.mButton_1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButton_1");
         })
         this.mButton_1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mAction_btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mAction_btn");
         })
         this.mAction_btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mAction_btn");
         })
         this.mAction_btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mAction_btn");
         })
         this.mAction_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBagBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBagBtn");
         })
         this.mBagBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBagBtn");
         })
         this.mBagBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBagBtn");
         })
         this.mBagBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnGuideTask.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnGuideTask");
         })
         this.mBtnGuideTask.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnGuideTask");
         })
         this.mBtnGuideTask.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnGuideTask");
         })
         this.mBtnGuideTask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mJump_btn);
	
         this.setLanguage(this.mItemAction_btn);
	
         this.setLanguage(this.mExitInteractive_btn);
	
         this.setLanguage(this.emojiBtn);
	
         this.setLanguage(this.wordBtn);
	
         this.setLanguage(this.btn_Task);
	
         this.setLanguage(this.mBtnNPCInter);
	
         this.setLanguage(this.mBtnChange);
	
         this.setLanguage(this.mBtnCloth);
	
         //文本多语言
         this.setLanguage(this.textBtn)
	
         this.setLanguage(this.txt_task_Des)
	
         this.setLanguage(this.txt_task_Title)
	
         this.setLanguage(this.mTexGuideTask)
	
         this.setLanguage(this.txt_num)
	
         this.setLanguage(this.mTexNpcInter)
	
         this.setLanguage(this.mNewCloth)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mIdCard_btn/TextBlock_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mPulloff_btn/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvasCamera/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mBagBtn/TextBlock") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/canvas_Task/Text_Task") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvasDress/Text") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvasClothReset/TextBlock") as mw.TextBlock);
	
 
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
 