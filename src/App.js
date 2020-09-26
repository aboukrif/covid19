import React from "react";
import ListePays from "./ListePays";
import InfoPays from "./InfoPays";
import { Route, Switch } from "react-router-dom";

const App = () => (
    
    <Switch>

      
      <Route exact path="/" render={(props) => <ListePays {...props} />} />
      <Route
        exact
        path="/:countryId"
        render={(props) => <InfoPays {...props} />}
      />
    </Switch>
);

export default App;
