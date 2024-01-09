import { EmTaskState, EmTaskType } from "../../const/GameEnum";

export class TaskData {
    /**任务Id */
    id: number
    /**任务configId */
    taskConfig: number;
    isStart: number
    /**下个阶段任务 */
    nextTask: number;
    /**当前完成次数 */
    curSolveTime: number;
    /**总完成次数 */
    totalSolveTime: number;
    /**任务状态 */
    taskState: EmTaskState;
    /**任务类型 */
    taskType: EmTaskType;
    /**接取NPC */
    acceptNpc: number;
    /**完成NPC */
    finishNpc: number;
    /**改变npc的按钮布局索引 */
}
