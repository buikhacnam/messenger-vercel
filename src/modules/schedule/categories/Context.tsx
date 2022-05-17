import React, { useEffect, useState } from 'react'
import { searchCategories } from '../../../api'

const Context = React.createContext<TODO>(null)
const initialSearch: TODO = {
	textSearch: { value: '' },
}
    //pageSize, pageNumber, , , , , , textSearch, orderBy, orderType

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const [dataSearch, setDataSearch] = useState({
		count: 0,
		data: [],
		loading: false,
	})
    const [drawerVis, setDrawerVis] = useState(false)
    const [dataId, setDataId] = useState(null)

	
	const [searchState, setSearchState] = useState(initialSearch)
	
	const {  textSearch } = searchState
	useEffect(() => {
		fetchSearch()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState])

	const fetchSearch = async () => {
		const query = `&textSearch=${textSearch.value || ''}`


		console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", query)
		
		try {
			setDataSearch({ ...dataSearch, loading: true })
			const dataRes = await searchCategories(
				query
			)
			const data = dataRes?.data?.responseData
			setDataSearch({
				count: data?.count || 0,
				data: data?.listObject || [],
				loading: false,
			})
			console.log('res data search', dataRes)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Context.Provider
			value={{
				dataSearch,
				fetchSearch,
				searchState,
				setSearchState,
				drawerVis,
				setDrawerVis,
				dataId,
				setDataId,
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
	searchState: TODO
	setSearchState: (searchState: TODO) => void
	dataId: number | null
    setDataId: (campaigntId: number | null) => void
	drawerVis: boolean
    setDrawerVis: (drawerVis: boolean) => void
}
