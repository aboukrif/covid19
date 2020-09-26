import React from "react";
import CountryCard from "./CountryCard";
import { Grid } from "@material-ui/core";
import mockData from "./mockData";

const Content = () => {
  const getCountryMakerCard = countryMakerObj => {
    return (
      <Grid item xs={12} sm={4}>
        <CountryCard {...countryMakerObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {mockData.map(countryMakerObj => getCountryMakerCard(countryMakerObj))}
    </Grid>
  );
};

export default Content;