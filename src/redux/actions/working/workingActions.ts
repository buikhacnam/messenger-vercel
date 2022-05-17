import { Dispatch } from 'redux'
import { WorkingActionTypes } from '../../constants/working/workingConstants'
import { getWorkingLeadList } from '../../../api/index'
import { message } from 'antd'

export const fetchWorkingList = () => {
	return async function (dispatch: Dispatch) {
		try {
			dispatch({ type: WorkingActionTypes.GET_WORKING_REQUEST })
			const response = await getWorkingLeadList()
			const {
				data: { responseData },
			} = response
			console.log('working list', responseData)
			dispatch({
				type: WorkingActionTypes.GET_WORKING_SUCCESS,
				payload: responseData,
			})
		} catch (err) {
			console.log('err', err)
			// message.error('Something went wrong!')
			dispatch({
				type: WorkingActionTypes.GET_WORKING_FAILURE,
				payload: err,
			})
		}
		// dispatch({type: WorkingActionTypes.GET_WORKING_CLEAR_ERROR})
	}
}
