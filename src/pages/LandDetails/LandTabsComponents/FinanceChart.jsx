import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label text-xl text-primary-Main font-medium">{`${payload[0].value}`}</p>
            </div>
        )
    }

    return null
}

const DashedCursor = ({ points }) => {
    const [point] = points
    if (!point) return null

    return (
        <line
            x1={point.x}
            y1={0}
            x2={point.x}
            y2={point.chartY}
            stroke="#C69F39"
            strokeWidth={2}
            strokeDasharray="5 5"
        />
    )
}

const CustomChart = ({ financeDetails }) => {
    const data = Array.isArray(financeDetails?.mapData)
        ? financeDetails.mapData
        : []
    console.log(financeDetails)

    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <LineChart data={data}>
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="0%"
                            stopColor="#D4A157"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="100%"
                            stopColor="#D4A157"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={true}
                    horizontal={false}
                />

                <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    interval="preserveStartEnd"
                    tick={{ fill: '#837550', fontWeight: 700 }}
                />

                <Tooltip
                    content={<CustomTooltip />}
                    cursor={<DashedCursor />}
                />

                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#C69F39"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                        r: 15,
                        fill: '#C69F39',
                        stroke: '#fff',
                        strokeWidth: 10,
                        cursor: 'pointer',
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomChart

// import { Line } from 'react-chartjs-2'
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Filler,
// } from 'chart.js'

// // Register the required components
// ChartJS.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Filler
// )

// const data = {
//     labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
//     datasets: [
//         {
//             label: 'Price',
//             data: [60, 60, 50, 25, 90, 100, 110, 130, 150],
//             borderColor: '#D4A157',
//             borderWidth: 3,
//             pointBackgroundColor: '#fff',
//             pointBorderColor: '#D4A157',
//             pointHoverBackgroundColor: '#fff',
//             pointHoverBorderColor: '#D4A157',
//             pointRadius: 0,
//             pointHoverRadius: 10,
//             fill: true,
//             backgroundColor: 'rgba(212, 161, 87, 0.1)', // Add color below the line
//             tension: 0.4, // Make the line curved
//         },
//     ],
// }

// const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//         x: {
//             grid: {
//                 display: false, // Remove vertical grid lines above the years
//             },
//             ticks: {
//                 font: {
//                     size: 14, // Ensure the font size is appropriate
//                     weight: 'bold', // Make the text bold to enhance visibility
//                 },
//                 color: '#333', // Darken the color for better visibility
//             },
//         },
//         y: {
//             display: false, // Hide y-axis
//         },
//     },
//     plugins: {
//         tooltip: {
//             enabled: true,
//         },
//         legend: {
//             display: false, // Hide legend
//         },
//     },
//     interaction: {
//         mode: 'index',
//         intersect: false, // Tooltip follows the line and not just the points
//     },
// }

// const CustomChart = () => {
//     return (
//         <div style={{ width: '100%', height: '300px' }}>
//             <Line data={data} options={options} />
//         </div>
//     )
// }

// export default CustomChart
