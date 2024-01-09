import { GlobalModule } from "../const/GlobalModule"
import NPCModule_C from "../modules/npc/NPCModule_C"
import { PlayerMgr } from "../ts3/player/PlayerMgr"

//场景换装脚本
@Component
export default class StageChangeSuit extends mw.Script {
    @mw.Property({ displayName: "服装ID" })
    public clothID: number = 0
    private changeNpcID: string = ''
    protected onStart(): void {
        if (this.gameObject?.parent instanceof mw.Character) {
            this.gameObject.parent.collisionWithOtherCharacterEnabled = false
        }

        //npc换装触发器
        const tri = this.gameObject as mw.Trigger
        tri.onEnter.add(async (go: mw.GameObject) => {
            if (go instanceof mw.Character) {
                if (go.gameObjectId == PlayerMgr.Inst.mainCharacter.gameObjectId) {
                    await GlobalModule.MyPlayerC.Cloth.changeRoleAvatar(this.clothID)
                    GlobalModule.MyPlayerC.Cloth.saveAvatarData(false)
                } else if (go.gameObjectId != this.changeNpcID) {
                    let npc = ModuleService.getModule(NPCModule_C).getNpcByGuid(go.gameObjectId)
                    npc?.client?.onChangeSuit(this.clothID)
                }
            }
        })
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}