import React, { useState, useEffect } from 'react'
import {
	ScheduleComponent,
	Day,
	Week,
	Month,
	Inject,
	ViewsDirective,
	ViewDirective,
	DragAndDrop,
	Resize,
} from '@syncfusion/ej2-react-schedule'
import { L10n } from '@syncfusion/ej2-base'
import styled from 'styled-components'
import { Drawer, message, Select, Typography } from 'antd'
import EditorWindow from './EditorWindow'
import { createMeetup, getCategoryList, getMeetupLeadList } from '../../../api'
import LoadingSpinner, { SpinOverlay } from '../../../components/LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../../../redux/reducers/rootReducer'
import { WorkingActionTypes } from '../../../redux/constants/working/workingConstants'
import { formatDate2 } from '../../../utils/common/date-utils'

const { Title } = Typography
interface Props {}
L10n.load({
	'en-US': {
		schedule: {
			saveButton: 'Lưu',
			cancelButton: 'Đóng',
			deleteButton: 'Xóa',
			newEvent: 'Thêm Event',
			month: 'Tháng',
			week: 'Tuần',
			day: 'Ngày',
			today: 'Hôm nay',
			allDay: 'Cả ngày',
			start: 'Bắt đầu',
			end: 'Kết thúc',
			more: 'Thêm',
			close: 'Đóng',
			event: 'Sự kiện',
		},
	},
})
const ScheduleCalendar: React.FC<Props> = ({}) => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState<boolean>(true)
	const [dateRange, setDateRange] = useState({ start: '', end: '' })
	const [scheduleData, setScheduleData] = useState<any>([])
	const [dataSelected, setDataSelected] = useState<any>(null)
	const [titleModal, setTitleModal] = useState<string>('')
	const [drag, setDrag] = useState(false)
	const [categories, setCategories] = useState<string>('')
	const [categoryList, setCategoryList] = useState<any[]>([])
	const createWorkingState = useSelector(
		(state: IAppState) => state.createWorking
	)
	const { loading: submitLoading, success } = createWorkingState

	const calendarRef = React.useRef<any>(null)
	const drawerVisibleState = useSelector(
		(state: IAppState) => state.workingDrawer
	)
	const { open, unmount } = drawerVisibleState

	useEffect(() => {
		fetchCalendarData(dateRange.start, dateRange.end, categories)
	}, [success, dateRange,categories])

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const resCategory = await getCategoryList()
			const data = resCategory?.data?.responseData?.listObject
			setCategoryList(data)
		} catch(err) {
			console.log(err)
		}
	}

	const fetchCalendarData = async (start: string, end: string, categories: string) => {
		if (!start || !end) {
			setLoading(false)
			return
		}
		try {
			const res = await getMeetupLeadList(start, end, categories)
			console.log('res schedula data', res)
			const response = res?.data?.responseData
			setScheduleData(response)
		} catch (err) {
			message.error('Có lỗi xảy ra')
			console.log('err', err)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: TODO, close = true) => {
		dispatch({ type: WorkingActionTypes.CREATE_WORKING_REQUEST })

		try {
			const res = await createMeetup(data)
			if (titleModal === 'new') {
				message.success('Tạo mới thành công')
			} else {
				message.success('Cập nhật thành công')
			}
			dispatch({ type: WorkingActionTypes.CREATE_WORKING_SUCCESS })
		} catch (err) {
			message.error('Có lỗi xảy ra, vui lòng thử lại')
			dispatch({ type: WorkingActionTypes.CREATE_WORKING_FAILURE })

			console.log('err', err)
		}
		if (close) handleCloseModal()
	}

	const handleCloseModal = () => {
		dispatch({ type: WorkingActionTypes.CLOSE_WORKING_DRAWER })
		setTimeout(() => {
			dispatch({ type: WorkingActionTypes.UNMOUNT_WORKING_DRAWER })
		}, 300)

		if (drag) {
			setDrag(false)
			fetchCalendarData(dateRange.start, dateRange.end, categories)
		}
	}

	const onActionFailure = (args: any) => {
	}

	const onCellClick = (args: any) => {
		setTitleModal('new')
		setDataSelected(args)
		dispatch({ type: WorkingActionTypes.MOUNT_WORKING_DRAWER })
		setTimeout(() => {
			dispatch({
				type: WorkingActionTypes.OPEN_WORKING_DRAWER,
			})
		}, 0)
		//code below opens the default dialog
		// calendarRef?.current.openEditor(args, 'Add')
	}
	const onEventClick = (args: any) => {
		setTitleModal('update')
		setDataSelected(args?.event)
		dispatch({ type: WorkingActionTypes.MOUNT_WORKING_DRAWER })
		dispatch({
			type: WorkingActionTypes.TOGGLE_WORKING_DETAIL_DRAWER,
			payload: true,
		})
		setTimeout(() => {
			dispatch({
				type: WorkingActionTypes.OPEN_WORKING_DRAWER,
			})
		}, 0)

		//code below opens the default dialog
		// if (!args.event.RecurrenceRule) {
		// 	calendarRef?.current.openEditor(args.event, 'Save')
		// } else {
		// 	calendarRef?.current.quickPopup.openRecurrenceAlert()
		// }
	}

	const onDragStop = (args: any) => {
		// args.cancel = true //cancels the drop action
		setDrag(true)
		setTitleModal('update')
		setDataSelected(args?.data)
		dispatch({ type: WorkingActionTypes.MOUNT_WORKING_DRAWER })
		dispatch({
			type: WorkingActionTypes.TOGGLE_WORKING_DETAIL_DRAWER,
			payload: false,
		})
		setTimeout(() => {
			dispatch({
				type: WorkingActionTypes.OPEN_WORKING_DRAWER,
			})
		}, 0)
	}

	const onResize = (args: any) => {
		setDrag(true)
		setTitleModal('update')
		setDataSelected(args?.data)
		dispatch({ type: WorkingActionTypes.MOUNT_WORKING_DRAWER })
		dispatch({
			type: WorkingActionTypes.TOGGLE_WORKING_DETAIL_DRAWER,
			payload: false,
		})
		setTimeout(() => {
			dispatch({
				type: WorkingActionTypes.OPEN_WORKING_DRAWER,
			})
		}, 0)
	}

	const onDataBinding = (args: any) => {
		const scheduleObj: any = (document.querySelector('.e-schedule') as any)
			.ej2_instances[0]
		const currentViewDates: Date[] = scheduleObj.getCurrentViewDates()
		const startDate: Date = currentViewDates[0]
		let endDate: Date = currentViewDates[currentViewDates.length - 1]
		const nextEndDate = new Date(endDate)
		// get the end date of the next day since the api only support the time is 00:00:00
		// nextEndDate.setDate(endDate.getDate() + 1)
		const start = formatDate2(startDate.toString(), true)
		const end = formatDate2(nextEndDate.toString(), true)

		if (dateRange.start !== start && dateRange.end !== end) {
			setDateRange({ start, end })
		}
	}

	//close the default dialog window
	// function dialogClose() {
	// 	let dialogElement: any = document.querySelector('.e-schedule-dialog')
	// 	let dialogObj = dialogElement.ej2_instances[0]
	// 	dialogObj.hide()
	// }

	// // function run when dialog window is opened
	function onPopupOpen(args: any) {
		//prevent render popup:
		args.cancel = true
		//     //remove default footer buttons
		// 	let footerElement: any = document.querySelector('.e-footer-content')
		// 	footerElement.style.display = 'none'
	}
	// if (loading) return <LoadingSpinner />
	return (
		<Wrapper>
			{loading && <SpinOverlay />}
			<div style={{marginBottom: 16}}>
				<Select
					onChange={(e: any) => {
						setCategories(e.join())
					}}
					mode="multiple"
					allowClear
					placeholder="Select Categories"
					style={{ width: '100%' }}
				>
					{categoryList?.length > 0 && categoryList.map((item: any) => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
				</Select>
			</div>
			<ScheduleComponent
				ref={calendarRef}
				eventSettings={{
					dataSource: scheduleData,
					fields: {
						id: 'id',
						subject: { name: 'name', title: 'Tên hoạt động' },
						startTime: { name: 'startDateTime', title: 'Bắt đầu' },
						endTime: { name: 'endDateTime', title: 'Kết thúc' },
						description: { name: 'description', title: 'Mô tả' },
						location: { name: 'location', title: 'Địa điểm' },
					},
					enableTooltip: true,
				}}
				actionFailure={onActionFailure}
				showQuickInfo={false}
				eventClick={onEventClick.bind(this)}
				cellClick={onCellClick.bind(this)}
				popupOpen={onPopupOpen.bind(this)}
				dragStop={onDragStop.bind(this)}
				allowDragAndDrop={true}
				allowResizing={true}
				dataBinding={onDataBinding.bind(this)}
				resizeStop={onResize.bind(this)}
			>
				<ViewsDirective>
					<ViewDirective startHour={'06:00'} option='Day' />
					<ViewDirective startHour={'06:00'} option='Week' />
					<ViewDirective option='Month' />
				</ViewsDirective>
				<Inject services={[Day, Month, Week, DragAndDrop, Resize]} />
			</ScheduleComponent>
			{!unmount && (
				<Drawer
					title={
						titleModal === 'new' ? (
							<Title level={4}>Tạo mới lịch hẹn</Title>
						) : titleModal === 'update' ? (
							<Title level={4}>
								{dataSelected?.name || 'Cập nhật lịch hẹn'}
							</Title>
						) : (
							''
						)
					}
					visible={open}
					onClose={handleCloseModal}
					footer={null}
					width={450}
				>
					<EditorWindow
						dataSelected={dataSelected}
						type={titleModal}
						onSubmit={onSubmit}
						loading={submitLoading}
						onClose={handleCloseModal}
					/>
				</Drawer>
			)}
		</Wrapper>
	)
}
export default ScheduleCalendar

const Wrapper = styled.div`
	position: relative;
`
