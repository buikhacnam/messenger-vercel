import { Divider, Row, Typography } from 'antd'
import React from 'react'
import { Provider } from '../../../../modules/schedule/manager/Context'
import Filter from '../../../../modules/schedule/manager/Filter'
import DataTable from '../../../../modules/schedule/manager/Table'

export default function ScheduleManagerPage() {
  return (
    <Provider>
       <Row justify='space-between' align='middle'>
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					Danh sách Lịch hẹn
				</Typography.Title>
				<Filter />
			</Row>
			<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
            <Row justify='space-between' align='middle' style={{marginBottom: 16}}>
				<div style={{display: 'flex', alignItems: 'top'}}>
					{/* <Filter /> */}
					{/* <SelectedKey /> */}
				</div>
				{/* <SearchAndBulkActions /> */}
			</Row>

            <DataTable />
    </Provider>
  )
}
