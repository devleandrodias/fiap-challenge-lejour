import React, { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getInvoice } from "../services";
import { Loading } from "./loading.component";
import { colorList } from "../shared/color-list";

export const InvoiceAmountChart: React.FC = () => {
  const loadData = useCallback(async () => {
    setData(await getInvoice());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const createInvoiceAmountData = (data: any) => {
    let dataSeries: any[] = [];
    let calcSource: any = {};
    let yearList: any[] = [];

    for (let i in data) {
      if (data[i]["CREATED_AT"] !== "NULL" && data[i]["ACCEPTED"] === "TRUE") {
        let category = data[i]["VENDOR_CATEGORY"];

        let year = data[i]["CREATED_AT"].substring(0, 4);

        if (!yearList.includes(year)) {
          yearList.push(year);
        }

        if (!(category in calcSource)) {
          calcSource[category] = {};
        }

        if (!(year in calcSource[category])) {
          calcSource[category][year] = 0;
        }

        calcSource[category][year] += data[i]["AMOUNT"];
      }
    }
    yearList.sort();

    for (let category in calcSource) {
      let dataValues = [];

      for (let year in yearList) {
        if (!(yearList[year] in calcSource[category])) {
          calcSource[category][yearList[year]] = 0;
        }

        dataValues.push(calcSource[category][yearList[year]]);
      }

      dataSeries.push({
        name: category,
        data: dataValues,
      });
    }

    return [yearList, dataSeries];
  };

  var dataSeries = createInvoiceAmountData(data);

  const options = {
    colors: colorList,
    chart: {
      type: "bar",
    },
    title: {
      text: "Montante anual de fornecedores",
    },
    xAxis: {
      categories: dataSeries[0],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Montante total",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "top",
      y: 25,
      floating: false,
      backgroundColor: "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      // eslint-disable-next-line
      pointFormat: "{series.name}: R${point.y}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: dataSeries[1],
  };

  return loading ? (
    <Loading />
  ) : (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
