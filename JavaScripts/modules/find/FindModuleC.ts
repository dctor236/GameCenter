import { EventsName } from "../../const/GameEnum";
import GameUtils from "../../utils/GameUtils";
import FindModuleS from "./FindModuleS";

export enum EGoodsTag {
    Suitcase = '行李箱',
    Moutiain = '山顶'
}

const FindRoot = '360392FF'

export default class FindModuleC extends ModuleC<FindModuleS, null> {

    protected allGoods: Map<string, { ranIndex: number, triGroup: mw.Trigger[] }> = new Map()

    protected onStart(): void {
        GameObject.asyncFindGameObjectById(FindRoot).then(o => {
            Object.values(EGoodsTag).forEach((e) => {
                const group = o.getChildByName(e)
                if (group) {
                    let vec = {
                        ranIndex: 0,
                        triGroup: []
                    }
                    const children = group.getChildren()
                    children.forEach(child => {
                        const tri = child as mw.Trigger
                        if (tri) {
                            tri.onEnter.add((obj) => {
                                if (GameUtils.isPlayerCharacter(obj)) {
                                    let config: number = 0
                                    if (e == EGoodsTag.Moutiain) {
                                        config = 1000
                                    } else if (e == EGoodsTag.Suitcase) {
                                        config = 1004
                                    }
                                    Event.dispatchToLocal(EventsName.DoneTask, config, 1)
                                    tri.enabled = (false)
                                }
                            })
                            vec.triGroup.push(child)
                        }
                    })
                    this.allGoods.set(e, vec)
                    this.setVisableAndCollsion(e, false)
                }
            })
        })
    }

    protected onUpdate(dt: number): void {

    }

    public findGroupByTag(tag: EGoodsTag) {
        if (this.allGoods.has(tag)) {
            return this.allGoods.get(tag).triGroup
        }
        return null
    }

    public setVisableAndCollsion(tag: EGoodsTag, state: boolean) {
        if (this.allGoods.has(tag)) {
            const goods = this.allGoods.get(tag)
            goods.triGroup.forEach(e => {
                state ? e.setVisibility(mw.PropertyStatus.On, true) :
                    e.setVisibility(mw.PropertyStatus.Off, true);
                e.enabled = (state)
                // console.log('setVisableAndCollsion', e.name, state, tag)
            })
        }
    }

    public setTagIndex(tag: EGoodsTag) {
        let res: number = 0
        if (this.allGoods.has(tag)) {
            res = MathUtil.randomInt(0, this.allGoods.get(tag).triGroup.length)
            this.allGoods.get(tag).ranIndex = res
        }
        return res
    }

    public getTagIndex(tag: EGoodsTag) {
        if (this.allGoods.has(tag)) {
            return this.allGoods.get(tag).ranIndex
        }
    }


    protected onDestroy(): void {

    }
}