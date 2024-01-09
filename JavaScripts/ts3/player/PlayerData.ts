import { LogMgr } from "../com/LogMgr";
import TsPlayer from "./TsPlayer";


export class PlayerData {
    private map: Map<string, TsPlayer> = new Map();
    public addPlayer(player: TsPlayer) {
        this.map.set(player.userId, player);
    }

    public delPlayer(uid: string) {
        if (!uid) {
            LogMgr.Inst.error('delPlayer id is null')
            return;
        }
        let tsp = this.map.get(uid)
        tsp.destroy()
        this.map.delete(uid);
    }
    public hasPlayer(uid: string): boolean {
        return this.map.has(uid);
    }
    public getPlayer(uid: string): TsPlayer {
        return this.map.get(uid);
    }
    public getAll(uid?: string): TsPlayer[] {
        if (SystemUtil.isClient()) {
            let dels = []
            for (let [k, v] of this.map) {
                if (!v || v.isOut())
                    dels.push(k)
            }
            for (let id of dels) {
                this.delPlayer(id)
            }
        }
        let list = [];
        for (let [k, v] of this.map) {
            if (!uid || uid != k)
                list.push(v)
        }
        return list;
    }

    /**
     * 获取范围內的玩家
     * @param range 范围
     * @param pos 中心点，默认主角位置
     * @param uid 排查的玩家
     */
    public getRangePlayer(pos: mw.Vector, range: number, uid: string): TsPlayer[] {
        let all = this.getAll(uid);
        let max = range * range
        let list = [];
        for (let p of all) {
            if (p.isDead())
                continue
            let dp = p.character?.worldTransform.position;
            if (Vector.squaredDistance(dp.set(dp.x, dp.y, pos.z), pos) <= max)
                list.push(p);
        }
        return list;
    }
    /**
     * 获取最近的玩家（可设范围）
     * @param range 范围
     * @param pos 中心点，默认主角位置
     * @param uid 排查的玩家
     */
    public getNearPlayer(pos, range: number, uid: string): TsPlayer {
        let all = this.getAll(uid);
        let max = range * range
        let player = null;
        for (let p of all) {
            if (p.isDead())
                return
            let dp = p.character.worldTransform.position;
            let dis = Vector.squaredDistance(dp.set(dp.x, dp.y, pos.z), pos)
            if (dis < max) {
                max = dis;
                player = p;
            }
        }
        return player;
    }
    public getOpenId(uid: string): string {
        let tsp = this.map.get(uid);
        if (tsp)
            return tsp.openId;
        return null;
    }

}