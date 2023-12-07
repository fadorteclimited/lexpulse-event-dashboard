import React from "react";
import {Chart} from "react-charts";

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