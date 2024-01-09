import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../config/GameConfig";
import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { GlobalModule } from "../../const/GlobalModule";
import { CloseAllUI, ShowAllUI, UIManager } from "../../ExtensionType";
import { InputManager } from "../../InputManager";
import { ResManager } from "../../ResManager";
import RainBowRaceMgr from "../../SceneScript/RainBowRace";
import { PlayerMgr } from "../../ts3/player/PlayerMgr";
import { CameraType } from "../../ui/cameraUI/CameraMainUI";
import { SettingUI } from "../../ui/SettingUI";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import { CameraModuleC } from "../camera/CameraModule";
import CG from "../cg/CG";
import GMBasePanelUI from "../gm/GMBasePanelUI";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import { P_NPCPanel } from "../npc/NPCPanel";
import { PropModuleC } from "../prop/PropModuleC";
import ShopModuleC from "../shop/ShopModuleC";
import { GameModuleData } from "./GameData";
import { IGameModuleS } from "./GameModuleS";
import P_GameHUD, { UIType } from "./P_GameHUD";
import { CameraCG } from "module_cameracg";
import { TaskModuleC } from '../taskModule/TaskModuleC';

const MGSEnvirguid = [
	'0AF4D2A2',//进大门
	'12B70ED3',//山脚下
	'1E5FA546'//山顶
]

const MgsEnvir = [
	'enter_village',
	'enter_vally',
	'enter_vallytop'
]
const MgsInfo = [
	'进入大门的玩家数量',
	'到达藤蔓区域的玩家数量',
	'到达藤蔓顶端的次数'
]
export interface IGameModuleC {
	net_playHallBGM(): void;
}

/**
 *游戏模块 客户端 控制游戏中的全局属性 
 */
export class GameModuleC extends ModuleC<IGameModuleS, GameModuleData> implements IGameModuleC {
	public hudPanel: P_GameHUD;
	public curBgmID: number = 13;

	private btnExitInteractiveCallback: () => void;
	private moveExitInteractiveCallback: () => void;
	private jumpExitInteractiveCallback: () => void;
	private _valleyTop: mw.GameObject = null

	onStart() {
		this.hudPanel = mw.UIService.create(P_GameHUD);
		this.hudPanel.clickResetClothBtnAC.add(() => {
			MGSMsgHome.setBtnClick("cloth_btn");
			GlobalModule.MyPlayerC.Cloth.resetPlayerCloth();
		});
		this.hudPanel.onJump.add(() => {
			GlobalModule.MyPlayerC.Action.cleanStance();
			if (!this.localPlayer.character.isJumping) {
				Event.dispatchToLocal(EventsName.PLAYER_JUMP);
			}
			this.localPlayer.character.jump();
		}, this);
		//身份牌
		this.hudPanel.mIdCard_btn.onClicked.add(() => {
			UIManager.show(SettingUI);
		});

		/**点击退出交互物按钮 */
		this.hudPanel.onExitInteractive.add(() => {
			if (this.btnExitInteractiveCallback != null) {
				this.btnExitInteractiveCallback();
				this.btnExitInteractiveCallback = null;
			}
		}, this);
		/**摇杆移动事件 */
		this.hudPanel.onJoyStickInput.add((v: mw.Vector2) => {
			if (this.moveExitInteractiveCallback != null) {
				this.moveExitInteractiveCallback();
				this.moveExitInteractiveCallback = null;
			}
		});
		this.hudPanel.onJump.add(() => {
			if (this.jumpExitInteractiveCallback != null) {
				this.jumpExitInteractiveCallback();
				this.jumpExitInteractiveCallback = null;
			}
		});


		let flag2: boolean = false
		InputManager.instance.onKeyDown(mw.Keys.F2).add(() => {
			UIManager.setAllMiddleAndBottomPanelVisible(flag2);
			flag2 = !flag2
		})
		Event.addLocalListener("PlayButtonClick", () => {
			SoundService.stopSound("136199");
			SoundService.playSound("136199");
		});

	}

	//进入场景
	onEnterScene(sceneType: number): void {
		CG.instance.trainDeparture(() => {
			const char = Player.localPlayer.character
			char.displayName = ''
			char.setVisibility(PropertyStatus.On)
			let selfName: string = Player.localPlayer.character.displayName;
			UIManager.showUI(this.hudPanel, mw.UILayerBottom, selfName);
			this.hudPanel.clickEnterCameraAC.add(this.showCameraPanel.bind(this));
			if (GlobalData.isOpenGM) {
				this.addGM();
				new GMBasePanelUI().show();
			}
			this.hudPanel.mPulloff_btn.onClicked.add(() => {
				MGSMsgHome.uploadMGS('ts_action_click', '玩家点击【卡住点我】按钮', { button: 'return_btn' })
				this.resetPos();
			});

			//3Dui多语言
			this.uiLanguage();
			let npc = mw.UIService.create(P_NPCPanel);
			UIManager.showUI(npc);
			this.loginChoose();
			this.net_playHallBGM();
			ModuleService.getModule(CameraModuleC).resetCameraAttach()
			RainBowRaceMgr.instance.init()
			Player.asyncGetLocalPlayer().then(async p => {
				await CameraCG.instance.init()
				setTimeout(() => {
					ModuleService.getModule(TaskModuleC).req_refreshATask()
				}, 3000);
			})
		})

		for (let i = 0; i < 3; i++) {
			const guid = MGSEnvirguid[i]
			const log = MgsEnvir[i]
			const info = MgsInfo[i]
			GameObject.asyncFindGameObjectById(guid).then(o => {
				const tri = o as mw.Trigger
				tri.onEnter.add((p) => {
					if (GameUtils.isPlayerCharacter(p)) {
						MGSMsgHome.uploadMGS('ts_game_result', info, { record: log })
					}
				})
				if (i == 2) {
					this._valleyTop = tri
				}
			})
		}

		//飓风前格子
		GameObject.asyncFindGameObjectById('2F1E81AC').then(o => {
			const tri = o as mw.Trigger
			tri.onEnter.add((actor) => {
				if (GameUtils.isPlayerCharacter(actor)) {
					MGSMsgHome.uploadMGS('ts_game_result', '玩家每次到达飓风点前一格落脚点，打一个点', { record: 'player_reach' })
				}
			})

			tri.onLeave.add(actor => {
				if (GameUtils.isPlayerCharacter(actor)) {
				}
			})
		})
	}

	private uiLanguage() {
		let allUI = GameConfig.Global.getElement(59).Value4; //所有3dui
		allUI.forEach(async item => {
			let top = (await ResManager.instance.findGameObjectByGuid(item)) as mw.UIWidget;
			if (!top) {
				console.log("guan log uiLanguage top:" + top + ",item:" + item);
				return;
			}
			let uiRoot = top.getTargetUIWidget().rootContent;
			for (let i = 0; i < uiRoot.getChildrenCount(); i++) {
				let item = uiRoot.getChildAt(i);
				if (!(item instanceof mw.TextBlock)) {
					continue;
				}
				let ui = item as mw.TextBlock;
				let key: string = ui.text;
				if (key) {
					let data = GameUtils.getLanguage(key);
					if (data) {
						ui.text = data.info;
						if (data.size > 0) {
							ui.fontSize = data.size;
						}
					}
				}
			}
		});
	}

	/**
	 * 重置玩家位置
	 */
	public resetPos() {
		if (this.btnExitInteractiveCallback != null) {
			this.btnExitInteractiveCallback();
			this.btnExitInteractiveCallback = null;
		}
		GlobalModule.MyPlayerC.Action.off();
		setTimeout(() => {
			const distance = Vector.squaredDistance(PlayerMgr.Inst.mainPos, this._valleyTop.worldTransform.position)
			let pos: Vector
			if (distance <= 5000 * 5000) {
				pos = new Vector(4404.530, 1276, 13837)
			} else {
				pos = GlobalData.globalPos
			}
			this.server.net_ResetPos(pos);
			Event.dispatchToLocal("PlayerClickDeliverFootBall");
		}, 500);
	}

	protected onUpdate(dt: number): void {

	}
	private addGM() {
		let cgActive = false;
		AddGMCommand("开启CG编辑器", (player: mw.Player, value: string) => {
			cgActive = !cgActive
			if (cgActive) {
				CloseAllUI()
				CameraCG.instance.openEditor()
			} else {
				ShowAllUI()
				CameraCG.instance.closeEditor()
			}
		});

		AddGMCommand("一键关闭所有怪物行动", (player: mw.Player, value: string) => {
			Event.dispatchToServer("CloshAllMonset")
		});

		let isActive = true;
		AddGMCommand("传送到目的地(输入坐标|||)", (player: mw.Player, value: string) => {
			const v = value.split("|").map(v => Number(v));
			const x = v[0] ? v[0] : 4600.500;
			const y = v[1] ? v[1] : 1093.990;
			const z = v[2] ? v[2] : 13343.300;
			const character = Player.localPlayer.character;
			character.worldTransform.position = new Vector(x, y, z);
		});
		AddGMCommand("一键关闭所有HUDUI", (player: mw.Player, value: string) => {
			isActive = !isActive
			this.hudPanel.setAllUIVisible(isActive)
		});
		AddGMCommand("加钱1金币2豌豆", (player: mw.Player, value: string) => {
			const v = value.split(",").map(v => Number(v));
			const id = v[0];
			const count = v[1] ? v[1] : 1;
			id && ModuleService.getModule(ShopModuleC).req_addCoin(id, count, false)
		});
		AddGMCommand("添加造物物品", (player: mw.Player, value: string) => {
			const v = value.split(",").map(v => Number(v));
			const id = v[0];
			const count = v[1] ? v[1] : 1;
			id && ModuleService.getModule(BagModuleC).addCreationItem(id, count);
		});
		AddGMCommand("添加指定物品", (player: mw.Player, value: string) => {
			ModuleService.getModule(BagModuleC).addItem(Number(value));
		});
		AddGMCommand("添加所有物品", (player: mw.Player, value: string) => {
			const allItemLst = GameConfig.Item.getAllElement();
			for (const item of allItemLst) {
				if ([1, 5, 6].includes(item.ItemType)) ModuleService.getModule(BagModuleC).addItem(item.ID, 1, false);
			}
		});

	}

	/**
	 * 监听退出交互物的操作
	 * @param type 类型 1-按钮退出 2-行走和跳跃退出 3-跳跃退出
	 * @param Callback 退出的回调
	 */
	public addExitInteractiveListener(type: number, Callback: () => void) {
		if (type == 1) {
			this.hudPanel.showExitInteractiveBtn(true);
			this.btnExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.jumpExitInteractiveCallback = null;
		} else if (type == 2) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.moveExitInteractiveCallback = Callback;
			this.jumpExitInteractiveCallback = Callback;
			this.btnExitInteractiveCallback = null;
		} else if (type == 3) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.jumpExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.btnExitInteractiveCallback = null;
		}
	}
	public removeExitInteractiveListener() {
		this.btnExitInteractiveCallback = null;
		this.moveExitInteractiveCallback = null;
		this.jumpExitInteractiveCallback = null;
		this.hudPanel.showExitInteractiveBtn(false);
	}

	public setUIstate(bool: boolean) {
		if (bool) {
			GlobalModule.MyPlayerC.Action.changePanelState(true);
			ModuleService.getModule(PropModuleC).setUIShow();
			ModuleService.getModule(BagModuleC).setHubVis(true);
			this.hudPanel.setUIVisable(true, UIType.Dress);
			if (!this.hudPanel.visible) UIManager.showUI(this.hudPanel);
		} else {
			GlobalModule.MyPlayerC.Action.changePanelState(false);
			ModuleService.getModule(PropModuleC).setUIHide();
			ModuleService.getModule(BagModuleC).setHubVis(false);
			this.hudPanel.setUIVisable(false, UIType.Dress);
		}
	}

	/**相机功能--修改主页UI显隐状态 */
	public changeHUDState(cameraType: CameraType) {
		if (cameraType == CameraType.Camera_FP) {
			this.hudPanel.camera_FP(false);
			ModuleService.getModule(BagModuleC).setHubVis(false);
			GlobalModule.MyPlayerC.Action.changePanelState(false);
			ModuleService.getModule(PropModuleC).setUIHide();
			this.hudPanel.setUIVisable(false, UIType.Dress, UIType.Bag, UIType.School, UIType.Return, UIType.ClothReset, UIType.Task);
		} else if (cameraType == CameraType.Null) {
			this.hudPanel.camera_FP(true);
			ModuleService.getModule(BagModuleC).setHubVis(true);
			GlobalModule.MyPlayerC.Action.changePanelState(true);
			ModuleService.getModule(PropModuleC).setUIShow();
			this.hudPanel.setUIVisable(true, UIType.Camera, UIType.Dress, UIType.Card, UIType.Bag, UIType.School, UIType.Return, UIType.ClothReset, UIType.Task);
		} else {
			this.hudPanel.camera_FP(true);
			this.hudPanel.camera_Other(false);
			ModuleService.getModule(BagModuleC).setHubVis(false);
			GlobalModule.MyPlayerC.Action.changePanelState(false);
			ModuleService.getModule(PropModuleC).setUIHide();
			this.hudPanel.setUIVisable(false, UIType.Dress, UIType.Bag, UIType.School, UIType.Return, UIType.ClothReset, UIType.Task);
		}
	}

	public showCameraPanel(isOutCall: boolean = false) {
		ModuleService.getModule(BagModuleC).setHubVis(false);
		ModuleService.getModule(CameraModuleC).showCamera(isOutCall);
		// UIHide(this.cameraEnterPanel)
		this.hudPanel.setUIVisable(false, UIType.Camera);
		MGSMsgHome.setBtnClick("open");
		MGSMsgHome.setBtnClick("camera_btn");
	}

	public IsTakePhotos(is: boolean) {
		this.hudPanel.changeRightDownCanvasState(is);
	}

	public changeJoyStickState(is: boolean) {
		this.hudPanel.changeJoyStickState(is);
	}

	public propShowCameraPanel(cameraType: CameraType) {
		this.showCameraPanel(true);
		// UIHide(this.cameraEnterPanel)
		this.hudPanel.setUIVisable(false, UIType.Camera);
		ModuleService.getModule(CameraModuleC).switchCamera(cameraType);
	}
	/**
	 * 登录设置身份牌
	 * @param occupation
	 * @returns
	 */
	private loginChoose() {
		let nickName = mw.AccountService.getNickName();
		this.server.net_PlayerLogin(!nickName ? this.localPlayer.character.displayName : nickName);
	}

	/**播放大厅音乐 */
	public net_playHallBGM() {
		let ID = 13;
		let cfg = GameConfig.Music.getElement(ID);
		mw.SoundService.playBGM(cfg.MusicGUID, cfg.Music);
		this.curBgmID = ID;
		const cs = Camera.currentCamera
		cs.preset = mw.CameraPreset.Default
		cs.springArm.length = 350
		cs.fov = 90
	}
	public net_playBattleBGM() {
		let ID = 75;
		let cfg = GameConfig.Music.getElement(ID);
		mw.SoundService.playBGM(cfg.MusicGUID, cfg.Music);
		this.curBgmID = ID;
		const cs = Camera.currentCamera
		cs.preset = mw.CameraPreset.TPSOverShoulderAngle
		cs.springArm.length = 350
		cs.fov = 120
		const bagModulec = ModuleService.getModule(BagModuleC);
		if (bagModulec.getItem(11101)) {
			bagModulec.addShortcutBarItem("11101", true)
		}
	}

}


