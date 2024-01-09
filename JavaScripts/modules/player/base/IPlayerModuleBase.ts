/**
 * @Author       : meta
 * @Date         : 2023-05-08 17:14:37
 * @LastEditors  : meta
 * @LastEditTime : 2023-06-05 10:31:06
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\base\IPlayerModuleBase.ts
 * @Description  : 
 */
export default interface IPlayerModuleBase {
     Cloth
     State
     Action
     getDataByPlayer(player: mw.Player | number)
}