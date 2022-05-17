import { combineReducers } from 'redux'
import { userProfileReducer } from './user/userReducers'

import {
	getWorkingListReducer,
	selectedWorkReducer,
	workingDrawerReducer,
	createWorkingReducer,
} from './working/workingReducers'

export interface IAppState {
	userProfile: any

	workingList: any
	selectedWork: any
	workingDrawer: any
	createWorking: any
}
const rootReducer = combineReducers<IAppState>({
	//user
	userProfile: userProfileReducer,

	//working
	workingList: getWorkingListReducer,
	selectedWork: selectedWorkReducer,
	workingDrawer: workingDrawerReducer,
	createWorking: createWorkingReducer,
})

export default rootReducer
