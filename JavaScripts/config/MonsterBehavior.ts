import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","behavior","skill","option","value"],["","","","",""],[1,0,1001,0,null,"火球"],[2,0,1011,1,[20,40,60,80],"吐息"],[3,1,1009,0,null,"冲撞"],[4,2,1010,1,[50],"龙卷风"]];
export interface IMonsterBehaviorElement extends IElementBase{
 	/**唯一id*/
	ID:number
	/**行为  0 无；1后撤—撞击；2 旋转*/
	behavior:number
	/**具体技能（skill表ID）*/
	skill:number
	/**触发条件属性（1血量）*/
	option:number
	/**值 百分比*/
	value:Array<number>
 } 
export class MonsterBehaviorConfig extends ConfigBase<IMonsterBehaviorElement>{
	constructor(){
		super(EXCELDATA);
	}

}