import { combineReducers } from 'redux'
import predict from './predict'
import counter from './counter'

export default combineReducers({
  predict,
  counter,
})
