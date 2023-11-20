import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","monsterType","isService","Guid","MonsterName","Behavior","headPos","Attr","PushNoticeTime","AppearTime","ActiveTime","Trigger","ShowTrigger","victorySound","hitSound","deathSound","deathAnimation","deathStance","killEffect","deathEffect","PathRadius","AttackRadius","Position","MoveScripts"],["","","","","","","","","","","","","","","","","","","","","","","",""],[1,1,1,"E8733F7848F82A42432622B6F2CEFE8D","火龙王",[1,2,3,4],new mw.Vector(0,0,400),4,5,360,300,"2404C3DE","2404C3DE",69,55,56,null,null,[68,69],49,100,120,[new mw.Vector(1599,2012,13781)],["31B7A73D","19423F8E"],"火龙"]];
export interface IMonsterElement extends IElementBase{
 	/**唯一id*/
	ID:number
	/**怪物类型*/
	monsterType:number
	/**是否为双端*/
	isService:number
	/**资源GUID*/
	Guid:string
	/**怪物名字*/
	MonsterName:string
	/**怪物行为(monsterbehavior表ID)*/
	Behavior:Array<number>
	/**头顶UI相对位置*/
	headPos:mw.Vector
	/**属性（BaseAttribute表ID）*/
	Attr:number
	/**推送时间(s)*/
	PushNoticeTime:number
	/**刷新时间(s)*/
	AppearTime:number
	/**存活时间(s)*/
	ActiveTime:number
	/**追击触发器*/
	Trigger:string
	/**显示触发器*/
	ShowTrigger:string
	/**胜利音效*/
	victorySound:number
	/**受击音效*/
	hitSound:number
	/**死亡音效*/
	deathSound:number
	/**死亡动画*/
	deathAnimation:string
	/**死亡姿态*/
	deathStance:string
	/**击杀效果，光柱|头顶特效*/
	killEffect:Array<number>
	/**死亡特效*/
	deathEffect:number
	/**寻路检测半径*/
	PathRadius:number
	/**攻击检测半径*/
	AttackRadius:number
	/**待机位置*/
	Position:mw.Vector[]
	/**额外的运动控制脚本id*/
	MoveScripts:Array<string>
 } 
export class MonsterConfig extends ConfigBase<IMonsterElement>{
	constructor(){
		super(EXCELDATA);
	}

}