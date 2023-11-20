import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","goodID","clothID","sex","Name","type","money","sort","islimit"],["","","","","","","","",""],[1,110008,1016,2,"舞龙舞狮头套",2,[999],2,1,"舞龙舞狮头套"],[2,110007,1015,2,"小黎头套",2,[20],2,1,"小黎头套"],[3,110001,1009,2,"兔兔头套",2,[10],2,1,"兔兔头套"],[4,110004,1012,2,"小黑头套",2,[50],2,1,"小黑头套"],[5,110002,1010,2,"光之巨人头套",2,[10],2,1,"光之巨人头套"],[6,110005,1013,2,"奶酪宝宝头套",2,[10],2,1,"奶酪宝宝头套"],[7,110003,1011,2,"玩具熊头套",2,[20],2,1,"玩具熊头套"],[8,110006,1014,2,"玩具兔头套",2,[20],2,1,"玩具兔头套"]];
export interface IShopElement extends IElementBase{
 	/**qid*/
	id:number
	/**背包物品id（item）*/
	goodID:number
	/**衣服id（roleavatar）*/
	clothID:number
	/**男女*/
	sex:number
	/**商品名称*/
	Name:string
	/**道具类型(1物品，2衣服)*/
	type:number
	/**花费多少钱*/
	money:Array<number>
	/**排序参数，数字越小越靠前*/
	sort:number
	/**是否限购（0不限购，1限购）*/
	islimit:number
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}