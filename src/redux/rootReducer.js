//Van todos los reducers
import { combineReducers } from 'redux'
import {comicReducer} from './services/comics/comicSlice'

export default combineReducers({
    comics: comicReducer
});