

import { INPCTalkElement } from "../../config/NPCTalk";
import { EventsName } from "../../const/GameEnum";
import SP_NPC from "./NPC";
import { NPCStateC } from "./NPCClient";
import { NPCDataHelper } from "./NPCData";
import NPCModule_S from "./NPCModule_S";


export default class NPCModule_C extends ModuleC<NPCModule_S, NPCDataHelper> {
    private _npcMap: Map<number, SP_NPC> = new Map();
    private _followNpc: number[] = []

    protected onStart(): void {
        Event.addLocalListener(EventsName.UnFollowNpc, () => {
            this._followNpc.forEach(e => {
                const npc = this.getNpc(e).client
                npc.onNPCFollowOff()
            })
            this._followNpc.length = 0
        })
    }

    public registerNPC(npc: SP_NPC) {
        if (!this._npcMap.has(npc.id)) {
            this._npcMap.set(npc.id, npc)
        }
    }
    getNpc(id: number): SP_NPC {
        if (this._npcMap.has(id))
            return this._npcMap.get(id);
    }

    getNpcByGuid(guid: string) {
        let res: SP_NPC = null
        for (const [k, v] of this._npcMap) {
            if (v.client.npcObj.gameObjectId == guid) {
                res = v
                break
            }
        }
        return res
    }


    public registFollowNPC(npcID: number) {
        if (this._followNpc.indexOf(npcID) == -1) {
            this._followNpc.push(npcID)
        }
    }

    public getNearNpcToPlayer() {
        const playPos = this.localPlayer.character.worldTransform.position
        let distance: number = 4564564
        let tmpObj: mw.GameObject = null
        this._npcMap.forEach((e) => {
            const npcState = e.client.npcState
            const npcPos = e.client.npcObj.worldTransform.position
            const tmpDistance = Vector.squaredDistance(playPos, npcPos)
            if (npcState == NPCStateC.Talk
                && tmpDistance < distance) {
                tmpObj = e.client.npcObj
                distance = tmpDistance
            }
        })
        return tmpObj
    }

    /**玩家完成了对话 给予道具 */
    public async getBagItem(npcid: number, eventConfig: INPCTalkElement, missionID: number) {
        if (this.data.getNpcEventReward(npcid, missionID)) return
        this.server.net_setNpcReward(npcid, eventConfig.rewarID, missionID)
    }
}