

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchData, getObjectName, getObjectValue, getObjectNameColor, addSpaceToArrayData, setChartDataFunction } from './GenFunctions';


const Chart = ({ setChartData, chartData, heyLabel, sortType, mainData, ...props }) => {

    const handleSorting = () => {
        const numbers = {
            "01": 0,
            "02": 0,
            "03": 0,
            "04": 0, "05": 0, "06": 0, "07": 0,
            "08": 0, "09": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0, "24": 0,
            "25": 0, "26": 0, "27": 0, "28": 0, "29": 0,
            "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0,
            "36": 0, "37": 0, "38": 0, "39": 0, "40": 0
        }
        for (let key in mainData) {
            // const aKey = key.slice(0, 2)
            // debugger;
            let aOccurences = 0;
            const regex = new RegExp(key.slice(0, 2))
            const bKey = key.slice(2)
            // console.log(aKey, bKey)
            for (let secKey in mainData) {
                // console.log(aKey.test(secKey))
                regex.test(secKey) && aOccurences++;
            }
            console.log(aOccurences, regex)
        }
        console.log(numbers)

    }

    return (
        <>
            <h1>Data Results</h1>
            {sortType === 'by single' ? handleSorting() : ''}
            <Bar
                data={{ ...chartData, labels: addSpaceToArrayData(heyLabel) }}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }]
                    }
                }}
            />
        </>
    );
}

export default Chart;