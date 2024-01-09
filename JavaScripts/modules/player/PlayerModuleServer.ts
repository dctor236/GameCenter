/** 
 * @Author       : meta
 * @LastEditors  : meta
 * @Date         : 2023-06-09 16:52
 * @LastEditTime : 2023-06-27 16:38
 * @description  : 
 */

import IPlayerModuleBase from "./base/IPlayerModuleBase";
import { ActionModuleS } from "./modules/ActionModule";
import { ClothModuleS } from "./modules/ClothModule";
import { StateModuleS } from "./modules/StateModule";
import { PlayerData } from "./PlayerData";
import PlayerModuleClient from "./PlayerModuleClient";

/**
 * @Author       : meta
 * @Date         : 2023-05-08 16:50:26
 * @LastEditors  : meta
 * @LastEditTime : 2023-06-05 14:01:39
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\PlayerModuleServer.ts
 * @Description  : 
 */

/**
 * 玩家模块服务器端,管理玩家的服装 状态,动作属性
 */
export default class PlayerModuleServer extends ModuleS<PlayerModuleClient, PlayerData> implements IPlayerModuleBase {
    public Cloth: ClothModuleS
    public State: StateModuleS
    public Action: ActionModuleS

    protected onStart(): void {
        this.Cloth = new ClothModuleS(this)
        this.State = new StateModuleS(this)
        this.Action = new ActionModuleS(this)
        this.Cloth["onStart"]()
        this.State["onStart"]()
        this.Action["onStart"]()
    }

    /**
     * 获取玩家数据
     * @param player 玩家实例 
     * @returns 
     */
    getDataByPlayer(player: mw.Player | number) {
        return this.getPlayerData(player)
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.init(player)
    }

    private async init(player: mw.Player) {
        await this.Cloth.onPlayerEnterGame(player)
        await this.State.onPlayerEnterGame(player)
        await this.Action.onPlayerEnterGame(player)
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.Cloth.onPlayerLeft(player)
        this.State.onPlayerLeft(player)
        this.Action.onPlayerLeft(player)
    }
}