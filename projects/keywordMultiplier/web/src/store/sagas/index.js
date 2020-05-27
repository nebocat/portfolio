import { takeLatest } from 'redux-saga/effects'
import {
  multiplySets,
  copyTrial,
  askDeleteTrial,
  askDeleteAllTrials,
  copyAllTrials,
  askResetAll
} from './app'
import { fetchOptions } from './keywordsEverywhere'
import { types } from '../types'

export function* sagas() {
  yield takeLatest(types.MULTIPLY_SETS, multiplySets)
  yield takeLatest(types.COPY_TRIAL, copyTrial)
  yield takeLatest(types.COPY_ALL_TRIALS, copyAllTrials)
  yield takeLatest(types.ASK_DELETE_TRIAL, askDeleteTrial)
  yield takeLatest(types.ASK_DELETE_ALL_TRIALS, askDeleteAllTrials)
  yield takeLatest(types.ASK_RESET_ALL, askResetAll)
  yield takeLatest(types.UPDATE_KEYWORDS_EVERYWHERE_OPTIONS, fetchOptions)
  // yield takeLatest(types.FETCH_VOLUME_OPTIONS, fetchVolumeOptions)
}
