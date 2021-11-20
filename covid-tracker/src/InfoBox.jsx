import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import "./Infobox.css";

function InfoBox({ title,cases,isRed,total,active,...props}) {
    return (
        <Card onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"}  ${isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__cases">
                    { title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                 <Typography color="textSecondary" infoBox__total>
                    { total} Total
                </Typography>
            </CardContent>
       </Card>
    )
}

export default InfoBox
