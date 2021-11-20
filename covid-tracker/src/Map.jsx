import React from 'react';
import {  MapContainer, TileLayer,Marker,Popup ,Circle} from "react-leaflet";
import "./Map.css";
import ChangeView from "./ChangeView";
import { drawCircles } from "./util";




function MyMap({ center,zoom=4,countries,casesType}) {
     return (
        <div className="map">
          
            <MapContainer className="container"
                center={center} 
                zoom={zoom} 
                // // scrollWheelZoom={false}>
                // {/* <ChangeView center={center} zoom={zoom} /> */}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* draw little circles */}
                { drawCircles(countries,casesType)}
        </MapContainer>
        </div>
    )
}

export default MyMap;
