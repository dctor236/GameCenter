import { EventsName, PlayerStateType } from "../../../const/GameEnum";
import { PropModuleC } from "../../prop/PropModuleC";
import { ModuleBaseC, ModuleBaseS } from "../base/ModuleBase";

enum StateEvent {
    net_SetPlayerState = "net_SetPlayerState"
}
/**
 * @Author       : meta
 * @Date         : 2023-05-08 19:03:16
 * @LastEditors  : meta
 * @LastEditTime : 2023-05-09 14:26:45
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\modules\StateModule.ts
 * @Description  : 
 */

/**
 * 玩家状态管理 客户端 控制玩家所处状态
 */
export class StateModuleC extends ModuleBaseC {
    private _myState: number[] = [];

    protected onStart(): void {
        Event.addServerListener(StateEvent.net_SetPlayerState, (stateType: number, active: boolean = true) => {
            this.setMyState(stateType, active, false)
        })
    }

    /**
     * 判断一个player是否繁忙
     * @param player 玩家
     * @returns true-繁忙 false-空闲
     */
    public playerIsBusy(): boolean {
        return this._myState.length > 0;
    }

    /**
     * 设置状态
     * @param stateType 
     * @param active 
     * @param isSync 
     */
    public setMyState(stateType: PlayerStateType, active: boolean, isSync: boolean = true) {
        if (stateType == PlayerStateType.Interaction) {
            ModuleService.getModule(PropModuleC).setFlyState(!active);
        }
        if (active) {
            if (!this._myState.includes(stateType)) {
                this._myState.push(stateType);
            }
        } else {
            if (this._myState.includes(stateType)) {
                this._myState.splice(this._myState.indexOf(stateType), 1);
            }
        }
        if (stateType == PlayerStateType.Fly) Event.dispatchToLocal(EventsName.PLAYER_FLY, active);
        if (isSync) Event.dispatchToServer(StateEvent.net_SetPlayerState, stateType, active)
        Event.dispatchToLocal(EventsName.PLAYER_STATE, stateType, active)
    }

    public getMyAction(): number[] {
        return this._myState;
    }
}

/**
 * 玩家状态管理 服务器端 控制玩家所处状态
 */
export class StateModuleS extends ModuleBaseS {
    private playerStateMap: Map<number, number[]> = new Map();//玩家当前的行为类型

    protected onStart(): void {
        Event.addClientListener(StateEvent.net_SetPlayerState, (player: mw.Player, actionType: number, active: boolean) => {
            this.net_SetPlayerState(player.playerId, actionType, active)
        })
    }

    public onPlayerLeft(player: mw.Player): void {
        const playerID = player.playerId
        if (this.playerStateMap.has(playerID)) {
            this.playerStateMap.delete(playerID)
        }
    }

    public onPlayerEnterGame(player: mw.Player): void {
        const playerID = player.playerId
        if (!this.playerStateMap.has(playerID)) {
            this.playerStateMap.set(playerID, [])
        }
    }

    net_SetPlayerState(playerID: number, stateType: number, active: boolean = true) {
        const actionArr = this.playerStateMap.get(playerID)
        if (active) {
            actionArr.push(stateType)
        } else {
            actionArr.splice(actionArr.indexOf(stateType), 1)
        }
    }

    /**
     * 设置一个player行为状态
     * @param player 玩家
     * @param stateType 行为类型
     */
    public setPlayerState(player: mw.Player | number, stateType: number, active: boolean = true) {
        let playerID: number = (player instanceof mw.Player) ? player.playerId : player;
        let actionArr: number[] = []
        if (this.playerStateMap.has(playerID)) {
            actionArr = this.playerStateMap.get(playerID)
            if (active) {
                if (!actionArr.includes(stateType)) {
                    actionArr.push(stateType);
                }
            } else {
                if (actionArr.includes(stateType)) {
                    actionArr.splice(actionArr.indexOf(stateType), 1);
                }
            }
        }
        Event.dispatchToClient(Player.getPlayer(playerID), StateEvent.net_SetPlayerState, stateType, active)
    }

    /**
     * 判断一个player是否繁忙
     * @param player 玩家
     * @returns true-繁忙 false-空闲
     */
    public playerIsBusy(player: mw.Player | number): boolean {
        let playerId: number = (player instanceof mw.Player) ? player.playerId : player;
        return this.playerStateMap.get(playerId).length > 0
    }
}