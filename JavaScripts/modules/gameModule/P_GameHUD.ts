
/*
 * @Author: jiezhong.zhang
 * @Date: 2023-01-16 13:41:22
 * @LastEditors: 代纯 chun.dai@appshahe.com
 * @LastEditTime: 2023-06-30 22:42:24
 */
import { GameConfig } from "../../config/GameConfig";
import { EmTaskState, EmTaskType, EventsName, PlayerStateType } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { GlobalModule } from "../../const/GlobalModule";
import { MyAction, MyAction1, Tween, UICreate, UIManager } from "../../ExtensionType";
import { PlayerMgr } from "../../ts3/player/PlayerMgr";
import Game_HUD_Generate from "../../ui-generate/uiTemplate/gameModule/Game_HUD_generate";
import BackSelectUI from "../../ui/BackSelectUI";
import GameUtils from "../../utils/GameUtils";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import NPCModule_C from "../npc/NPCModule_C";
import { TaskModuleC } from "../taskModule/TaskModuleC";

const creationViewPos = mw.Vector2.zero;

const outPixelPos = mw.Vector2.zero;

const outViewPos = mw.Vector2.zero;

export default class P_GameHUD extends Game_HUD_Generate {
	//事件
	public onJump: Action = new Action();
	public onExitInteractive: Action = new Action();
	public onJoyStickInput: Action1<mw.Vector2> = new Action1<mw.Vector2>();
	public onStar: Action = new Action();

	public mVirtualJoystick: mw.VirtualJoystickPanel = null; //摇杆
	private mTouchPad: mw.TouchPad = null; //相机滑动区域

	private _uiCanvasMap: Map<string, mw.Widget> = new Map<UIType, mw.Widget>();
	/**拍照 */
	public clickEnterCameraAC: MyAction = new MyAction();
	/**换装 */
	public clickResetClothBtnAC: MyAction = new MyAction();

	public isNPCInterect: boolean = true

	protected onAwake() {
		super.onAwake();
		this.layer = mw.UILayerBottom;
	}

	public onStart() {
		this.canUpdate = true;

		gameHudRootCanvas = this.rootCanvas;

		for (let i = 0; i < this.rootCanvas.getChildrenCount(); i++) {
			Object.values(UIType).forEach((j) => {
				if (this.rootCanvas.getChildAt(i).name.includes(j)) {
					this._uiCanvasMap.set(j, this.rootCanvas.getChildAt(i));
					// break;
				}
			})
		}
		this.mButton_1.onClicked.add(this.clickOpenCameraBtn.bind(this));
		this.mBtnCloth.onClicked.add(() => {
			this.clickResetClothBtnAC.call();
		});

		this.mTouchPad = this.uiWidgetBase.findChildByPath("Canvas/JoyStick/MWTouchPadDesigner_1") as mw.TouchPad;
		this.mVirtualJoystick = this.uiWidgetBase.findChildByPath("Canvas/JoyStick/MWVirtualJoystick") as mw.VirtualJoystickPanel;
		this.mVirtualJoystick.onInputDir.add((vec: mw.Vector2) => {
			this.onJoyStickInput.call(vec);
		});

		this.mJump_btn.onPressed.add(() => {
			this.onJump.call();
		});

		this.mExitInteractive_btn.onClicked.add(() => {
			this.onExitInteractive.call();
		});
		this.mExitInteractive_btn.visibility = mw.SlateVisibility.Hidden;

		this.mBagBtn.onClicked.add(() => {
			Event.dispatchToLocal(EventsName.OpenBagPanel);
		});

		this.mBtnGuideTask.onClicked.add(() => {
			Event.dispatchToLocal(EventsName.RefreshTask)
			const curTask = ModuleService.getModule(TaskModuleC).getCurTaskData()
			if (curTask)
				MGSMsgHome.uploadMGS('ts_task', '玩家放弃对应任务，打一个点', { task_id: 'abandon_task' + (curTask.taskConfig - 1000 + 1) })
		})

		this.mNpcInternect.visibility = mw.SlateVisibility.Collapsed
		this.canvas_Task.visibility = mw.SlateVisibility.Collapsed
		this.mBtnNPCInter.onClicked.add(() => {
			if (this.isNPCInterect) {
				MGSMsgHome.uploadMGS('ts_action_click', '举起NPC的次数', { button: 'npc_hold' })
				GlobalModule.MyPlayerC.Action.foreceActionWithNpc(16, GlobalData.CurTalkNpc)
				this.mTexNpcInter.text = '放下'
				GlobalModule.MyPlayerC.State.setMyState(PlayerStateType.Interaction, true);
				Event.dispatchToLocal(EventsName.DoneTask, 1003, 1)
			}
			else {
				GlobalModule.MyPlayerC.Action.exitActionWithNpc()
				GlobalModule.MyPlayerC.State.setMyState(PlayerStateType.Interaction, false);
				this.mTexNpcInter.text = '举起'
			}
			this.isNPCInterect = !this.isNPCInterect
		})
		this.mTaskBtnCanvas.visibility = mw.SlateVisibility.Collapsed

		this.returnSchoolBtn.onClicked.add(() => {
			UIManager.show(BackSelectUI)
			MGSMsgHome.uploadMGS('ts_action_click', '玩家点击【返回学校】按钮', { button: 'backschool_btn' })
		})
		this.mBtnChange.onClicked.add(() => {
			GlobalModule.MyPlayerC.Cloth.showClothUI()
		});

		Event.addLocalListener(EventsName.ShowNpcInterect, (npcID: number) => {
			if (npcID != -1) {
				this.mNpcInternect.visibility = mw.SlateVisibility.SelfHitTestInvisible
			} else {
				if (GlobalData.CurInteractNpc == -1)
					this.mNpcInternect.visibility = mw.SlateVisibility.Collapsed
			}
			GlobalData.CurTalkNpc = npcID
		})

		// Event.addLocalListener(EventsName.ShowGuide, (id: number, state: boolean) => {
		// 	if (state) {
		// 		this.mTexGuideTask.text = "取消引导"
		// 	} else {
		// 		this.mTexGuideTask.text = '引导'
		// 	}
		// })


		Event.addLocalListener(EventsName.OnPlayerHpChange, (hpRate: number) => {
			if (hpRate <= 25) {
				this.img_low_hp.visibility = mw.SlateVisibility.SelfHitTestInvisible
			} else {
				this.img_low_hp.visibility = mw.SlateVisibility.Collapsed
			}
		})

		// this.mTexGuideTask.text = '放弃任务'

	}

	/**
	 * 获取部分cavas是否显示
	 * @param type
	 * @returns
	 */
	public getUITypeIsVisible(type: UIType): boolean {
		return this._uiCanvasMap.get(type).visible;
	}

	public setSchoolTime(time: number) {
		this.schoolTime.text = GameUtils.getTimeStringMS(time)
	}

	/**
	 * 获取指定的Canvas
	 * @param type
	 * @returns
	 */
	public getUITypeCanvas(type: UIType) {
		let result = this._uiCanvasMap.get(type);
		return result as mw.Canvas;
	}

	public setUIVisable(visable: boolean, ...param: UIType[]) {
		for (let val of param) {
			if (!this._uiCanvasMap.has(val)) continue;
			let result = this._uiCanvasMap.get(val);
			result.visibility = visable ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
		}
	}

	public setAllUIVisible(visible: boolean) {
		this._uiCanvasMap.forEach((value, key) => {
			value.visibility = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
		});
	}

	public clickOpenCameraBtn() {
		this.clickEnterCameraAC.call();
	}
	public getCameraUI() {
		return this;
	}

	onUpdate(dt: number) {

	}

	onShow(name: string) {
		// this.mName_txt.setText(namecc);
		MGSMsgHome.setPageMGS("main");
		this.resetJoyStick();
	}

	public setTouchPadEnabled(bool: boolean): void {
		this.mTouchPad.enable = bool;
	}
	public showExitInteractiveBtn(isShow: boolean) {
		if (isShow) {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Visible;
			this.mJump_btn.visibility = mw.SlateVisibility.Hidden;
		} else {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Hidden;
			this.mJump_btn.visibility = mw.SlateVisibility.Visible;
		}
	}

	public camera_FP(isShow: boolean) {
		// this.mRightDownCon.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
		this.camera_Other(isShow);
	}
	public camera_Other(isShow: boolean) {
		this.canvas_Expression.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
		this.mIdCard_btn.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
		this.mPulloff_btn.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
		this.mBtn_Trans.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;

	}
	/**修改右下Canvas显隐状态 */
	public changeRightDownCanvasState(isShow: boolean) {
		this.mRightDownCon.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
	}

	public changeJoyStickState(isShow: boolean) {
		// this.mVirtualJoystick.isLocationFixed = true;
		this.resetJoyStick();
		this.mVirtualJoystick.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
	}


	public resetJoyStick() {
		this.mVirtualJoystick?.resetJoyStick();
	}

	public changeJumpBtnState(isShow: boolean) {
		this.mRightDownCon.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
	}

	/**
   * 刷新支线任务表现
   */
	public refreshBranchTask() {
		const task = ModuleService.getModule(TaskModuleC).getCurTaskData();
		if (task) {
			if (this.canvas_Task.visibility == mw.SlateVisibility.Collapsed) {
				this.canvas_Task.visibility = mw.SlateVisibility.SelfHitTestInvisible
			}
			const cfg = GameConfig.Task.getElement(task.taskConfig);

			if (task.taskState == EmTaskState.NoAccept) {
				this.mBtnGuideTask.visibility = mw.SlateVisibility.Hidden
				this.mAward.visibility = mw.SlateVisibility.Hidden
				const npc = ModuleService.getModule(NPCModule_C).getNpc(task.acceptNpc)
				this.txt_task_Des.text = StringUtil.format(cfg.taskInfo[task.taskState - 1], npc.client.npcName)
			} else if (task.taskState == EmTaskState.Doing) {
				this.mBtnGuideTask.visibility = mw.SlateVisibility.Visible
				this.mAward.visibility = mw.SlateVisibility.SelfHitTestInvisible
				const config = GameConfig.Task.getElement(task.taskConfig)
				this.img_Icon.imageGuid = config.rewardImgGuid ? config.rewardImgGuid : "163381"
				this.txt_num.text = config.taskRewardNum + ''
				this.txt_task_Des.text = StringUtil.format(cfg.taskInfo[task.taskState - 1]) + "[" + task.curSolveTime + '/' + cfg.taskSolvetime + ']'
			}
			this.txt_task_Title.text = cfg.taskName[task.taskState - 1]
		}
	}

}

export enum UIType {
	Card = 'Card',
	Pulloff = 'Pulloff',
	Expression = 'Expression',
	Camera = "Camera",
	Action = "Action",
	Bag = "Bag",
	Task = 'canvas_Task',
	School = 'School',
	NpcInternect = 'NpcInternect',
	Dress = "Dress",
	Return = 'mCanvasReturn',
	ClothReset = 'mCanvasClothReset'
}

export let gameHudRootCanvas: mw.Canvas = null;
