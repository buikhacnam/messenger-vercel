import React, { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'

const Components: TODO = {

	LazyCalendar: lazy(() => import('./calendar')),	
	LazyScheduleManager: lazy(() => import('./schedule-manager')),
	LazyCategories: lazy(() => import('./schedule-categories')),
}

// might need different types of loading later.
const skeletonMap: TODO = {
	LazyLead: <LoadingSpinner />,
}

const LazyComponent = ({ component, ...props }: TODO) => {
	const View = Components?.[component] || Components['LazyDashboard']
	return (
		<Suspense
			// fallback={skeletonMap[component]}
			fallback={<LoadingSpinner />}
		>
			<View {...props} />
		</Suspense>
	)
}

interface Props {}

const SalePage: React.FC<Props> = ({}) => {
	return (
		<Routes>
			<Route
				path='/calendar'
				element={<LazyComponent component={'LazyCalendar'} />}
			/>
			<Route
				path='/schedule-manager'
				element={<LazyComponent component={'LazyScheduleManager'} />}
			/>
			<Route
				path='/schedule-categories'
				element={<LazyComponent component={'LazyCategories'} />}
			/>
			<Route path='/*' element={<Navigate to='/calendar' />} />
		</Routes>
	)
}
export default SalePage
