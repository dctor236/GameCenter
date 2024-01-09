import { GameConfig } from "../../config/GameConfig";
import { UIHide, UIIsShow, UIManager } from "../../ExtensionType";
import { CameraType } from "../../ui/cameraUI/CameraMainUI";
import { ItemType } from "../bag/BagDataHelper";
import { BagModuleC } from "../bag/BagModuleC";
import { GameModuleC } from "../gameModule/GameModuleC";
import { PropBaseModuleC } from "../squareBase/PropBase/PropBaseModule";
import { mathTools_firstPlaceNumber, PropBaseType } from "../squareBase/PropBase/PropTool";
import { Prefab } from "./Prefab";
import { PropModuleS } from "./PropModuleS";

export enum ClothType {
	behindHair = "behindHair",
	frontHair = "frontHair",
}

/**
 * 背包模块 客户端 设置
 */
export class PropModuleC extends PropBaseModuleC<PropModuleS, null> {
	private _clothMap: Map<string, string> = new Map();
	private _headTimer
	private _curShow: any;
	private _prefabPoolMap: Map<string, Prefab[]> = new Map()

	get clickAction() {
		return this.ui_action.action
	}

	get clickPlace() {
		return this.ui_Placement.action
	}

	public onStart(): void {
		super.onStart();
	}
	public net_UseCamera(cameraType: CameraType) {
		console.log('开始相机模式 cameraType：' + cameraType);
		ModuleService.getModule(GameModuleC).propShowCameraPanel(cameraType);
	}

	public net_controlPropState(propID: number, bo: boolean, param1?: any, param2?: any): void {
		let type = null
		const item = ModuleService.getModule(BagModuleC).getCurEquipItem()
		if (item) {
			type = GameConfig.Item.getElement(item.configID).ItemType
		}
		if (bo && ![ItemType.LiYue, ItemType.Sundries].includes(type)) {
			return
		}
		super.net_controlPropState(propID, bo, param1, param2)
	}

	public setUIHide() {
		if (UIIsShow(this["ui_action"])) {
			this._curShow = this["ui_action"]
			UIHide(this._curShow)
		}

		if (UIIsShow(this["ui_fly"])) {
			this._curShow = this["ui_fly"]
			UIHide(this._curShow)
		}

		if (UIIsShow(this["ui_Placement"])) {
			this._curShow = this["ui_Placement"]
			UIHide(this._curShow)
		}
	}
	public setUIShow() {
		UIManager.showUI(this._curShow)
		this._curShow = null;
	}

	public setFlyState(isFly: boolean) {
		if (isFly) {
			this.ui_fly.mBtn.enable = true;
			this.ui_fly.forbidden.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.ui_fly.mBtn.enable = false;
			if (!this.ui_fly._isActive) {
				this.ui_fly.mBtn.onClicked.broadcast();
			}
			this.ui_fly.forbidden.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
	}

	public propClickEnd(propId: number): void {
		console.log("道具点击@@@@@@@@@@@@@@@@@@@@@", propId)
		if (mathTools_firstPlaceNumber(propId) == PropBaseType.Action) {
			setTimeout(() => {
				ModuleService.getModule(BagModuleC).useSquareItem(propId);
			}, GameConfig.PropAction.getElement(propId).ActionOldTime * 1000);
		} else if (mathTools_firstPlaceNumber(propId) == PropBaseType.Fly) {
			console.log("飞行点击@@@@@@@@@@@@@@@@@@@@@")
			return;
		} else {
			ModuleService.getModule(BagModuleC).useSquareItem(propId);
		}
	}


	public async net_SpawnPrefab(guid: string, time: number, loc: mw.Vector) {
		let objPool: Prefab[]
		if (!this._prefabPoolMap.has(guid)) {
			objPool = []
			this._prefabPoolMap.set(guid, objPool)
		} else {
			objPool = this._prefabPoolMap.get(guid);
		}
		let prefab: Prefab;
		let isNew: boolean = true
		for (let i = 0; i < objPool.length; i++) {
			const element = objPool[i]
			if (!element.isActive) {
				prefab = element;
				isNew = false;
				break;
			}
			if (i == 30) {
				prefab = objPool.shift()
				objPool.push(prefab)
				isNew = false;
			}
		}
		if (isNew) {
			prefab = new Prefab(guid);
			objPool.push(prefab)
		}
		await prefab.spawn(time, true);
		prefab.obj.worldTransform.position = loc
	}

	protected onUpdate(dt: number): void {
		for (const [guid, prefabPool] of this._prefabPoolMap) {
			for (let i = 0; i < prefabPool.length; i++) {
				const element = prefabPool[i];
				if (element.isActive) {
					element.life -= dt;
					if (element.life <= 0) {
						element.despawn()
					}
				}
			}
		}
	}

	protected onDestroy(): void {
		for (const [guid, prefabPool] of this._prefabPoolMap) {
			for (let i = 0; i < prefabPool.length; i++) {
				const element = prefabPool[i];
				element.destory()
			}
		}
	}
}