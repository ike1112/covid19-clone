import React, { useState, useEffect } from 'react';
import {Line} from "react-chartjs-2";
import { options } from "./options";


function LineGraph({ casesType='cases', ...props}) {
    const [data, setData] = useState({});

     const buildChartData = (data,casesType) => { 
        const chartData = [];
        let lastDataPoint;

       for(let date in data.cases) { 
            if (lastDataPoint)
            {
                 const newDataPoint = {
                    x: date,
                    y:data[casesType][date]-lastDataPoint
                }
                chartData.push(newDataPoint);
             }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }


    useEffect(() => {
        console.log(casesType);
        const fetchData = async (casesType) => { 
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            .then((response) => response.json())
            .then((data) => { 
                const chartData = buildChartData(data, casesType);
                console.log(chartData);
                setData(chartData);
            })
        }
        fetchData(casesType);
    }, [casesType]);
    

   


    return (
        <div className={ props.className}>
            {/* equals: data && data.length. checks if data exists */}
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            }
                        ]
                    }}/>
         )}
        </div>
    )
}

export default LineGraph

