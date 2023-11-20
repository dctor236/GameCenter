import { SpawnManager, SpawnInfo, } from '../../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
import { PlayerStateType } from "../../../../const/GameEnum";
import { GlobalModule } from "../../../../const/GlobalModule";
import TourModuleS, { MountType } from "../../../tour/TourModuleS";
import InteractObject, { InteractLogic_C, InteractLogic_S } from "../InteractObject";

/**
 * 交互物-MW交互物对象
 * 按照设置，将玩家于MW交互物绑定
 */
@Component
export default class OldInteractive extends InteractObject {
    @mw.Property({ replicated: true, displayName: "交互姿态绑定", group: "属性" })
    public stanceGuid: string = ""
    @mw.Property({ replicated: true, displayName: "身高匹配交互物高度", group: "属性" })
    public autoChangerPos: boolean = false;
    @mw.Property({ displayName: "退出是否回到交互前位置" })
    public isBeforPos: boolean = true;
    onStart() {
        this.init(OldInteractive_S, OldInteractive_C);
    }
}
//客户端
class OldInteractive_C extends InteractLogic_C<OldInteractive> {
    onStart(): void {

    }
    public onPlayerAction(playerId: number, active: boolean, param: any): void {
        GlobalModule.MyPlayerC.State.setMyState(PlayerStateType.Interaction, active);
    }
}
//服务端
class OldInteractive_S extends InteractLogic_S<OldInteractive> {
    private interactiver: mw.Interactor;
    private handlePlayerId: number = 0;
    private doing: boolean = false;
    private isDown: boolean = false;
    private beforPos: mw.Vector;//交互之前的坐标
    onStart(): void {
        if (this.gameObject && this.gameObject instanceof mw.Interactor) {
            this.interactiver = this.gameObject as mw.Interactor;
        } else {
            SpawnManager.asyncSpawn({ guid: "Interactor", replicates: true }).then((obj) => {
                this.interactiver = obj as mw.Interactor

                this.interactiver.parent = this.gameObject

                this.interactiver.localTransform.position = (mw.Vector.zero)
                this.interactiver.localTransform.rotation = (mw.Rotation.zero)
            })
        }
    }
    public onPlayerAction(playerId: number, active: boolean): void {
        if (active) {
            if (this.info.stanceGuid && this.info.stanceGuid != "") this.interactiver.animationId = this.info.stanceGuid;
            this.sitDown(playerId);
        } else {
            this.standUp(playerId);
        }

    }


    sitDownPanda(playerId: number) {
        if (this.handlePlayerId != 0 && this.handlePlayerId != playerId) return;
        const character = Player.getPlayer(playerId).character;
        this.handlePlayerId = playerId;
        this.isDown = true;
        if (this.doing) return;
        character.worldTransform.rotation = this.gameObject.worldTransform.getForwardVector().toRotation()
        this.doing = true;
        this.beforPos = character.worldTransform.position.clone();

        if (this.interactiver.enter(character)) {
            this.doing = false;
            if (!this.isDown) {
                this.standUpPanda(playerId);
            }
        }
    }

    standUpPanda(playerId: number) {

    }


    //坐下
    private sitDown(playerId: number) {
        if (this.handlePlayerId != 0 && this.handlePlayerId != playerId) return;
        const character = Player.getPlayer(playerId).character;
        this.handlePlayerId = playerId;
        this.isDown = true;
        if (this.doing) return;
        character.worldTransform.rotation = this.gameObject.worldTransform.getForwardVector().toRotation()
        this.doing = true;
        this.beforPos = character.worldTransform.position.clone();

        if (this.gameObject.tag == '7788') {
            let panda = ModuleService.getModule(TourModuleS).getTour(MountType.Panda)
            this.interactiver.parent = null
            this.interactiver.parent = panda.getMount()
        }

        if (this.interactiver.enter(character)) {
            this.doing = false;
            if (!this.isDown) {
                this.standUp(playerId);
            }
        }
    }

    //站起
    private standUp(playerId: number) {
        if (this.handlePlayerId != playerId) return;
        this.isDown = false;
        if (this.doing) return;
        this.doing = true;
        this.exitOwnObject(playerId, (res: boolean) => {
            this.doing = false;
            if (this.isDown) {
                this.sitDown(playerId);
            } else {
                this.handlePlayerId = 0;
            }
        });
    }
    //退出独享交互物的方法
    private exitOwnObject(playerId: number, resCallback: (res: boolean) => void) {
        if (this.interactiver.leave(this.info.isBeforPos ? this.beforPos : this.gameObject.worldTransform.position)) {
            let player = Player.getPlayer(playerId);
            player.character.lookAt(this.gameObject.worldTransform.position);
            PlayerManagerExtesion.changeStanceExtesion(player.character, "");
            if (resCallback != null) resCallback(true);
        } else {
            if (resCallback != null) resCallback(false);
        }
    }
}