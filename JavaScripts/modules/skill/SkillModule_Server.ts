import { SkillData } from "./SkillData";
import SkillModule_Client from "./SkillModule_Client";

/**
 * 技能模块 服务器端 控制非广场物品的技能
 */
export default class SkillModule_Server extends ModuleS<SkillModule_Client, SkillData>{
    protected onStart(): void {

    }
    protected onPlayerJoined(player: mw.Player): void {
    }
}