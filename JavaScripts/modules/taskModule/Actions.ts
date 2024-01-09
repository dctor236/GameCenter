

import Action1 = mw.Action1;
import Action2 = mw.Action2;

export namespace Actions {
    /**
     * 任务完成回调
     */
    export const onMainTaskChanged: Action1<number> = new Action1();
    /**
         * 时间变更服务端回调
         */
    export const onTimeChangedS: Action1<{ hour: number, minute: number }> = new Action1();
}