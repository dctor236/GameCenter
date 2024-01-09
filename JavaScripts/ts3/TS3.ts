import { LogMgr } from "./com/LogMgr";
import { PlayerMgr } from "./player/PlayerMgr";


export namespace TS3 {

    export let resMgr = mw.AssetUtil;
    export let soundMgr = SoundService;
    export let uiMgr = mw.UIService;
    // export let moduleMgr = ModuleService;
    export let accountMgr = AccountService;
    export let timeMgr = mw.TimeUtil;
    export let playerMgr = PlayerMgr.Inst;
    /**
     * 日志工具
     */
    export let logMgr = LogMgr.Inst;
    export let log = (...args) => {
        logMgr.log(...args);
    }
    export let info = (...args) => {
        logMgr.info(...args);
    }
    export let trace = (...args) => {
        logMgr.trace(...args);
    }
    export let error = (...args) => {
        logMgr.error(...args);
    }

    export async function init() {
        logMgr.coreLog('TS3 init')
        await playerMgr.init();
        logMgr.coreLog('TS3 inited')
    }

}