import { combineReducers } from 'redux'
import predict from './predict'
import counter from './counter'
import mobile from './mobile'

export default combineReducers({
  predict,
  counter,
  mobile
})
