import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getInvoice } from "../services";
import { RenderListInvoices } from "./render-list-invoice.component";

export const InvoiceChart = () => {
  const [invoices, setInvoices] = useState([]);

  const loadingData = useCallback(async () => {
    setInvoices(await getInvoice());
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Fragment>
      <h1>Listagem Invoices</h1>
      <RenderListInvoices invoices={invoices} />
    </Fragment>
  );
};
