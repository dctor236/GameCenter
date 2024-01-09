import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { EventsName } from "../const/GameEnum";
import { GlobalData } from "../const/GlobalData";
import { UIManager } from "../ExtensionType";
import { BagModuleC } from "../modules/bag/BagModuleC";
import { MGSMsgHome } from "../modules/mgsMsg/MgsmsgHome";
import { FlyEffect } from "../ui/fly/FlyEffect";
import GameUtils from "../utils/GameUtils";
import SkillModule_Client from '../modules/skill/SkillModule_Client';

const Root: string = '2F7DA670'

const SkillID: number = 203101

export default class RainBowRaceMgr {
    private static _instance: RainBowRaceMgr;

    public static get instance(): RainBowRaceMgr {
        if (RainBowRaceMgr._instance == null) {
            RainBowRaceMgr._instance = new RainBowRaceMgr();
        }
        return RainBowRaceMgr._instance;
    }
    private _isInEnvir: boolean = false
    init() {
        let screenEffID
        Event.addLocalListener(EventsName.ShowScreenEff, (bool: boolean) => {
            if (!this._isInEnvir)
                return
            if (bool) {
                const char = Player.localPlayer.character
                char.maxWalkSpeed = 450 * 6;
                UIManager.show(FlyEffect)
            } else {
                UIManager.hide(FlyEffect)
            }
        })

        GameObject.asyncFindGameObjectById(Root).then(root => {
            const envirTri = root.getChildByName('场景触发器') as mw.Trigger
            envirTri.onEnter.add(o => {
                if (GameUtils.isPlayerCharacter(o)) {
                    this._isInEnvir = true
                }
            })

            envirTri.onLeave.add(o => {
                if (GameUtils.isPlayerCharacter(o)) {
                    this._isInEnvir = false
                    UIManager.hide(FlyEffect)
                    //解除滑板
                    ModuleService.getModule(SkillModule_Client).getSkillUI([])
                    GlobalData.globalPos = new Vector(2475.966, -11234.130, 300)
                }
            })

            const childTris = root.getChildren()
            for (let i = 1; i < childTris.length; i++) {
                const tri = childTris[i] as mw.Trigger
                tri.onEnter.add(o => {
                    if (GameUtils.isPlayerCharacter(o)) {
                        if (!this._isInEnvir) return
                        MGSMsgHome.uploadMGS('ts_action_click', '每次游戏玩家使用滑板的次数', { button: 'scooter' })
                        ModuleService.getModule(BagModuleC).clearShortCutBar()
                        ModuleService.getModule(SkillModule_Client).getSkillUI([SkillID], null, true)
                    }
                })
            }
        })
    }

}