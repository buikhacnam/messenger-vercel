import {Button, Pagination} from 'antd'
import styled from 'styled-components'
interface RenderPaginationSimpleProps {
	count: number
	page: { current: number; pageSize: number }
	setPage: (page: { current: number; pageSize: number }) => void
	loading: boolean
}
const RenderPaginationSimple = ({ count, page, setPage, loading }: RenderPaginationSimpleProps) => {
	
	const onChange = (current: any, pageSize: any) => {
		setPage({ current, pageSize })
	}

	function itemRender(current: any, type: any, originalElement: any) {
	
		if (type === 'next') {
			return <Button type='link' loading={loading} disabled={loading}>{loading? <a>Loading more...</a>: <a>Load more</a>}</Button>
		} else return null
	
	}
	return (
		<div
			style={{
				textAlign: 'center',
			}}
		>
			<PaginationStyle
				simple
				current={page.current}
				pageSize={page.pageSize}
				total={count}
				onChange={onChange}
				itemRender={itemRender}
			/>
		</div>
	)
}

const PaginationStyle = styled(Pagination)`
	.ant-pagination-simple-pager {
		display: none !important;
	}

	.ant-pagination-prev {
		display: none !important;
	}

	
`
export default RenderPaginationSimple