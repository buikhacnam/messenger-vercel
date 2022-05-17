import { Divider, Row, Typography } from 'antd'
import React from 'react'
import { Provider } from '../../../../modules/schedule/categories/Context'
import Create from '../../../../modules/schedule/categories/Create'
import Search from '../../../../modules/schedule/categories/Search'
import DataTable from '../../../../modules/schedule/categories/Table'

export default function CategoriesPage() {
	return (
		<Provider>
			<Row justify='space-between' align='middle'>
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					Danh sách Categories
				</Typography.Title>

				<Create />
			</Row>
			<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
			<Row
				justify='space-between'
				align='middle'
				style={{ marginBottom: 16 }}
			>
				<div style={{ display: 'flex', alignItems: 'top' }}>
					
					{/* <SelectedKey /> */}
				</div>
				<Search />
			</Row>

			<DataTable />
		</Provider>
	)
}
