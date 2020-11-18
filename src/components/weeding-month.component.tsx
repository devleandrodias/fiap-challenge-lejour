import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useCallback, useEffect, useState } from "react";

import { getWedding } from "../services";
import { colorList } from "../shared/color-list";

export const WeddingMonthChart: React.FC = () => {
  const loadData = useCallback(async () => {
    setData(await getWedding());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();

  const createWeddingCountData = (data: any) => {
    let dataSeries: any[] = [];
    let calcSource: any = {};
    let monthList: any[] = [];

    for (let i in data) {
      if (data[i]["WEDDING_DATE"] !== "NULL") {
        let style = data[i]["STYLE"];
        let month = data[i]["WEDDING_DATE"].substring(0, 7);

        if (!monthList.includes(month)) {
          monthList.push(month);
        }

        if (!(style in calcSource)) {
          calcSource[style] = {};
        }

        if (!(month in calcSource[style])) {
          calcSource[style][month] = 0;
        }

        calcSource[style][month]++;
      }
    }

    monthList.sort();

    for (let style in calcSource) {
      let dataValues = [];

      for (let month in monthList) {
        if (!(monthList[month] in calcSource[style])) {
          calcSource[style][monthList[month]] = 0;
        }

        dataValues.push(calcSource[style][monthList[month]]);
      }

      dataSeries.push({
        name: style,
        data: dataValues,
      });
    }

    return [monthList, dataSeries];
  };

  var dataSeries = createWeddingCountData(data);

  const options = {
    colors: colorList,

    title: {
      text: "Casamentos por mês",
    },
    xAxis: {
      categories: dataSeries[0],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total de casamentos realizados",
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
      floating: true,
      backgroundColor: "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
