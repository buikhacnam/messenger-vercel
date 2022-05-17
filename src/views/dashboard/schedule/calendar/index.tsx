import React, { useState } from 'react'
import './styles.css'
import ScheduleCalendar from '../../../../modules/schedule/calendar/ScheduleCalendar'
import { Typography, Row, Button, Divider, Drawer, message } from 'antd'
import EditorWindow from '../../../../modules/schedule/calendar/EditorWindow'
import { useDispatch, useSelector } from 'react-redux'
import { WorkingActionTypes } from '../../../../redux/constants/working/workingConstants'
import { createMeetup } from '../../../../api'
import { IAppState } from '../../../../redux/reducers/rootReducer'
const { Title } = Typography

interface Props {}

const SchedulePage: React.FC<Props> = ({}) => {
	return (
		<>
			<Row justify='space-between'>
				<Title level={3} style={{ marginBottom: 0 }}>
					Lịch hẹn
				</Title>
				<RenderCTA />
			</Row>
			<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
			<ScheduleCalendar />
		</>
	)
}

const RenderCTA = () => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const createWorkingState = useSelector(
		(state: IAppState) => state.createWorking
	)
	const { loading } = createWorkingState

	const handleSubmit = async (data: any, close = true) => {
		dispatch({ type: WorkingActionTypes.CREATE_WORKING_REQUEST })

		try {
			const res = await createMeetup(data)
			console.log('res of onSubmit', res)
			message.success('Tạo mới thành công')
			dispatch({ type: WorkingActionTypes.CREATE_WORKING_SUCCESS })
		} catch (err) {
			message.error('Có lỗi xảy ra, vui lòng thử lại')
			console.log('err', err)
		}
		dispatch({ type: WorkingActionTypes.CREATE_WORKING_FAILURE })

		if (close === true) setVisible(false)
	}

	return (
		<div>
			<Button
				type='primary'
				onClick={() => setVisible(true)}
			>
				Tạo mới
			</Button>

			<Drawer
				title={<Title level={4}>Tạo mới lịch hẹn</Title>}
				visible={visible}
				onClose={() => setVisible(false)}
				footer={null}
				width={450}
			>
				<EditorWindow
					dataSelected={null}
					type={'brand-new'}
					onSubmit={handleSubmit}
					loading={loading}
					onClose={() => setVisible(false)}
				/>
			</Drawer>
		</div>
	)
}
export default SchedulePage
