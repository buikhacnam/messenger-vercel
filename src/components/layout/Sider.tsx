import React, { useState } from 'react'
import { Avatar, Layout, Menu, Typography } from 'antd'
import {
	HomeOutlined,
	CalendarOutlined,
	BarChartOutlined,
	DotChartOutlined,
	MessageOutlined

} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'
import styled from 'styled-components'
import useWindowSize from '../../utils/common/use-window-size'
import useMyRoute from '../../utils/common/ues-my-route'

const { Sider } = Layout
const { Item } = Menu

interface SiderProps {}

const keyMap: any = {
	'/schedule/calendar': '/schedule/calendar',
	'/schedule/schedule-manager': '/schedule/schedule-manager',
	'/schedule/schedule-categories': '/schedule/schedule-categories',
	'/chat': '/chat',

}



const SiderDashboard: React.FC<SiderProps> = () => {
	const [collapsed, setCollapsed] = useState(false)
	const { width } = useWindowSize()
	const { isPopUpRoute, pathname } = useMyRoute()
	const navigate = useNavigate()
	const redirect = ({ key }: any) => {
		navigate(key)
	}
	const onCollapse = (value: boolean) => {
		console.log(value)
		setCollapsed(value)
	}


	return (
		<div style={{ position: 'relative' }}>
			{isPopUpRoute && <OverlayDiv />}

			<SiderStyled
				collapsible={!isPopUpRoute}
				onCollapse={onCollapse}
				collapsedWidth={45}
				width={255}
				collapsed={width < 768 ? true : collapsed}
				checkWidth={width}
			>
				{!collapsed && width > 768 ? (
					<div style={{ margin: '20px 8px', }}>
						<Link to='/'>
						<Typography.Title level={2} style={{background: '#5795f9', padding: 5}}>NOW APP</Typography.Title>
						</Link>
					</div>
				) : (
					<div style={{ margin: '20px 8px' }}>
						<Link to='/'>
							{/* <img src='/img/id-logo.svg' alt='lynkid' /> */}
						</Link>
					</div>
				)}
				<MenuStyled
					onClick={redirect}
					selectedKeys={
						keyMap[pathname]
							
					}
					mode='inline'
					defaultOpenKeys={['schedule']}
				>
					


					{/* <SubMenuStyled key='schedule' title='Schedule' icon={<RiseOutlined />} > */}
						<ItemStyled key='/schedule/calendar' icon={<CalendarOutlined />}>
							<span>Calendar</span>
						</ItemStyled>
						<ItemStyled key='/schedule/schedule-manager' icon={<BarChartOutlined />}>
							<span>Schudule Manager</span>
						</ItemStyled>
						<ItemStyled key='/schedule/schedule-categories' icon={<DotChartOutlined />}>
							<span>Categories Manager</span>
						</ItemStyled>
					{/* </SubMenuStyled> */}
					{/* <ItemStyled key='/chat' icon={<MessageOutlined />}>
						Chat
					</ItemStyled> */}
					<ItemStyled key='/about' icon={<HomeOutlined />}>
						About
					</ItemStyled>

					


				</MenuStyled>
			</SiderStyled>
		</div>
	)
}

export default SiderDashboard

const OverlayDiv = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
`

const SiderStyled = styled(Sider)<any>`
	height: calc(100vh - 0px);
	background: #ffffff;
	overflow-y: auto;
	.ant-layout-sider-trigger {
		background: #ffffff;
		color: #3b82f6;
		visibility: ${props => (props.checkWidth > 768 ? 'visible' : 'hidden')};
	}
`

const MenuStyled = styled(Menu)`
	/* height: calc(100vh - 0px); */
	background: #ffffff;
	/* overflow-x: hidden; */
	.ant-menu-item::after {
		border-right: none;
	}

	.ant-menu-submenu-title {
		padding-left: 11px !important;
	}
	.ant-menu-submenu-selected {
		/* background: #3B82F6 !important; */
		/* color: #ffffff !important; */
	}

	[aria-expanded='true'] {
	}

	&.ant-menu-inline {
		padding-left: 8px !important;
		padding-right: 8px;
	}
	&.ant-layout-sider-has-trigger, &.ant-layout-sider-has-trigger {
		/* padding-bottom: 1000px !important; */
	}
	&.ant-menu-inline,
	&.ant-menu-vertical,
	&.ant-menu-vertical-left {
		border-right: none;
	}
`

const SubMenuStyled = styled(SubMenu)`
	&.ant-menu-item {
		/* padding-left: 24px !important; */
	}

	.ant-menu-item-selected {
		/* background: #3b82f6 !important; */
		/* color: #ffffff; */
		border-right: none;
		&:hover {
			/* color: #ffffff; */
		}
		/* border-radius: 6px; */
	}

	.ant-menu-sub.ant-menu-inline {
		background: #ffffff;
	}
`

const ItemStyled = styled(Item)`
	&.ant-menu-item-selected {
		/* background: #3b82f6 !important; */
		/* color: #ffffff; */
		border-right: none;
		&:hover {
			/* color: #ffffff; */
		}
		/* border-radius: 6px; */
	}

	&.ant-menu-item {
		padding-left: 11px !important;
	}
`