import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","IsServer","Name","Scripts","Tips","Params1","Params2","Params3","Params4"],["","","","","","","","",""],[1,true,"蹦床1",["Active_Trigger","Jump"],"蹦床",["0","0","1","0"],["0","0","0/0/4000"],null,null],[2,true,"蹦床2",["Active_Trigger","Jump"],"蹦床",["0","0","1","0"],["0","0","0/0/2500"],null,null],[3,true,"蹦床3",["Active_Trigger","Jump"],"蹦床",["0","0","1","0"],["0","0","0/0/2500"],null,null]];
export interface IInteractConfigElement extends IElementBase{
 	/**交互物唯一ID*/
	ID:number
	/**是否是双端交互物*/
	IsServer:boolean
	/**交互物名字*/
	Name:string
	/**绑定脚本顺序*/
	Scripts:Array<string>
	/**备注*/
	Tips:string
	/**脚本参数1*/
	Params1:Array<string>
	/**脚本参数2*/
	Params2:Array<string>
	/**脚本参数3*/
	Params3:Array<string>
	/**脚本参数4*/
	Params4:Array<string>
 } 
export class InteractConfigConfig extends ConfigBase<IInteractConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}