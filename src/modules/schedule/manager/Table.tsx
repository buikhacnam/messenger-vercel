import React from 'react'
import { Table, Button, Menu, Dropdown } from 'antd'
import styled from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import deleteConfirm from '../../../components/DeleteConfirm'
import RenderPagination from '../../../components/Pagination'
import { ContextValueType, useProviderContext } from './Context'

const RenderAction = (action: string, props?: any) => {
	
	const { id } = props
	// const navigate = useNavigate()
	const menu = (
		<Menu>
			{/* <Menu.Item
			>
				Cập nhật
			</Menu.Item> */}
			<Menu.Item
				onClick={() =>
					deleteConfirm(
						'Xóa lịch hẹn',
						'Bạn có chắc chắn muốn xóa lịch hẹn này không?',
						() => {}
					)
				}
			>
				Xóa
			</Menu.Item>
		</Menu>
	)

	return (
		<Dropdown overlay={menu} placement='bottomLeft' trigger={['click']}>
			<Button
				// type='link'
				style={{ border: 'none', boxShadow: 'none' }}
				icon={<MoreOutlined style={{ fontSize: '1.5em' }} />}
			></Button>
		</Dropdown>
	)
}


const DataTable: React.FC = () => {

	const {
		dataSearch,
		page,
		setPage,
        setSortDirection,
        setSortBy,
        sortDirection
	}: ContextValueType = useProviderContext()

	const columns: any = [
		{
			title: 'TÊN',
			dataIndex: 'name',
			ellipsis: true,
			fixed: 'left',
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('name')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('name')
				} else {
					
				}
			},
			// render: (text: string, record: any) => {
			// 	// const { id } = record
			// 	return (
			// 		<a
			// 			// onClick={() => {
			// 			// 	setProjectId(id)
			// 			// 	setDrawerVis(true)
			// 			// }}
			// 		>
			// 			{text}
			// 		</a>
			// 	)
			// },
			// width: 250
		},
		{
			title: 'ĐỊA ĐIỂM',
			dataIndex: 'location',
			ellipsis: true,
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('location')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('location')
				} else {
					
				}
			},
		},
		{
			title: 'NGƯỜI TẠO',
			dataIndex: 'updateUser',
			ellipsis: true,
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('update_user')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('update_user')
				} else {
					
				}
			},
		},
		{
			title: 'NỘI DUNG',
			dataIndex: 'description',
			ellipsis: true,
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('description')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('description')
				} else {
					
				}
			},
		}
		,{
			title: 'NGÀY BẮT ĐẦU',
			dataIndex: 'startDateTime',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.createDate) {
					return <span>{text?.substring(0,10)}</span>
				}
			},
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('start_date_time')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('start_date_time')
				} else {
					
				}
			},
			
		},{
			title: 'NGÀY KẾT THÚC',
			dataIndex: 'endDateTime',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.updateDate) {
					return <span>{text?.substring(0,10)}</span>
				}
			},
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('end_date_time')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('end_date_time')
				} else {
					
				}
			},
		},
        {
			title: 'NGÀY TẠO',
			dataIndex: 'createDate',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.createDate) {
					return <span>{text?.substring(0,10)}</span>
				}
			},
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('create_date_time')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('create_date_time')
				} else {
					
				}
			},
            
			
		},{
			title: 'NGÀY CẬP NHẬT',
			dataIndex: 'updateDate',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.updateDate) {
					return <span>{text?.substring(0,10)}</span>
				}
			},
            sorter: (a: any, b: any, c: any) => {
				if (
					c === 'ascend' &&
					(!sortDirection || sortDirection === 'desc')
				) {
					setSortDirection('asc')
					setSortBy('update_date_time')
				} else if (
					c === 'descend' &&
					(!sortDirection || sortDirection === 'asc')
				) {
					setSortDirection('desc')
					setSortBy('update_date_time')
				} else {
					
				}
			},
		},
		{
			render: (text: string, props: any) => RenderAction(text, props),
			fixed: 'right',
			width: 50,
		},
        
	]

	return (
		<div>
			<Table
				size='small'
				columns={columns}
				dataSource={dataSearch.data}
				rowKey={(record: any) => record.id}
				pagination={false}
				loading={dataSearch.loading}
				scroll={{ y: '57vh',  x: '110vw' }}
			/>
			<div>
				<RenderPagination
					count={dataSearch.count}
					page={page}
					setPage={setPage}
				/>
			</div>
		</div>
	)
}
export default DataTable

