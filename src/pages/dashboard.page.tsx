import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ChartUser } from "../components/chart-user.component";
import { GuestsByBudgetChart } from "../components/guests_by_budget.component";
import { InvoiceAmountChart } from "../components/invoice-amount.component";
import { MenuHeader } from "../components/menu-header.component";
import { WeedingCountChart } from "../components/wedding-count.component";
import { WeddingMonthChart } from "../components/weeding-month.component";
import { WeedingTypesChart } from "../components/weeding-types.component";

export const Dashboard = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <MenuHeader />
        {/* prettier-ignore */}
        <div className="container">
          <Route exact path="/chart/user" component={ChartUser} />
          <Route exact path="/chart/weeding-types" component={WeedingTypesChart} />
          <Route exact path="/chart/weeding-count" component={WeedingCountChart} />
          <Route exact path="/chart/weeding-month" component={WeddingMonthChart} />
          <Route exact path="/chart/invoice-amount" component={InvoiceAmountChart} />
          <Route exact path="/chart/guests-by-budget" component={GuestsByBudgetChart} />
        </div>
      </BrowserRouter>
    </Fragment>
  );
};
