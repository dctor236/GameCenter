import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","AttrType","AttrValueFactor"],["","",""],[1,[1,2,3,5,6,7],[[500,500],[500,500],[10,20],[20,20],[150,150],[450,450]],"玩家属性"],[2,[1,2,3,4,5,6,7],[[150,150],[150,150],[40,50],[1.3,1.3],[20,20],[150,150],[450,450]],"精灵1"],[3,[1,2,3,4,5,6,7],[[150,150],[150,150],[15,20],[3.5,3.5],[20,20],[150,150],[450,450]],"精灵2"],[4,[1,2,3,4,7],[[15000,15000],[15000,15000],[1,1],[3,3],[100,100]],"龙"]];
export interface IBaseAttributeElement extends IElementBase{
 	/**ID*/
	ID:number
	/**属性枚举
1 = 当前血量
2 = 最大生命
3 = 攻击力
4 = 攻击频率(s/次)
5= 暴击率[0-100]
6=暴击伤害(百分比)
7=速度
8=防御
9=攻击倍率
*/
	AttrType:Array<number>
	/**属性值范围*/
	AttrValueFactor:Array<Array<number>>
 } 
export class BaseAttributeConfig extends ConfigBase<IBaseAttributeElement>{
	constructor(){
		super(EXCELDATA);
	}

}