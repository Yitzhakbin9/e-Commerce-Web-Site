import React from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';


const TotalStatistics = () => {
    const data = [
        { label: 'Clothing', value: 400, color: '#0088FE' },
        { label: 'Tech', value: 300, color: '#00C49F' },
        { label: 'School', value: 300, color: '#FFBB28' },
        { label: 'Beauty', value: 200, color: '#FF8042' },
    ];

    const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        hideLegend: false,
    };

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };



    return (
        <div>Total Statistics
            <br/>
            <br/>
            <br/>
            <PieChart
                series={[
                    {
                        outerRadius: 100,
                        data,
                        arcLabel: getArcLabel,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: 18,
                    },
                }}
                {...sizing}
            />
        </div>
    )
}

export default TotalStatistics