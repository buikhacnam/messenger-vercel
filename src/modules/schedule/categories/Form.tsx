import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Select, Button, message, Divider } from 'antd'
import {  createCategories, getCategoryDetail } from '../../../api'
import { ContextValueType, useProviderContext } from './Context'
const { Item } = Form
const { Option } = Select
interface ProjectFormProps {
}

const ProjectForm: React.FC<ProjectFormProps> = ({}) => {
	const formRef = useRef<any>(null)
    const {dataId, setDrawerVis, fetchSearch}: ContextValueType = useProviderContext()
	const [loading, setLoading] = useState(false)


	useEffect(() => {
        if(dataId) {
            fetchDataDetail(dataId)
        } else {
            clearForm()
        }
	}, [dataId])


    const fetchDataDetail = async (id: number) => {
        try {
            const res = await getCategoryDetail(id)
            console.log('res data detail', res)
            const data = res?.data?.responseData

            formRef.current.setFieldsValue({
                colorSchedule: data?.colorSchedule || '',
                name: data?.name || '',
                description: data?.description || '',
            })
        } catch (err) {
            console.log(err)
        }
    }

    const pushData = async(data: any) => {
		setLoading(true)
		try {
            const res = await createCategories(data)
            console.log('res create data', res)
			setLoading(false)
			if(!dataId) {
				message.success('Tạo categories thành công')
				clearForm()
			} 
			else message.success('Cập nhật categories thành công')
			fetchSearch()
			setDrawerVis(false)
        } catch(err:any) {
			setLoading(false)
            message.error(err?.responseData?.message || 'Có lỗi xảy ra');
        }
    }

    const clearForm = () => {
        formRef.current.setFieldsValue({
            colorSchedule: null,
            name: null,
            description: null,
        })
    }



    const onFinish = (values: any) => {
        
        const data = {
            ...values,
        }

        if(dataId) {
            data.id = dataId
        }
        console.log('Received values of form: ', data)
        pushData(data)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
	return (
		<Wrapper>
			<Form ref={formRef} onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<InputContainer>
					<div>
						<Item
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							label='Tên categories'
							name='name'
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tên categories',
								},
							]}
						>
							<Input placeholder='Nhập tên categories' />
						</Item>
					</div>


                    <div>
						<Item
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							label='Category color'
							name='colorSchedule'
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập category color',
								},
							]}
						>
							<Input placeholder='Nhập category color' />
						</Item>
					</div>

				</InputContainer>
				<div>
					<Item
						// style={{ marginTop: '16px' }}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						label='Mô tả categories'
						name='description'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập category color',
                            },
                        ]}
					>
						<Input.TextArea
							autoSize={{ minRows: 3 }}
							placeholder='Nhập mô tả'
						/>
					</Item>
				</div>

				<Divider />
				<ActionWrapper>
					<Button onClick={() => {
                        setDrawerVis(false)
                    }}>Hủy</Button>
						<Button
							type='primary'
							htmlType='submit'
							loading={loading}
							disabled={loading}
						>
							Lưu
						</Button>
				</ActionWrapper>
			</Form>
		</Wrapper>
	)
}
export default ProjectForm

const Wrapper = styled.div`
	padding: 24px;
`
const CheckboxContainer = styled.div`
	padding: 8px;
	display: grid;
	/* justify-content: center; */
	align-items: center;
	background: #ffffff;
`

const CheckboxWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 24px;
	row-gap: 16px;
`

const InputContainer = styled.div`
	display: grid;
	column-gap: 8px;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
`
const ActionWrapper = styled.div`
	margin-top: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
