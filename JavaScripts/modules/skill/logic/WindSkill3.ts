/**
 * @Author       : 田可成
 * @Date         : 2023-03-10 13:38:29
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-06-06 17:56:40
 * @FilePath     : \mollywoodschool\JavaScripts\modules\skill\logic\WindSkill3.ts
 * @Description  : 
 */
import { SkillRun } from "../runtime/SkillRun";
import SkillModule_Client from "../SkillModule_Client";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(1013)
export class WindSkill3 extends SkillBase {
    public onHit(hitObj: string, buffName: string, damage: number, damageRate: number, effect: number, music: number, hitLocation?: mw.Vector): boolean {
        const skill = ModuleService.getModule(SkillModule_Client).findSkill(5001)
        skill.skillID = 500101
        skill.host = this.host
        if (hitObj != "") {
            if (!hitLocation) hitLocation = GameObject.findGameObjectById(hitObj).worldTransform.position
            SkillRun.cast(this.character, 5001 * 10 + this.State, { pos: hitLocation, diy: [this.State, skill.skillID] })
        }
        return true
    }
}
