import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import { setMyCharacterGuid, setMyPlayerID } from "./ExtensionType";
import { BagModuleDataHelper } from "./modules/bag/BagDataHelper";
import { BagModuleC } from "./modules/bag/BagModuleC";
import { BagModuleS } from "./modules/bag/BagModuleS";
import { CameraModuleC, CameraModuleS } from "./modules/camera/CameraModule";
import { Chat_Client, Chat_Server } from "./modules/chat/Chat";
import { GameModuleData } from "./modules/gameModule/GameData";
import { GameModuleC } from "./modules/gameModule/GameModuleC";
import { GameModuleS } from "./modules/gameModule/GameModuleS";
import { InteractModuleClient } from "./modules/interactModule/InteractModuleClient";
import { InteractModuleServer } from "./modules/interactModule/InteractModuleServer";
import { PlayerMgsModuleData } from "./modules/mgsMsg/PlayerMgsMsgData";
import { NPCDataHelper } from "./modules/npc/NPCData";
import NPCModule_C from "./modules/npc/NPCModule_C";
import NPCModule_S from "./modules/npc/NPCModule_S";
import PlayerModuleClient from "./modules/player/PlayerModuleClient";
import PlayerModuleServer from "./modules/player/PlayerModuleServer";
import { PropModuleC } from "./modules/prop/PropModuleC";
import { PropModuleS } from "./modules/prop/PropModuleS";
import GameUtils from "./utils/GameUtils";
import ShopModuleS from "./modules/shop/ShopModuleS";
import ShopModuleC from "./modules/shop/ShopModuleC";
import ShopDataInfo from "./modules/shop/ShopDataInfo";
import TourModuleS from "./modules/tour/TourModuleS";
import TourModuleC from "./modules/tour/TourModuleC";
import { PlayerData } from "./modules/player/PlayerData";
import { MgsMsgModuleS, MgsMsgModuleC } from "./modules/mgsMsg/MgsMsgModule";
import FindModuleS from "./modules/find/FindModuleS";
import FindModuleC from "./modules/find/FindModuleC";
import SpiritModuleS from "./modules/spirit/SpiritModuleS";
import SpiritModuleC from "./modules/spirit/SpiritModuleC";
import { TS3 } from "./ts3/TS3";
import SkillModule_Server from "./modules/skill/SkillModule_Server";
import SkillModule_Client from "./modules/skill/SkillModule_Client";
import { TaskModuleC } from "./modules/taskModule/TaskModuleC";
import { TaskModuleS } from "./modules/taskModule/TaskModuleS";

@Component
class GameStart extends mw.Script {
	@mw.Property()
	private isOnline: boolean = false;
	@mw.Property({ displayName: "是否打开GM" })
	private isOpenGM = false;
	@mw.Property({ displayName: "是否开启cg" })
	private openCG = false;
	@mw.Property({ displayName: "多语言", selectOptions: { default: "-1", en: "0", zh: "1" } })
	private language: string = "-1";

	private isPlatFormChar = true;

	onStart() {
		super.onStart();
		DataStorage.setTemporaryStorage(!this.isOnline);
		GameUtils.systemLanguageIndex = Number(this.language);
		if (GameUtils.systemLanguageIndex == -1) {
			GameUtils.systemLanguageIndex = this.getSystemLanguageIndex();
		}
		if (SystemUtil.isClient()) {
			//初始化表格语言
			GameConfig.initLanguage(GameUtils.systemLanguageIndex, key => {
				let ele = GameConfig.SquareLanguage.getElement(key);
				if (ele == null) return "unknow_" + key;
				return ele.Value;
			});

			mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
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
			});
			this.setPlayerInfo()
		}
		GlobalData.isPlatFormChar = this.isPlatFormChar;
		GlobalData.isOpenGM = this.isOpenGM;
		GlobalData.openCG = this.openCG;
		GlobalData.globalPos = this.gameObject.worldTransform.position;
		this.useUpdate = true;
		this.onRegisterModule();
	}

	public async setPlayerInfo() {
		const player = await Player.asyncGetLocalPlayer();
		setMyPlayerID(player.playerId);
		setMyCharacterGuid(player.character.gameObjectId);
	}

	onUpdate(dt: number): void {
		super.onUpdate(dt);
		TweenUtil.TWEEN.update();
	}


	//获取系统语言索引
	private getSystemLanguageIndex(): number {
		let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
		if (!!language.match("en")) {
			return 0;
		}
		if (!!language.match("zh")) {
			return 1;
		}
		if (!!language.match("ja")) {
			return 2;
		}
		if (!!language.match("de")) {
			return 3;
		}
		return 0;
	}

	//当注册模块
	onRegisterModule(): void {
		TS3.init()
		//注册模块
		ModuleService.registerModule(PlayerModuleServer, PlayerModuleClient, PlayerData); //整体角色管理
		ModuleService.registerModule(GameModuleS, GameModuleC, GameModuleData); //负责大厅的一些UI点击
		ModuleService.registerModule(BagModuleS, BagModuleC, BagModuleDataHelper); //背包 和广场那边一样
		ModuleService.registerModule(Chat_Server, Chat_Client, null); //开放广场中的emjio 和快捷聊天
		ModuleService.registerModule(CameraModuleS, CameraModuleC, null); //拍照 相机视角切换
		ModuleService.registerModule(PropModuleS, PropModuleC, null); //背包中那些道具的使用
		ModuleService.registerModule(NPCModule_S, NPCModule_C, NPCDataHelper);//npc
		ModuleService.registerModule(SkillModule_Server, SkillModule_Client, null);//技能
		ModuleService.registerModule(InteractModuleServer, InteractModuleClient, null);//人&&物交互
		ModuleService.registerModule(TaskModuleS, TaskModuleC, null);//任务
		ModuleService.registerModule(ShopModuleS, ShopModuleC, ShopDataInfo);//服装
		ModuleService.registerModule(TourModuleS, TourModuleC, null);//向导
		ModuleService.registerModule(MgsMsgModuleS, MgsMsgModuleC, PlayerMgsModuleData); //埋点
		ModuleService.registerModule(FindModuleS, FindModuleC, null);//find物品
		ModuleService.registerModule(SpiritModuleS, SpiritModuleC, null);//精灵
	}
}
export default GameStart;
