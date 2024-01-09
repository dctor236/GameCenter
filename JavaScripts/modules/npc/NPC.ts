/**
 * @Author       : meta
 * @Date         : 2023-01-13 18:39:03
 * @LastEditors  : meta
 * @LastEditTime : 2023-05-09 10:44:33
 * @FilePath     : \mollywoodschool\JavaScripts\modules\npc\NPC.ts
 * @Description  : 
 */



import { GameConfig } from "../../config/GameConfig";
import GameUtils from "../../utils/GameUtils";
import { NPCClient } from "./NPCClient";
import NPCModule_C from "./NPCModule_C";
import { NPCServer } from "./NPCServer";

export namespace NPC_Events {
	export const NPC_OnClickItem = "NPC_OnClickItem";
	export const NPC_OnClickRob = "NPC_OnClickRob";
	export const NPC_OnClickoff = "NPC_OnClickOff";
	export const NPC_Stop = "NPC_Stop";
	export const NPC_Start = "NPC_Start";
	export const NPC_On = "NPC_On";
	export const NPC_Register = "NPC_Register";
	export const NPC_HidePanle = "NPC_HidePanle";
}
@Component
export default class SP_NPC extends mw.Script {

	@mw.Property({ displayName: "NPC ID" })
	public id = 0;
	@mw.Property({ displayName: "触发器" })
	private triggerGuid: string = "";
	@mw.Property({ displayName: "是否为多足对象" })
	public FourFootStandard: boolean = false;
	/**跟随玩家 */
	@mw.Property({ replicated: true, onChanged: "propertyChanged", hideInEditor: true })
	public playerId = 0;

	private server: NPCServer = null;
	public client: NPCClient = null;
	/**是否为双端NPC */
	private _isServerNpc: boolean = false;

	public get isServerNpc(): boolean {
		return this._isServerNpc;
	}

	public playerLeave: mw.Action = new mw.Action();
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected async onStart(): Promise<void> {
		const character = await this.gameObject.asyncReady() as mw.Character;
		if (!GameUtils.isAICharacter(character)) return
		if (this.id === 0) {
			console.error('npc config 出错 this.gameObject.guid:' + this.gameObject.gameObjectId)
			return;
		}
		const config = GameConfig.NPCConfig.getElement(this.id);
		if (SystemUtil.isClient()) {
			this.client = new NPCClient(character, config);
			let id = setInterval(() => {
				if (ModuleService.getModule(NPCModule_C)) {
					this.client.init(this.triggerGuid, this.gameObject.gameObjectId, this);
					ModuleService.getModule(NPCModule_C).registerNPC(this);
					clearInterval(id);
				}
			}, 32)
		} else {
			setTimeout(() => {
				this.server = new NPCServer(character, config, this, this.gameObject.gameObjectId);
				this._isServerNpc = true;
			}, 3000);

		}
		this.useUpdate = true;
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.useUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {

	}


}