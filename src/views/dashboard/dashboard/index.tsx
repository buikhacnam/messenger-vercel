import React from 'react'


interface dashboardProps {

}

const DashboardPage: React.FC<dashboardProps> = ({}) => {

    return <>
        <p>The project was developed by <a href='buinam.com'>Bui Nam</a> with ❤️</p>

        <p>Backend source code: <a href='https://github.dev/buikhacnam/springboot-schedule-manager'>https://github.dev/buikhacnam/springboot-schedule-manager</a></p>
        <p>Frontend source code: <a href='https://github.dev/buikhacnam/schedule-manager-ui'>https://github.dev/buikhacnam/schedule-manager-ui</a></p>
    </>
}
export default DashboardPage