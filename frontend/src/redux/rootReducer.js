import { combineReducers } from 'redux'
import alertReducer from './alert/reducer' 


const rootReducer = combineReducers({ 
    alerts : alertReducer, 
})

export default rootReducer