import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ChartUser } from "../components/chart-user.component";
import { MenuHeader } from "../components/menu-header.component";
import { WeedingCountChart } from "../components/wedding-count.component";
import { WeddingMonthChart } from "../components/weeding-month.component";
import { WeedingTypesChart } from "../components/weeding-types.component";

export const Dashboard = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <MenuHeader />
        <div className="container">
          <Route exact path="/chart/user" component={ChartUser} />
          <Route
            exact
            path="/chart/weeding-types"
            component={WeedingTypesChart}
          />
          <Route
            exact
            path="/chart/weeding-count"
            component={WeedingCountChart}
          />
          <Route
            exact
            path="/chart/weeding-month"
            component={WeddingMonthChart}
          />
        </div>
      </BrowserRouter>
    </Fragment>
  );
};
