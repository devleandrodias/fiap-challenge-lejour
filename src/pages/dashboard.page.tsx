import React, { Fragment, useEffect } from "react";
import { InvoiceChart } from "../components/invoice.component";
import { WeddingChart } from "../components/wedding.component";

export const Dashboard = () => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <InvoiceChart />
      <WeddingChart />
    </Fragment>
  );
};
