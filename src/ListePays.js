import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Header from "./Header";
import Content from "./Content";
import SearchIcon from "@material-ui/icons/Search";
import mockData from "./mockData"
import axios from "axios";

const useStyles = makeStyles({
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    witdh: "auto",
    display: "flex",
    backgroundColor: "white",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
});

const ListePays = (props) => {
  const classes = useStyles();
  const {history} = props;
  const [countryData, setCountryData] = useState({});
  const [filter, setFilter] = useState("");
  //const countryData = allData["Countries"];
  
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
          setCountryData(newCountryData);
        });
    }, []);

    const handleSearchChange = (e) => {
      setFilter(e.target.value);
    };

    const getCountryCard = (countryId) => {
    console.log(countryData[countryId])
    //const {Country, CountryCode,Total, Today, Active, TotalDeaths, TodayDeaths, Recovered, Critical } = countryData[countryId];
    const {Country, CountryCode,Total, Today } = countryData[countryId];
    
    //const { id, name, sprite } = countryData[countryId];
    return (

      <Grid item xs={12} sm={4} key={countryId}>
        
        <Slide direction="up" in={countryData} timeout={800} mountOnEnter unmountOnExit>
        <Card onClick={() => history.push(countryId)}>
        <CardHeader
            
            
            title={Country}
            subheader={CountryCode}
          />
          <CardMedia
            className={classes.cardMedia}
           
            style={{ width: "130px", height: "auto" }}
          />
          <CardContent className={classes.cardContent}>
            
            <Typography>Total : {Total}</Typography>
            <Typography>Aujourd'hui : {Today}</Typography>
            {/*<Typography>Actifs : {Active}</Typography>
            <Typography>Total morts : {TotalDeaths}</Typography>
            <Typography>Morts  Aujourd'hui : {TodayDeaths}</Typography>
            <Typography>Total rétablis : {Recovered}</Typography>
            <Typography>Cas critiques : {Critical}</Typography>*/}
              
            
          </CardContent>
        </Card>
        </Slide>
      </Grid>
    );
  };
  
  return (
      <>
      <Grid container direction="column" spacing={10}>
      <Grid item>
        <Header />
        
      </Grid>
      
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item container spacing={2} xs={12} sm={10} justify="center" >
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField 
              fullWidth 
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Pays"
              variant="standard"
            />
          </div>
        </Grid>
        <Grid item xs={false} sm={1} />
          
      </Grid>
      
      {countryData ? (
        
        
        <Grid item container>
          
          <Grid item xs={false} sm={2} />
          <Grid item container spacing={2} xs={12} sm={8}>
            
            {Object.keys(countryData).map(
              (countryId) =>
                countryData[countryId].Country.includes(filter) &&
                getCountryCard(countryId)
            )}
           
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      ) : (
        <CircularProgress />
      )} 
      
      </Grid>
      </> 
    
  );
};

export default ListePays;