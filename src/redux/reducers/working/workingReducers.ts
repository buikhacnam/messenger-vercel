import { WorkingActionTypes } from '../../constants/working/workingConstants'

const initialState = {
	data: {
		workingActivitiesIncoming: [],
		workingActivitiesOverDue: [],
		workingActivitiesToday: [],
	},
	loading: false,
	error: false,
}

export const getWorkingListReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case WorkingActionTypes.GET_WORKING_REQUEST:
			return {
				...state,
				loading: true,
			}
		case WorkingActionTypes.GET_WORKING_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			}
		case WorkingActionTypes.GET_WORKING_FAILURE:
			return {
				...state,
				// loading: false,
				error: true,
			}
		case WorkingActionTypes.GET_WORKING_CLEAR_ERROR:
			return {
				...state,
				error: false,
				loading: false,
			}
		default:
			return state
	}
}

export const selectedWorkReducer = (
	state = { dataSelected: {} },
	action: Action
) => {
	switch (action.type) {
		case WorkingActionTypes.SELECT_WORKING_ITEM:
			return {
				dataSelected: action.payload,
			}
		case WorkingActionTypes.CLEAR_SELECTED_WORKING_ITEM:
			return {
				dataSelected: {},
			}
		default:
			return state
	}
}

export const workingDrawerReducer = (
	state = { open: false, unmount: true, detail: false },
	action: Action
) => {
	switch (action.type) {
		case WorkingActionTypes.OPEN_WORKING_DRAWER:
			return {
				...state,
				open: true,
			}
		case WorkingActionTypes.CLOSE_WORKING_DRAWER:
			return {
				...state,
				open: false,
				detail: false,
			}
		case WorkingActionTypes.UNMOUNT_WORKING_DRAWER:
			return {
				...state,
				unmount: true,
			}
		case WorkingActionTypes.MOUNT_WORKING_DRAWER:
			return {
				...state,
				unmount: false,
			}
		case WorkingActionTypes.TOGGLE_WORKING_DETAIL_DRAWER:
			return {
				...state,
				detail: action.payload
			}
		default:
			return state
	}
}


export const createWorkingReducer = (state = { loading: false, success: false }, action: Action) => {
	switch (action.type) {
		case WorkingActionTypes.CREATE_WORKING_REQUEST:
			return {
				loading: true,
				success: false,
			}
		case WorkingActionTypes.CREATE_WORKING_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case WorkingActionTypes.CREATE_WORKING_FAILURE:
			return {
				loading: false,
				success: false
			}
		default:
			return state
	}
}