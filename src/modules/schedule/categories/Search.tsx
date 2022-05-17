import React, { useRef } from 'react'
import { ContextValueType, useProviderContext } from './Context'
import { Input } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import { debounce } from '../../../utils/common/debounce'
interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
	const { searchState, setSearchState }: ContextValueType = useProviderContext()
	const delayedQuery = useRef(
		debounce(
			(v: string) =>
            setSearchState({ textSearch: { value: v } }),
			700
		)
	).current

	const handleChange = (e: any) => {
		delayedQuery(e.target.value)
	}
	return (
		<>
			<Input
				onChange={handleChange}
				placeholder='Tìm kiếm'
				prefix={<SearchOutlined />}
                style={{maxWidth: '250px'}}
			/>
		</>
	)
}
export default Search
