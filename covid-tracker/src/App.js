import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect, Suspense } from "react";
import "./i18n";
import i18next from "i18next";

import InfoBox from "./InfoBox";
import MyMap from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util.js";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
//import TestBilingual from "./TestBilingual";

function App() {
  //declare the variable countries
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  //the current selected country, default value is worldwide
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  //set the default map center to Canada
  const [mapCenter, setMapCenter] = useState([52.639138, -1.137683]);
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");

  //fetch the countries data
  useEffect(() => {
    //fetch() is a inbuild JavaScript method for getting resources from a server or an API endpoint
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        //sort the data
        const sortedData = sortData(data);
        setMapCountries(data);
        setCountries(countries);
        setTableData(sortedData);
      });
  }, []);

  useEffect(() => {
    // ternal operator: use `` to concat a parameter in JS
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}?yesterday=true`;
    //fetch() is a inbuild JavaScript method for getting resources from a server or an API endpoint
    const getData = async () =>
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
          if (country !== "worldwide") {
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          }
        });
    getData(); 
  }, [country]);

  return (
    <div className="app">
      <Suspense fallback={null}>
        <div className="app_left">
          <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app_dropdown">
              {/* value displays the selected country */}
              <Select
                variant="outlined"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {/* have an array that stores all the countries,
              loop through the array to generate the MenuItem components
              */}
                {countries.map((country, index) => (
                  <MenuItem value={country.value} key={index}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <button onChange={() => i18next.changeLanguage("en")}>
              English
            </button>
            <button onChange={() => i18next.changeLanguage("zh")}>
              Chinese
            </button> */}
          </div>
          <div className="app_stats">
            <InfoBox
              isRed={true}
              active={casesType === "cases"}
              onClick={(event) => setCasesType("cases")}
              title="Cornavirus cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />

            <InfoBox
              isRed={false}
              active={casesType === "recovered"}
              onClick={(event) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />

            <InfoBox
              isRed={true}
              active={casesType === "deaths"}
              onClick={(event) => setCasesType("deaths")}
              title="Deaths cases"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>
          <MyMap
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>
        {/* Header
          title+select input dropdown field
         */}
        {/* Info box */} {/* Info box */} {/* Info box */}
        {/* Table */}
        {/* Graph */}
        {/* Map */}
        <Card className="app_right">
          <CardContent>
            <h3 className="app_graphTitle">Live cases by country</h3>
            <Table countries={tableData} />
            <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} className="app_graph" />
          </CardContent>
        </Card>
      </Suspense>
      {/* <TestBilingual /> */}
    </div>
  );
}

export default App;
