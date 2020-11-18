import React, { Fragment } from "react";
import { ChartUser } from "../components/chart-user.component";
import { WeedingCountChart } from "../components/wedding-count.component";
import { WeddingMonthChart } from "../components/weeding-month.component";
import { WeedingTypesChart } from "../components/weeding-types.component";
// import { WeedingTypesChart } from "../components/weeding-types.component";

export const Dashboard = () => {
  return (
    <Fragment>
      <ChartUser />
      {/* <WeedingTypesChart /> */}
      <WeedingTypesChart />
      <WeedingCountChart />
      <WeddingMonthChart />
    </Fragment>
  );
};
