import React, { useState, useRef } from 'react'
import { Button, Drawer, Form, Input, Select, Checkbox, DatePicker } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import moment from 'moment'
import { debounce } from '../../../utils/common/debounce'
import { formatDate2 } from '../../../utils/common/date-utils'
import { ContextValueType, useProviderContext } from './Context'
const { Option } = Select
const { RangePicker } = DatePicker

interface FilterProps {}

const Filter: React.FC<FilterProps> = ({}) => {
	const [visible, setVisible] = useState(false)
	const formRef = useRef<any>(null)

	const {
		searchState,
		setSearchState,
	}: ContextValueType = useProviderContext()

	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	function onChangeDate(value: any, dateString: any) {
		if (!value?.[0] && !value?.[1]) {
            setSearchState({
				...searchState,
				fromDate: {
					// ...searchState.fromDate,
					value:'',
				},
				toDate: {
					// ...searchState.toDate,
					value: '',
				},
			})
		} else {
			setSearchState({
				...searchState,
				fromDate: {
					// ...searchState.fromDate,
					value: value[0].format('YYYY-MM-DD'),
				},
				toDate: {
					// ...searchState.toDate,
					value: value[1].format('YYYY-MM-DD'),
				},
			})
		}
	}

	const delayedQuery = useRef(
		debounce(
			(e: any) =>
				setSearchState({
					...searchState,
					[e.target.name]: {
						...searchState[e.target.name],
						value: e.target.value,
					},
				}),
			700
		)
	).current

	const handleChangeInput = (e: any) => {
		delayedQuery(e)
	}

	return (
		<div>
			<Button onClick={() => showDrawer()} size={'large'} type='primary'>
				Filter <FilterOutlined />
			</Button>
			<Drawer
				title='Filter Schedule'
				placement='right'
				onClose={onClose}
				visible={visible}
                width={500}
			>
				<Wrapper>
					<Form ref={formRef}>
						<FieldContainer>
							{/* <Form.Item name='status' label='Trạng thái'>
								<Select
									placeholder='Chọn trạng thái'
									allowClear
									onChange={e =>
										setSearchState({
											...searchState,
											status: {
												value: e,
											},
										})
									}
								>
									<Option key='Draft' value='Draft'>
										Draft
									</Option>

									<Option key='Active' value='Active'>
										Active
									</Option>
									<Option key='InActive' value='InActive'>
										InActive
									</Option>
								</Select>
							</Form.Item> */}
						</FieldContainer>

						<FieldContainer>
							<Form.Item name='time' label='Ngày tạo'>
								<RangePicker
									placeholder={['Từ ngày', 'Đến ngày']}
									// defaultValue={[
									// 	moment(
									// 		formatDate2(fromDate.value),
									// 		'YYYY/MM/DD'
									// 	),
									// 	moment(
									// 		formatDate2(toDate.value),
									// 		'YYYY/MM/DD'
									// 	),
									// ]}
									showTime={{ format: 'YYYY/MM/DD' }}
									onChange={onChangeDate}
									format='DD/MM/YYYY'
								/>
							</Form.Item>
						</FieldContainer>

						<FieldContainer>
							<Form.Item label='Tiêu đề'>
								<Input
									name={'name'}
									style={{ marginBottom: 16 }}
									onChange={handleChangeInput}
									placeholder='Nhập tiêu đề'
								/>
							</Form.Item>
						</FieldContainer>

						<FieldContainer>
							<Form.Item label='Mô tả'>
								<Input
									name={'description'}
									style={{ marginBottom: 16 }}
									onChange={handleChangeInput}
									placeholder='Nhập description'
								/>
							</Form.Item>
						</FieldContainer>

						<FieldContainer>
							<Form.Item label='Địa điểm'>
								<Input
									name={'location'}
									style={{ marginBottom: 16 }}
									onChange={handleChangeInput}
									placeholder='Nhập địa điểm'
								/>
							</Form.Item>
						</FieldContainer>
					</Form>
				</Wrapper>
			</Drawer>
		</div>
	)
}
export default Filter

const Wrapper = styled.div`
	padding: 24px;
`
const FieldContainer = styled.div`
	margin-bottom: 10px;
`
