import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import apiRequester from '../middlewares/apiRequester'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, apiRequester)
)

export default configureStore
