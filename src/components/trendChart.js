import React from "react";
import {Chart} from "react-charts";
import ReactApexChart from "react-apexcharts";
import {getRandomInt} from "../podo/utils";

const lineChartOptions = {
    chart: {
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        type: "datetime",
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        labels: {
            style: {
                colors: "#c8cfca",
                fontSize: "12px",
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#c8cfca",
                fontSize: "12px",
            },
        },
    },
    legend: {
        show: false,
    },
    grid: {
        strokeDashArray: 5,
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [],
        },
        colors: ["#584cf4", "#2D3748"],
    },
    colors: ["#584cf4", "#2D3748"],
};

export class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: [],
            chartOptions: {},
        };
    }

    componentDidMount() {
        let data = [];
        for (let i =0;i < 12; i++){
            data.push(getRandomInt(2000))
        }
        this.setState({
            chartData: [{
                name: 'Sales per month',
                data: data,
            },

            ],
            chartOptions: lineChartOptions,
        });
    }

    render() {
        return (
            <ReactApexChart
                options={this.state.chartOptions}
                series={this.state.chartData}
                type="area"
                width="100%"
                height="100%"
            />
        );
    }
}

export default function TrendChart() {
    // const sales = [{month: 'January', count: 10}, {month: 'February', count: 20}, {
    //     month: 'March', count: 15
    // }, {month: 'April', count: 25}, {month: 'May', count: 22}, {month: 'June', count: 30}, {
    //     month: 'July', count: 28
    // }, {month: 'August', count: 15}, {month: 'September', count: 25}, {month: 'October', count: 22}, {
    //     month: 'November', count: 30
    // }, {month: 'December', count: 28},];

    const data = React.useMemo(() => [{
        label: 'Sales per month',
        data:
            [
                {month: 'Jan', count: 18},
                {month: 'Feb', count: 20},
                {month: 'Mar', count: 15},
                {month: 'Apr', count: 25},
                {month: 'May', count: 22},
                {month: 'Jun', count: 30},
                {month: 'Jul', count: 28},
                {month: 'Aug', count: 15},
                {month: 'Sep', count: 22},
                {month: 'Oct', count: 25},
                {month: 'Nov', count: 30},
                {month: 'Dec', count: 28},
            ], color: '#584cf4'
    },

    ], [])
    const primaryAxis = React.useMemo(() => ({
        getValue: (datum: { month: string }) => datum.month,
    }), [])


    const secondaryAxes = React.useMemo(() => [{
        getValue: (datum: { count: number }) => datum.count, elementType: 'line',color: '#584cf4'
    },], [])

    const getSeriesStyle = React.useCallback((series) => {
      series.color = '#584cf4';
        return {
            fill: '#584cf4',
            stroke: '#584cf4'
        };
    }, []);

        return (<Chart
                className={''} options={{
                data, primaryAxis, secondaryAxes, getSeriesStyle
            }}/>


        )
    }