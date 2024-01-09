import SpiritModuleC from "./SpiritModuleC";

/**
 * 精灵模块服务器端 控制精灵的行为 
 */
export default class SpiritModuleS extends ModuleS<SpiritModuleC, null> {
    private spiritMap: Map<number, number> = new Map()
    protected onStart(): void {
    }

    protected onUpdate(dt: number): void {

    }

    protected onPlayerLeft(player: mw.Player): void {
        const pid = player.playerId
        if (this.spiritMap.has(pid)) {
            const spiritList = this.spiritMap.get(pid)
            if (spiritList > 0) {
                this.asynFollow(JSON.stringify([]), pid)
            }
        }
    }

    net_asynFollow(str: string) {
        this.asynFollow(str, this.currentPlayerId)
    }

    /**
     * 同步给所有玩家精灵状态列表
     * @param str 
     * @param pid 
     */
    asynFollow(str: string, pid: number) {
        const list: string[] = JSON.parse(str)
        this.spiritMap.set(pid, list.length)
        Player.getAllPlayers().forEach(e => {
            if (e.playerId != pid) {
                this.getClient(e).net_onAsyncFollow(str, pid)
            }
        })
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}