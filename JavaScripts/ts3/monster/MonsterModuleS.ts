/*
 * @Author: 代纯 chun.dai@appshahe.com
 * @Date: 2023-06-16 19:53:39
 * @LastEditors: 代纯 chun.dai@appshahe.com
 * @LastEditTime: 2023-06-19 23:37:58
 * @FilePath: \vine-valley\JavaScripts\ts3\monster\MonsterModuleS.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { MonsterCfg, MonsterDefine } from "./MonsterDefine";
import { MonsterData } from "./MonsterData";
import { IDamage, MonsterModuleC } from "./MonsterModuleC";
import FightMgr from "../../modules/fight/FightMgr";
import { GameConfig } from "../../config/GameConfig";
import { EMonsterType } from "../../modules/fight/FightDefine";
import { MonsterMgr } from "./MonsterMgr";
import { GoPool } from "../../ExtensionType";

/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-04-25 14:34
 * @LastEditTime : 2023-06-07 15:48
 * @description  : 
 */
export class MonsterModuleS extends ModuleS<MonsterModuleC, null> {
    public dataInfo: MonsterData;

    public init() {
        this.dataInfo = new MonsterData();
    }

    protected override onStart(): void {
        super.onStart()
    }


    protected onUpdate(dt: number): void {
        MonsterDefine.frameNum++;
        if (MonsterDefine.frameNum > 10000)
            MonsterDefine.frameNum = 0;
    }

    public async register(obj: mw.GameObject, info: MonsterCfg) {
        return await this.dataInfo.register(obj, info);
    }

    public getObj(guid: string) {
        return this.dataInfo.getMonster(guid)
    }

    public getAllMonser() {
        return this.dataInfo.getAll()
    }
    public setState(num: number, guid?: string) {
        this.dataInfo.setState(num, guid);
    }
    public onDamage(guid: string, num: number, isCrit: boolean) {
        this.dataInfo.onDamage(guid, num, isCrit);
    }

    public net_damage(str1: string) {
        let infos: IDamage[] = JSON.parse(str1)
        let ids: string[] = []
        infos.forEach(e => {
            if (ids.indexOf(e.host) == -1) {
                ids.push(e.host)
            }
            FightMgr.instance.creatMonsterInfo(e.host)
        })

        for (let i = 0; i < ids.length; i++) {
            const list = infos.filter(e => e.host == ids[i])
            let mDamage: number = 0
            list.forEach(e => {
                let dag = i < list.length ? e.val : 0;
                let crit = i < list.length ? e.crit : false
                this.onDamage(e.host, dag, crit);
                mDamage += dag
            })
            FightMgr.instance.loadPlayerDamage(ids[i], this.currentPlayerId, mDamage)
        }

    }

}



