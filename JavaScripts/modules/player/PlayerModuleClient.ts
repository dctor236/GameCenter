import { setMyCharacterGuid, setMyPlayerID } from "../../ExtensionType";
import IPlayerModuleBase from "./base/IPlayerModuleBase";
import { ActionModuleC } from "./modules/ActionModule";
import { ClothModuleC } from "./modules/ClothModule";
import { StateModuleC } from "./modules/StateModule";
import { PlayerData } from "./PlayerData";
import PlayerModuleServer from "./PlayerModuleServer";

/**
 * @Author       : meta
 * @Date         : 2023-05-08 16:50:15
 * @LastEditors  : meta
 * @LastEditTime : 2023-06-08 09:44:12
 * @LastEditTime : 2023-05-09 11:15:17
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\PlayerModuleClient.ts
 * @Description  : 
 */

/**
 * 玩家模块客户端,管理玩家的服装 状态,动作属性
 */
export default class PlayerModuleClient extends ModuleC<PlayerModuleServer, PlayerData> implements IPlayerModuleBase {
    public Cloth: ClothModuleC
    public State: StateModuleC
    public Action: ActionModuleC

    protected onStart(): void {
        setMyPlayerID(this.localPlayerId);
        setMyCharacterGuid(this.localPlayer.character.gameObjectId);
        this.Cloth = new ClothModuleC(this)
        this.State = new StateModuleC(this)
        this.Action = new ActionModuleC(this)
        this.Cloth["onStart"]()
        this.State["onStart"]()
        this.Action["onStart"]()
    }

    getDataByPlayer(playerID: number) {
        return this.data
    }

    protected onEnterScene(sceneType: number): void {
        this.init(sceneType)
    }

    private async init(sceneType: number) {
        await Player.asyncGetLocalPlayer();
        if (!this.localPlayer) {
            console.error("玩家初始化可能失败了")
            return;
        }
        await this.Cloth.onEnterScene(sceneType)
        await this.State.onEnterScene(sceneType)
        await this.Action.onEnterScene(sceneType)
    }
}
