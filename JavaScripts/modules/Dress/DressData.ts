// /*
//  * @Author: ZhangZhenYu
//  * @Date: 2022-05-05 11:38:19
//  * @LastEditors: hong.yu hong.yu@appshahe.com
//  * @LastEditTime: 2022-11-29 16:44:43
//  * @FilePath: \animelife\JavaScripts\module\DressData.ts
//  */


// import { GameConfig } from "../../config/GameConfig";
// import { Enums } from "../../const/Enums";



// export class DressData extends Subdata {
//     @Decorator.persistence()
//     public clothes: number[] = [];
//     @Decorator.persistence()
//     public curSex: number = 1;
//     @Decorator.persistence()
//     public customFaceData: {} = {};
//     @Decorator.persistence()
//     public customBodyData: {} = {};
//     /**衣柜 */
//     @Decorator.persistence()
//     public wardrobe: number[] = [];

//     /** 初始化 */
//     protected initDefaultData(): void {
//         this.wardrobe = [];
//         this.clothes = [3, 5, 7, 9, 11];
//         this.curSex = 1;
//         this.customFaceData = {
//             1001: 0,
//             1002: 0,
//             1003: 0,
//             1004: 0,
//             1005: 0,
//             1006: 0,
//             2001: 0,
//             2002: 0,
//             2003: 0,
//             2004: 0,
//             2005: 0,
//             3001: 0,
//             3002: 0,
//             3003: 0,
//             3004: 0,
//             4001: 0,
//             4002: 0,
//             4003: 0,
//             5001: 0,
//             5002: 0,
//             5003: 0,
//             6001: 0,
//             6002: 0,
//             6003: 0,
//         };
//         this.customBodyData = {
//             7001: 0,
//             7002: 0,
//             8001: 0,
//             8002: 0,
//             9001: 0,
//             9002: 0,
//             9003: 0,
//             9004: 0,
//             9005: 0,
//             9006: 0,
//             9007: 0,
//             9008: 0,
//             9009: 0,
//             9010: 0,
//             10001: 0,
//             10002: 0,
//             10003: 0,
//             10004: 0,
//             10005: 0,
//             10006: 0,
//             10007: 0,
//             10008: 0,
//             11001: 0,
//             11002: 0,
//             11003: 0,
//             11004: 0,
//             11005: 0,
//             11006: 0,
//         };
//         for (const key in this.customFaceData) {
//             if (Object.prototype.hasOwnProperty.call(this.customFaceData, key)) {
//                 this.customFaceData[key] = GameConfig.Custom.getElement(Number(key)).female;
//             }
//         }
//         for (const key in this.customBodyData) {
//             if (Object.prototype.hasOwnProperty.call(this.customBodyData, key)) {
//                 this.customBodyData[key] = GameConfig.Custom.getElement(Number(key)).female;
//             }
//         }
//     }

//     /**
//      * 获取玩家穿戴的装扮
//      * @returns 已经穿戴的装扮
//      */
//     public getAllCloth(): number[] {
//         return this.clothes;
//     }

//     /**
//      * 获取当前性别
//      * @returns 性别 1 女 2 男
//      */
//     public getSex(): number {
//         return this.curSex;
//     }

//     /**
//      * 获取自定义数据
//      * @returns 自定义的数据
//      */
//     public getCustomData(type: number): {} {
//         switch (type) {
//             case 1:
//                 return this.customFaceData;
//             case 2:
//                 return this.customBodyData;
//         }
//     }

//     /**
//      * 获取指定部位的装扮
//      * @param type 部位类型
//      * @returns 物品id
//      */
//     public getDressByType(type: Enums.EquipDressType): number {
//         switch (type) {
//             case Enums.EquipDressType.coat:
//                 return this[0];
//             case Enums.EquipDressType.pents:
//                 return this[1];
//             case Enums.EquipDressType.hair:
//                 return this[2];
//             case Enums.EquipDressType.gloves:
//                 return this[3];
//             case Enums.EquipDressType.shoe:
//                 return this[4];
//             default:
//                 return 0;
//         }
//     }

//     /**
//      * 穿上一件衣服
//      * @param id 服装id
//      */
//     public putOnDress(id: number, type: Enums.EquipDressType): void {
//         const index = type - 1;
//         this.clothes[index] = id;
//         this.save(true);
//     }

//     /**
//      * 切换性别
//      * @param type 性别类型
//      */
//     public setSex(type: number): void {
//         this.curSex = type;
//     }

//     /**
//      * 设置指定部位的自定义装扮
//      * @param type 类型 1 face 2 body
//      * @param data 数据
//      */
//     public setCustomData(type: number, data: {}): void {
//         switch (type) {
//             case 1:
//                 this.customFaceData = data;
//                 console.log("存储数据11", type, JSON.stringify(data));
//                 break;
//             case 2:
//                 this.customBodyData = data;
//                 console.log("存储数据22", type, JSON.stringify(data));
//                 break;
//         }
//         this.save(false);
//     }

//     /**
//      * 设置初始化人物 （切换性别）
//      * @param type 性别 1女 2 男
//      */
//     public setInitDress(type: number): void {

//         if (type == 1) {
//             this.clothes = [3, 5, 7, 9, 11];
//         } else if (type == 2) {
//             this.clothes = [4, 6, 8, 10, 12];
//         }

//         this.setSex(type);
//         this.setDefaultInitData(type);

//         this.save(true);
//     }

//     private setDefaultInitData(type: number) {
//         if (type === 1) {
//             for (const key in this.customFaceData) {
//                 if (Object.prototype.hasOwnProperty.call(this.customFaceData, key)) {
//                     this.customFaceData[key] = GameConfig.Custom.getElement(Number(key)).female;
//                 }
//             }
//             for (const key in this.customBodyData) {
//                 if (Object.prototype.hasOwnProperty.call(this.customBodyData, key)) {
//                     this.customBodyData[key] = GameConfig.Custom.getElement(Number(key)).female;
//                 }
//             }
//         } else {
//             for (const key in this.customFaceData) {
//                 if (Object.prototype.hasOwnProperty.call(this.customFaceData, key)) {
//                     this.customFaceData[key] = GameConfig.Custom.getElement(Number(key)).male;
//                 }
//             }
//             for (const key in this.customBodyData) {
//                 if (Object.prototype.hasOwnProperty.call(this.customBodyData, key)) {
//                     this.customBodyData[key] = GameConfig.Custom.getElement(Number(key)).male;
//                 }
//             }
//         }
//     }

//     /**金币解锁衣服 */
//     public unlockCloth(id: number) {
//         if (this.wardrobe.indexOf(id) < 0) {
//             this.wardrobe.push(id);
//         }
//     }

//     /**获取当前衣柜数据 */
//     public getCurWardrodeData(): number[] {
//         return this.wardrobe;
//     }

// }