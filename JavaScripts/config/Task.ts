import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","taskName","taskInfo","taskType","taskRewardItemType","taskRewardItemID","rewardImgGuid","taskRewardNum","TaskNPCID","FinishNPCID","clickTalkState","accNpcTalk","accTalkState","finishTalkState","taskSolvetime","acceptTip","finishTip"],["","","","","","","","","","","","","","","","",""],[1000,["接取任务","登顶挑战"],["与旅行商人对话","到达藤蔓顶端"],1,1,110009,"137787",8,[30],null,[[201,0],[205,0]],1,0,1,1,null,null],[1001,["接取任务","服装试穿"],["与旅行商人对话","试穿5次衣物"],2,1,110009,"137787",3,[30],null,[[201,0],[205,1]],1,0,1,5,null,null],[1002,["接取任务","乘坐胖达"],["与旅行商人对话","骑乘1次胖达"],3,1,110009,"137787",1,[30],null,[[201,0],[205,2]],1,0,1,1,null,null],[1003,["接取任务","与NPC玩耍"],["与旅行商人对话","举起NPC三次"],4,1,110009,"137787",3,[30],null,[[201,0],[205,3]],1,0,1,3,null,null],[1004,["接取任务","失物招领"],["与旅行商人对话","找到丢失的行李箱"],5,1,110009,"137787",5,[30],null,[[201,0],[205,4]],1,0,1,1,null,null],[1005,["接取任务","巨龙来袭"],["与旅行商人对话","击败火龙王"],6,1,110009,"137787",20,[30,32],null,[[201,0],[205,5]],1,0,0,1,null,null]];
export interface ITaskElement extends IElementBase{
 	/**id*/
	id:number
	/**任务名称*/
	taskName:Array<string>
	/**任务信息*/
	taskInfo:Array<string>
	/**任务类型*/
	taskType:number
	/**任务奖励道具类型*/
	taskRewardItemType:number
	/**任务奖励道具ID(item表)*/
	taskRewardItemID:number
	/**任务奖励图片guid*/
	rewardImgGuid:string
	/**任务奖励道具数量*/
	taskRewardNum:number
	/**接取任务NPCID*/
	TaskNPCID:Array<number>
	/**完成任务NPCID*/
	FinishNPCID:Array<number>
	/**点击NpcEvent*/
	clickTalkState:Array<Array<number>>
	/**改变NpcTalk*/
	accNpcTalk:number
	/**改变NpcEvent*/
	accTalkState:number
	/**改变NpcEvent*/
	finishTalkState:number
	/**任务需要的量*/
	taskSolvetime:number
	/**任务接取诺米文本*/
	acceptTip:string
	/**到达后诺米文本*/
	finishTip:string
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}