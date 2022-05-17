import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { searchMeetup } from '../../../api'

const Context = React.createContext<TODO>(null)
const initialSearch: TODO = {
	textSearch: { value: '' },
	description: { value: '' },
	name: { value: '' },
	location: { value: '' },
	fromDate: {
		value: '',
	},
	toDate: {
		value: '',
	}
}
    //pageSize, pageNumber, , , , , , textSearch, orderBy, orderType

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const [dataSearch, setDataSearch] = useState({
		count: 0,
		data: [],
		loading: false,
	})

	const [page, setPage] = useState({ current: 1, pageSize: 20 })
	const [searchState, setSearchState] = useState(initialSearch)
	const [sortDirection, setSortDirection] = useState('')
	const [sortBy, setSortBy] = useState('')
	const { name, textSearch, fromDate, toDate, description, location } = searchState
	useEffect(() => {
		fetchSearch()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ page ,searchState, sortBy, sortDirection])

	const fetchSearch = async () => {
		const query = `&name=${name.value || ''}&description=${
			description.value || ''
		}&location=${location.value || ''}&textSearch=${
			textSearch.value || ''
		}&fromDate=${fromDate.value || ''}&toDate=${toDate.value || ''}`

		const sort = `&orderBy=${sortBy}&orderType=${sortDirection}`

		console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", query+sort)
		
		try {
			setDataSearch({ ...dataSearch, loading: true })
			const dataRes = await searchMeetup(
				page.current,
				page.pageSize,
				query+sort
			)
			const data = dataRes?.data?.responseData
			setDataSearch({
				count: data?.count || 0,
				data: data?.listObject || [],
				loading: false,
			})
			console.log('res data search', dataRes)
		} catch (err:any) {
			if(err?.response?.status === 403) {
				message.error('You are not authorized to access this page!', 10)
			}
		}
	}

	return (
		<Context.Provider
			value={{
				dataSearch,
				fetchSearch,
				page,
				setPage,
				searchState,
				setSearchState,
				sortDirection,
				setSortDirection,
				sortBy,
				setSortBy,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useProviderContext = () => {
	const context = React.useContext(Context)
	if (context === undefined) {
		throw new Error('useProviderContext must be used within a Provider')
	} else {
		return context
	}
}

export type ContextValueType = {
	dataSearch: { loading: boolean; count: number; data: TODO[] }
	fetchSearch: () => void
	page: { current: number; pageSize: number }
	setPage: (page: { current: number; pageSize: number }) => void
	searchState: TODO
	setSearchState: (searchState: TODO) => void
	sortDirection: string
	setSortDirection: (sortDirection: string) => void
	sortBy: string
	setSortBy: (sortBy: string) => void
}
