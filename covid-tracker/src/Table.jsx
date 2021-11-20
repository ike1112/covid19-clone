import React from 'react';
import numberal from "numeral";


import "./Table.css";



function Table({ countries}) {
    return (
        <div className="table">
         <table >
                    <tbody>
                    {
                        // destructing
                        countries.map((country,index) => (
                            <tr key={ index}>
                                <td>{ country.country}</td>
                                <td><strong>{ numberal(country.cases).format("0,0")}</strong></td>
                        </tr>
                    ))
                        }
                    </tbody>
            </table>
        </div>
       
    )
}

export default Table
