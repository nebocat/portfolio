import constants from '../../App/constants'
import types from '../types'

const defaultState = {
  disabled: [],
  trials: {
    items: [],
    shown: []
  },
  matchType: constants.MATCHTYPES.BROAD,
  copySettings: {
    dataOnly: false
  },
  notice: {
    show: false,
    item: null,
    choice: null
  },
  ip: null
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_SET_STATUS:
      if (state.disabled.includes(action.set)) {
        return {
          ...state,
          disabled: state.disabled.filter(name => name !== action.set)
        }
      }
      return {
        ...state,
        disabled: [...state.disabled, action.set]
      }
    case types.RESET_ALL_BUT_NOTICE:
      return {
        ...defaultState,
        notice: state.notice
      }
    case types.ADD_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          items: [...state.trials.items, action.trial]
        }
      }
    case types.SHOW_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          shown: [...state.trials.shown, action.slug]
        }
      }
    case types.HIDE_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          shown: state.trials.shown.filter(slug => slug !== action.slug)
        }
      }
    case types.DELETE_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          items: state.trials.items.filter(trial => trial.slug !== action.slug)
        }
      }
    case types.DELETE_ALL_TRIALS:
      return {
        ...state,
        trials: defaultState.trials
      }
    case types.CHANGE_MATCHTYPE:
      return {
        ...state,
        matchType: action.matchType
      }
    case types.ADD_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          item: action.notice
        }
      }
    case types.SHOW_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          show: true
        }
      }
    case types.HIDE_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          show: false
        }
      }
    case types.REMOVE_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          item: null
        }
      }
    case types.TOGGLE_COPY_DATA_ONLY:
      return {
        ...state,
        copySettings: {
          ...state.copySettings,
          dataOnly: !state.copySettings.dataOnly
        }
      }
    case types.ADD_IP:
      return {
        ...state,
        ip: action.ip
      }
    default:
      return state
  }
}

export default app
