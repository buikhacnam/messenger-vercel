import React from 'react'
import { Table, Button, Menu, Dropdown } from 'antd'
import styled from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import deleteConfirm from '../../../components/DeleteConfirm'
import RenderPagination from '../../../components/Pagination'
import { ContextValueType, useProviderContext } from './Context'

const RenderAction = (action: string, props?: any) => {
	const {
		dataSearch,
		setDrawerVis,
		setDataId
	
	}: ContextValueType = useProviderContext()
	const { id } = props
	// const navigate = useNavigate()
	const menu = (
		<Menu>
			<Menu.Item
				onClick={() => {
					setDataId(id)
					setDrawerVis(true)
				}}
			>
				Cập nhật
			</Menu.Item>
			<Menu.Item
				onClick={() =>
					deleteConfirm(
						'Xóa categories',
						'Bạn có chắc chắn muốn xóa categories này không?',
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
		setDrawerVis,
		setDataId
	
	}: ContextValueType = useProviderContext()

	const columns: any = [
		{
			title: 'TÊN',
			dataIndex: 'name',
			ellipsis: true,
			fixed: 'left',
			sorter: (a: any, b: any) => {
				return a.name.localeCompare(b.name)
			},
			render: (text: string, record: any) => {
				const {id} = record
				return <a onClick={() => {
					setDataId(id)
					setDrawerVis(true)
				}}>{text}</a>
			}
		},
		{
			title: 'COLOR',
			dataIndex: 'colorSchedule',
			ellipsis: true,
			sorter: (a: any, b: any) => {
				return a.colorSchedule.localeCompare(b.colorSchedule)
			},
			// render: (text: string, record: any) => {
			// 	return <span style={{color: record?.colorSchedule}}>{text}</span>
			// }
		},

		{
			title: 'NỘI DUNG',
			dataIndex: 'description',
			ellipsis: true,
			sorter: (a: any, b: any) => {
				return a.description.localeCompare(b.description)
			},
		}
		,
        {
			title: 'NGÀY TẠO',
			dataIndex: 'createDate',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.createDate) {
					return <span>{text?.substring(0,10)}</span>
				}
			},
            sorter: (a: any, b: any) => {
				return a.createDate.localeCompare(b.createDate)
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
			sorter: (a: any, b: any) => {
				return a.updateDate.localeCompare(b.updateDate)
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
				// pagination={false}
				loading={dataSearch.loading}
				scroll={{ y: '57vh' }}
			/>
			{/* <div>
				<RenderPagination
					count={dataSearch.count}
					page={page}
					setPage={setPage}
				/>
			</div> */}
		</div>
	)
}
export default DataTable

