import { GameConfig } from "../../config/GameConfig";
import { IInteractConfigElement } from "../../config/InteractConfig";
import { GlobalData, MyBoolean } from "../../const/GlobalData";
import Active_UI from "./interactLogic/interactiveObjs/SP_Active_UI";
import Jump from "./interactLogic/interactiveObjs/SP_Jump";
import OldInteractive from "./interactLogic/interactiveObjs/SP_OldInteractive";
import InteractObject, { InteractiveHelper } from "./interactLogic/InteractObject";
import Input_UI from "./interactLogic/rpInteractiveObjs/RP_Input_UI";
import PlayAni from "./interactLogic/rpInteractiveObjs/RP_PlayAni";

/**
 * @Author       : meta
 * @Date         : 2023-01-16 17:30:22
 * @LastEditors  : meta
 * @LastEditTime : 2023-03-28 10:05:45
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractMgr.ts
 * @Description  : 
 */
export default class InteractMgr {
    private static _instance: InteractMgr
    private static isInit: boolean = false

    public static get instance() {
        if (!InteractMgr._instance) {
            InteractMgr._instance = new InteractMgr()
        }
        return InteractMgr._instance;
    }

    public interactorChilden: mw.GameObject[]
    public activeHandle: (interact: InteractObject, flag: boolean, param?: any) => Promise<any> = null
    public activeNextHandle: (interact: InteractObject, flag: boolean, param?: any) => void = null

    public async initInteract() {
        if (InteractMgr.isInit) {
            return;
        } else {
            InteractMgr.isInit = true
        }
        let i = 1
        for (const config of GameConfig.InteractConfig.getAllElement()) {
            //分帧处理
            TimeUtil.delayExecute(async () => {
                await InteractMgr.instance.createInteract(config, SystemUtil.isServer())
            }, ++i)
        }
    }

    private async createInteract(cfg: IInteractConfigElement, isServer: boolean) {
        if (!this.interactorChilden) {
            let interactorParent = await GameObject.asyncFindGameObjectById(GlobalData.interactorParent)
            this.interactorChilden = interactorParent.getChildren()
        }
        if (this.interactorChilden.length != 0 && isServer == cfg.IsServer) {
            let interact = this.interactorChilden.find(i => i.name === cfg.Name);
            if (!interact) return;
            let nextGuid = ""
            for (let i = cfg.Scripts.length; i > 0; i--) {
                let script = null
                let Vectors = null
                switch (cfg.Scripts[i - 1]) {
                    case "Active_UI":
                        script = await mw.Script.spawnScript(Active_UI, isServer, interact) as Active_UI
                        script.isTrriger = cfg["Params" + i][2];
                        script.activeDis = Number(cfg["Params" + i][3]);
                        script.icon = cfg["Params" + i][4];
                        script.cdIcon = cfg["Params" + i][5];
                        Vectors = cfg["Params" + i][6].split("/");
                        script.offset = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.exitMode = cfg["Params" + i][7];
                        script.CD = Number(cfg["Params" + i][8]);
                        if (cfg["Params" + i][9]) {
                            script.params = cfg["Params" + i][9];
                        }
                        break;
                    case "Input_UI":
                        script = await mw.Script.spawnScript(Input_UI, isServer, interact) as Input_UI
                        script.isTrriger = cfg["Params" + i][2];
                        script.activeDis = Number(cfg["Params" + i][3]);
                        script.icon = cfg["Params" + i][4];
                        Vectors = cfg["Params" + i][5].split("/");
                        script.offset = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.cdTime = Number(cfg["Params" + i][6]);
                        break;
                    case "Interactive":
                        script = await mw.Script.spawnScript(OldInteractive, isServer, interact) as OldInteractive
                        script.stanceGuid = cfg["Params" + i][2];
                        script.autoChangerPos = MyBoolean(cfg["Params" + i][3]);
                        script.isBeforPos = MyBoolean(cfg["Params" + i][4]);
                        break;
                    case "Jump":
                        script = await mw.Script.spawnScript(Jump, isServer, interact) as Jump
                        Vectors = cfg["Params" + i][2].split("/");
                        script.impulse = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        break;
                    case "PlayAni":
                        script = await mw.Script.spawnScript(PlayAni, isServer, interact) as PlayAni
                        script.animation = cfg["Params" + i][2];
                        script.time = Number(cfg["Params" + i][3]);
                        script.loopNum = Number(cfg["Params" + i][4]);
                        Vectors = cfg["Params" + i][5].split("/");
                        script.lookAtOff = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        Vectors = cfg["Params" + i][6].split("/");
                        script.locationOff = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.moveJumpEnable = MyBoolean(cfg["Params" + i][7]);
                        break;
                    default:
                        break;
                }
                if (script instanceof InteractObject) {
                    if (i != cfg.Scripts.length) script.nextInteractGuid = nextGuid
                    script.blockInteractNext = MyBoolean(cfg["Params" + i][0])
                    script.own = MyBoolean(cfg["Params" + i][1])
                    nextGuid = script.guid
                }
            }
        }
    }

    public getInteract(guid: string): InteractObject {
        return InteractiveHelper.interactArr.find(i => i.guid === guid);
    }

    public findInteract(playerID: number): InteractObject[] {
        let interactArr: InteractObject[] = []
        for (let i = 0; i < InteractiveHelper.interactArr.length; i++) {
            if (InteractiveHelper.interactArr[i].ownerPlayerIds.includes(playerID)) {
                interactArr.push(InteractiveHelper.interactArr[i]);
            }
        }
        return interactArr
    }

    update(loc: mw.Vector) {
        for (let i = 0; i < InteractiveHelper.interactLocArr.length; i++) {
            const interact = InteractiveHelper.interactLocArr[i];
            const script = interact.script
            if (--script.interval.updateInterval <= 0) {
                const location: mw.Vector = interact.location
                if (script.isDynamic) {
                    location.set(interact.script.gameObject.worldTransform.position)
                }
                const distance = mw.Vector.distance(location, loc);
                const interval = Math.round(0.05 * distance)
                script.interval.updateInterval = interval > 1000 ? 1000 : interval < 5 ? 5 : interval
                if (distance < interact.activeDis) {
                    if (script.onTrriger) script.onStateTrriger()
                    else {
                        script.onTrriger = true
                        script.onEnterTrriger()
                    }
                } else {
                    if (script.onTrriger) {
                        script.onTrriger = false
                        script.onLeaveTrriger()
                    }
                }
            }
        }
    }
}