import React from 'react'

import TotalStatistics from './TotalStatistics.jsx';
import UserStatistics from './UserStatistics.jsx';



const Statistics = () => {
    return (
        <div>
            <TotalStatistics />
            <UserStatistics />
        </div>
    )
}

export default Statistics