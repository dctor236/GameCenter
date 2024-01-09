import { ModifiedCameraSystem, CameraModifid, } from '../../Modified027Editor/ModifiedCamera';
/*
* @Author: meta
* @Date: 2023-05-24 14:04:57
* @LastEditors: meta meta@appshahe.com
* @LastEditTime: 2023-05-25 13:12:07
*/

import { GlobalData } from "../../const/GlobalData";
import { SoundManager, UIManager } from "../../ExtensionType";
import BlackMask_Generate from "../../ui-generate/BlackMask_generate";
const TRAIN_GUID = "1DB2B656";


/**
 * cg模块
 */
export default class CG {
    private static _instance: CG;
    public static get instance(): CG {
        if (CG._instance == null) {
            CG._instance = new CG();
        }
        return CG._instance;
    }

    /** 火车 */
    private _train: mw.GameObject;
    private _transformDoor: mw.Effect
    private _dustEff: mw.Effect
    //摄像机锚点1
    private _anchor: mw.GameObject[] = []
    //相机变换
    private _initTransForm: Transform
    private _initWorldTr: Transform
    private _initArm: number = 0
    private _camera: Camera
    private _callBack: () => void

    private _maskUI: BlackMask_Generate

    public trainDeparture(cb: () => void) {
        this._callBack = cb
        if (!GlobalData.openCG) {
            this._callBack && this._callBack()
            return
        }

        if (!this._train) {
            const root = GameObject.findGameObjectById(TRAIN_GUID);
            this._train = root.getChildByName('童话列车')
            this._transformDoor = root.getChildByName('传送门') as mw.Effect
            this._dustEff = root.getChildByName('爆点') as mw.Effect
            this._anchor.push(this._train.getChildByName('相机锚点2'))
            this._anchor.push(this._train.getChildByName('相机锚点3'))
            let player = Player.localPlayer;
            this._camera = Camera.currentCamera;
            player.character.setVisibility(PropertyStatus.Off)
            this._initTransForm = this._camera.localTransform.clone()
            this._initWorldTr = this._camera.worldTransform.clone()
            this._initArm = this._camera.springArm.length
            this._anchor.forEach(e => {
                e.setVisibility(PropertyStatus.Off)
                e.setCollision(CollisionStatus.Off)
            })
            this._train.setVisibility(PropertyStatus.Off)
            this._maskUI = UIManager.getUI(BlackMask_Generate, true)

        }

        this._transformDoor.worldTransform.scale = Vector.zero
        this._train.worldTransform.position = new Vector(11934.990, -24929.990, 4946.570)
        UIManager.showUI(this._maskUI)
        this.setCameraRot(0, this._train.worldTransform.position)

        this.maskFadeOut(this._maskUI.mask, 1800, () => {
            this.setTransfomDoor([0, 30], 2000, () => {
                setTimeout(() => {
                    SoundManager.playSound('175324', 1, 1)
                    setTimeout(() => {
                        this.setCameraRot(1, this._train.worldTransform.position)
                    }, 1800);
                }, 600)
                this.startTrain()
                this._train.setVisibility(PropertyStatus.On)
            })

        })
    }

    /**黑幕渐渐消失 */
    public maskFadeOut(ui: mw.Widget, duration: number, complete?: () => void, easingEff = mw.TweenUtil.Easing.Quadratic.In) {
        let opacity = 1
        return new mw.Tween({ value: opacity }).to({ value: 0 }, duration)
            .onUpdate((ref) => {
                ui.renderOpacity = ref.value
            })
            .start().onComplete(() => {
                complete && complete()
            }).easing(easingEff)
    }

    public maskFadeIn(ui: mw.Widget, duration: number, complete?: () => void, easingEff = mw.TweenUtil.Easing.Quadratic.In) {
        let opacity = 0
        return new mw.Tween({ value: opacity }).to({ value: 1 }, duration)
            .onUpdate((ref) => {
                ui.renderOpacity = ref.value
            })
            .start().onComplete(() => {
                complete && complete()
            }).easing(easingEff)
    }

    /**
     * 设置传送门大小
     * @param tmpScale 大小
     * @param time tween时长
     * @param cb 完成动画回调
     */
    public setTransfomDoor(tmpScale: number[], time: number = 2000, cb: () => void = null) {
        let tween = new mw.Tween({ scale: tmpScale[0] })
            .to({ scale: tmpScale[1] }, time)
            .onUpdate((obj) => {
                this._transformDoor.worldTransform.scale = new Vector(obj.scale, obj.scale, obj.scale);
            })
            .onComplete(() => {
                cb && cb()
            })
            .start();
    }

    /**
     * 设置镜头旋转
     * @param index 索引
     * @param objLoc 位置
     * @returns 
     */
    setCameraRot(index: number, objLoc: Vector) {
        ModifiedCameraSystem.setCameraFollowTarget(this._anchor[index])
        let tarLocation = this._anchor[index].worldTransform.position;
        let rotation = null
        if (objLoc) {
            rotation = objLoc.subtract(tarLocation).toRotation();
        } else {
            rotation = this._anchor[index].worldTransform.getForwardVector().toRotation()
        }
        ModifiedCameraSystem.setOverrideCameraRotation(rotation)
        return rotation.clone()
    }

    /**
     * 启动火车
       */
    public startTrain() {
        let tween = new mw.Tween({ position: new Vector(11934.990, -24929.990, 4946.570) })
            .to({ position: new Vector(3039.990, -24929.990, 4946.570) }, 6000)
            .onUpdate((obj) => {
                this._train.worldTransform.position = obj.position;
            })
            .onComplete(() => {
                this._camera.positionLagEnabled = true;
                this._camera.positionLagSpeed = 2;
                this._dustEff.play()
                setTimeout(() => {
                    setTimeout(() => {
                        ModifiedCameraSystem.setOverrideCameraRotation(Player.localPlayer.character.worldTransform.rotation);
                        setTimeout(() => {
                            this._camera.positionLagEnabled = false;
                            this._camera.rotationLagEnabled = false;
                            ModifiedCameraSystem.cancelCameraFollowTarget()
                            ModifiedCameraSystem.resetOverrideCameraRotation();
                            this._callBack()
                        }, 32);
                    }, 1500)
                }, 200);
            })
            .start();
    }


    /**隐藏火车*/
    public hideTrain() {
        let tween = new mw.Tween({ position: new Vector(-12500, 870, 880) })
            .to({ position: new Vector(-12500, 12000.000, 880) }, 300)
            .onUpdate((obj) => {
                this._train.worldTransform.position = obj.position;
            })
            .onComplete(() => {
                this._train.setVisibility(PropertyStatus.Off, true);
            })
            .start();
    }

}