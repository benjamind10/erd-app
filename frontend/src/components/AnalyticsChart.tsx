import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler,
} from 'chart.js';
import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register necessary Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

interface AnalyticsChartProps {
    data: any; // The chart data
    options: ChartOptions<'line'>; // The chart options
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, options }) => {
    return <Line data={data} options={options} />;
};

export default AnalyticsChart;
