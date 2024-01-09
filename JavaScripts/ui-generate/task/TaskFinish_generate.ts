 

 @UIBind('UI/task/TaskFinish.ui')
 export default class TaskFinish_Generate extends UIScript {
     	private img_BG_Internal: mw.Image
	public get img_BG(): mw.Image {
		if(!this.img_BG_Internal&&this.uiWidgetBase) {
			this.img_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CenterAnchor/anchor/canvas_Task/img_BG') as mw.Image
		}
		return this.img_BG_Internal
	}
	private txt_Task_Internal: mw.TextBlock
	public get txt_Task(): mw.TextBlock {
		if(!this.txt_Task_Internal&&this.uiWidgetBase) {
			this.txt_Task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CenterAnchor/anchor/canvas_Task/txt_Task') as mw.TextBlock
		}
		return this.txt_Task_Internal
	}
	private canvas_Task_Internal: mw.Canvas
	public get canvas_Task(): mw.Canvas {
		if(!this.canvas_Task_Internal&&this.uiWidgetBase) {
			this.canvas_Task_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CenterAnchor/anchor/canvas_Task') as mw.Canvas
		}
		return this.canvas_Task_Internal
	}
	private anchor_Internal: mw.Canvas
	public get anchor(): mw.Canvas {
		if(!this.anchor_Internal&&this.uiWidgetBase) {
			this.anchor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CenterAnchor/anchor') as mw.Canvas
		}
		return this.anchor_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CenterAnchor/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
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
         this.setLanguage(this.txt_Task)
	
 
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
 