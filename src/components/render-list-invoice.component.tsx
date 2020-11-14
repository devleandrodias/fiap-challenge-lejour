import React, { Fragment } from "react";

export const RenderListInvoices = ({ invoices }: any) => {
  return (
    <Fragment>
      {invoices.map((x: any) => {
        return (
          <Fragment key={x.ID}>
            <span>{x.WEDDING_ID}</span>
            <br />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
