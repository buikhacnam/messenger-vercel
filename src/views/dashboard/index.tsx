import React, { lazy, Suspense } from 'react'
import { Layout } from 'antd'
import SiderDashboard from '../../components/layout/Sider'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import useMyRoute from '../../utils/common/ues-my-route'
import { RenderBreadcrumb } from '../../components/layout/RenderBreadcrumb'

const { Content } = Layout

const Components: TODO = {
	LazyDashboard: lazy(() => import('./dashboard')),
	LazySchedule: lazy(() => import('./schedule')),
	LazyChat: lazy(() => import('./chat')),
}

// might need different types of loading later.
const skeletonMap: TODO = {
	LazyDashboard: <LoadingSpinner />,
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

interface IndexProps {}

const Dashboard: React.FC<IndexProps> = () => {
	const { pathname } = useMyRoute()

	return (
		<>
			<Layout>
				<Layout>
					<SiderDashboard />
					<Layout>
						<RenderBreadcrumb pathname={pathname} />

						<Content
							className='site-layout-background'
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							<Routes>
								{/* <Route
									path='/'
									element={<Navigate to='/dashboard' />}
								/> */}
								<Route
									path='/about'
									element={
										<LazyComponent
											component={'LazyDashboard'}
										/>
									}
								/>
								<Route
									path='/schedule/*'
									element={
										<LazyComponent
											component={'LazySchedule'}
										/>
									}
								/>
								<Route
									path='/chat/*'
									element={
										<LazyComponent component={'LazyChat'} />
									}
								/>
								<Route
									path='/*'
									element={
										<Navigate to='/chat' />
									}
								/>
							</Routes>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	)
}
export default Dashboard
