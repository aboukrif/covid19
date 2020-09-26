import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import mockData from "./mockData"
import axios from "axios";

const InfoPays = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { countryId } = params;
    const [countryData, setCountry] = useState({});
    //const countryData = allData["Countries"];
    const country = countryData[countryId];
    
    useEffect(() => {
        axios
          .get(`https://coronavirus-19-api.herokuapp.com/countries`)
          .then(function (response) {
            const { data } = response;
            //const { country } = data;
           
            const newCountryData = {};
            console.log(response);
            console.log(data);
            
            data.forEach((country, index) => {
              newCountryData[index] = {
                id : index,
                Country : country.country,
                Total : country.cases,
                Today : country.todayCases,
                Active : country.todayDeaths,
                TotalDeaths : country.deaths,
                TodayDeaths : country.todayDeaths,
                Recovered: country.recovered,
                Critical: country.critical,
  
               
              };
            });
            console.log(newCountryData)
            setCountry(newCountryData);
          })
          .catch(function (error){
              setCountry(false);
          
          });
      }, []);
  
    const generateCountryJSX = () => {
      const { Country, CountryCode,Total, Today, Active, TotalDeaths, TodayDeaths, Recovered, Critical } = country;
      //const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      //const { front_default } = sprites;
      return (
        <>
          <Typography variant="h1">
            {CountryCode} {Country}
            
          </Typography>
          
          <Typography variant="h3">Country Info</Typography>
          <Typography>Total : {Total}</Typography>
          <Typography>Aujourd'hui : {Today}</Typography>
          <Typography>Actifs : {Active}</Typography>
          <Typography>Total morts : {TotalDeaths}</Typography>
          <Typography>Morts  Aujourd'hui : {TodayDeaths}</Typography>
          <Typography>Total rétablis : {Recovered}</Typography>
          <Typography>Cas critiques : {Critical}</Typography>
          
        </>
      );
    };
    return (
      <>
      
      
        {country === undefined && <CircularProgress />}
        {country !== undefined && country && generateCountryJSX(country)}
        {country === false && <Typography> Pays non trouvé</Typography>}
        {country !== undefined && (
          <Button variant="contained" onClick={() => history.push("/")}>
            Retour
          </Button>
        )}
        
      </>
    );
  };
  export default InfoPays;