export const FLASH_INFO = 'info'
export const FLASH_ERROR = 'error'
export const FLASH_SUCCESS = 'success'
export const FLASH_PUSH = 'flash.push'
export const FLASH_POP = 'flash.pop'
export const FLASH_CLEAR = 'flash.clear'
export const FLASH_CLEAR_AND_SHOW = 'flash.clear_n_show'

const DEFAULT_OPTS = { mode: FLASH_INFO, clear: false, hideLoader: false }

///////////////////////////////////// Action creators
const pushFlash = (msg, { mode = FLASH_INFO, clear = false, hideLoader = false } = DEFAULT_OPTS) => ({
    type: (clear ? FLASH_CLEAR_AND_SHOW : FLASH_PUSH),
    hideLoader,
    flash: { msg, mode },
})

// FLASH and LOADER
export const pushInfo = (msg, opts = DEFAULT_OPTS) => (pushFlash(msg, { ...opts, mode: FLASH_INFO }))
export const pushError = (msg, opts = DEFAULT_OPTS) => (pushFlash(msg, { ...opts, mode: FLASH_ERROR }))
export const pushSuccess = (msg, opts = DEFAULT_OPTS) => (pushFlash(msg, { ...opts, mode: FLASH_SUCCESS }))
export const popFlash = () => ({ type: FLASH_POP })
export const clearFlash = () => ({ type: FLASH_CLEAR })
export const showLoader = () => ({ type: LOADER_SHOW })
export const hideLoader = () => ({ type: LOADER_HIDE })
