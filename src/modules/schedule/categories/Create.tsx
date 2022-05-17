import React from 'react'
import { Drawer, Button } from 'antd'
import { ContextValueType, useProviderContext } from './Context'
import Form from './Form'

interface CreateProps {}

const Create: React.FC<CreateProps> = ({}) => {
	const {
		drawerVis,
		setDrawerVis,
		setDataId,
		dataId
	}: ContextValueType = useProviderContext()
	return (
		<>
			<Button
				type='primary'
				onClick={() => {
					setDataId(null)
					setDrawerVis(true)
				}}
			>
				Tạo categories
			</Button>

			<Drawer
				title={dataId? 'Cập nhật categories': 'Tạo categories'}
				visible={drawerVis}
				onClose={() => {
					setDrawerVis(false)
				}}
				width={1100}
			>
				<Form />
			</Drawer>
		</>
	)
}
export default Create
