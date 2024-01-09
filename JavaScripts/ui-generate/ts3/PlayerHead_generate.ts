 

 @UIBind('UI/ts3/PlayerHead.ui')
 export default class PlayerHead_Generate extends UIScript {
     	private nameNode_Internal: mw.Canvas
	public get nameNode(): mw.Canvas {
		if(!this.nameNode_Internal&&this.uiWidgetBase) {
			this.nameNode_Internal = this.uiWidgetBase.findChildByPath('Canvas/nameNode') as mw.Canvas
		}
		return this.nameNode_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('Canvas/nameNode/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
	}
	private titleNode_Internal: mw.Canvas
	public get titleNode(): mw.Canvas {
		if(!this.titleNode_Internal&&this.uiWidgetBase) {
			this.titleNode_Internal = this.uiWidgetBase.findChildByPath('Canvas/titleNode') as mw.Canvas
		}
		return this.titleNode_Internal
	}
	private txtTitle_Internal: mw.TextBlock
	public get txtTitle(): mw.TextBlock {
		if(!this.txtTitle_Internal&&this.uiWidgetBase) {
			this.txtTitle_Internal = this.uiWidgetBase.findChildByPath('Canvas/titleNode/txtTitle') as mw.TextBlock
		}
		return this.txtTitle_Internal
	}
	private chatNode_Internal: mw.Canvas
	public get chatNode(): mw.Canvas {
		if(!this.chatNode_Internal&&this.uiWidgetBase) {
			this.chatNode_Internal = this.uiWidgetBase.findChildByPath('Canvas/chatNode') as mw.Canvas
		}
		return this.chatNode_Internal
	}
	private txtChat_Internal: mw.TextBlock
	public get txtChat(): mw.TextBlock {
		if(!this.txtChat_Internal&&this.uiWidgetBase) {
			this.txtChat_Internal = this.uiWidgetBase.findChildByPath('Canvas/chatNode/txtChat') as mw.TextBlock
		}
		return this.txtChat_Internal
	}
	private hpNode_Internal: mw.Canvas
	public get hpNode(): mw.Canvas {
		if(!this.hpNode_Internal&&this.uiWidgetBase) {
			this.hpNode_Internal = this.uiWidgetBase.findChildByPath('Canvas/hpNode') as mw.Canvas
		}
		return this.hpNode_Internal
	}
	private barHp_Internal: mw.ProgressBar
	public get barHp(): mw.ProgressBar {
		if(!this.barHp_Internal&&this.uiWidgetBase) {
			this.barHp_Internal = this.uiWidgetBase.findChildByPath('Canvas/hpNode/barHp') as mw.ProgressBar
		}
		return this.barHp_Internal
	}
	private thumbImage_Internal: mw.Image
	public get thumbImage(): mw.Image {
		if(!this.thumbImage_Internal&&this.uiWidgetBase) {
			this.thumbImage_Internal = this.uiWidgetBase.findChildByPath('Canvas/hpNode/thumbImage') as mw.Image
		}
		return this.thumbImage_Internal
	}
	private txtHp_Internal: mw.TextBlock
	public get txtHp(): mw.TextBlock {
		if(!this.txtHp_Internal&&this.uiWidgetBase) {
			this.txtHp_Internal = this.uiWidgetBase.findChildByPath('Canvas/hpNode/txtHp') as mw.TextBlock
		}
		return this.txtHp_Internal
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
         this.setLanguage(this.txtName)
	
         this.setLanguage(this.txtTitle)
	
         this.setLanguage(this.txtChat)
	
         this.setLanguage(this.txtHp)
	
 
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
 