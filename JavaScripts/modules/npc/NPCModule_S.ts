import { NPCDataHelper } from "./NPCData";
import NPCModule_C from "./NPCModule_C";


export default class NPCModule_S extends ModuleS<NPCModule_C, NPCDataHelper> {


    /**
     * 获取npc给的奖励
     * @param npcid 
     * @param rewardIds 
     * @param EvenID 
     */
    public async net_setNpcReward(npcid: number, rewardIds: number[], EvenID: number) {
        this.currentData.setNpcEventReward(npcid, EvenID)
        this.currentData.save(true);
    }

}