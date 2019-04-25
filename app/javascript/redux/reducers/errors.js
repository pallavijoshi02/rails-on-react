import {
  FLASH_PUSH,
  FLASH_POP,
  FLASH_CLEAR,
  FLASH_CLEAR_AND_SHOW,
  LOADER_SHOW,
  LOADER_HIDE
} from '../actions';

export default function (state = {
  loaderCount: 0,
  currentId: 0,
  flash: undefined,
  queue: []
}, action) {
  switch (action.type) {
    case FLASH_PUSH:
      if (state.currentId <= 0) {
        return {
          loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
          currentId: (new Date().getTime()),
          flash: action.flash,
          queue: [],
        }
      }
      return {
        loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
        currentId: state.currentId,
        flash: state.flash,
        queue: [
          ...state.queue,
          action.flash,
        ],
      }
    case FLASH_POP:
      if (state.queue.length <= 0) {
        return {
          loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
          currentId: 0,
          flash: undefined,
          queue: [],
        }
      } else {
        return {
          loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
          currentId: (new Date().getTime()),
          flash: state.queue[0],
          queue: state.queue.slice(1),
        }
      }
    case FLASH_CLEAR_AND_SHOW:
      return {
        loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
        currentId: (new Date().getTime()),
        flash: action.flash,
        queue: [],
      }
    case FLASH_CLEAR:
      return {
        loaderCount: (action.hideLoader ? Math.max(0, state.loaderCount - 1) : state.loaderCount),
        currentId: 0,
        flash: undefined,
        queue: [],
      }
    case LOADER_SHOW:
      return {
        ...state,
        loaderCount: state.loaderCount + 1
      }
    case LOADER_HIDE:
      return {
        ...state,
        loaderCount: Math.max(0, state.loaderCount - 1)
      }
    default:
      return state
  }
}
