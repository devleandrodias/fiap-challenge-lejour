import React, { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getWedding } from "../services";
import { colorList } from "../shared/color-list";
import { Loading } from "./loading.component";

export const WeedingCountChart: React.FC = () => {
  const loadData = useCallback(async () => {
    setData(await getWedding());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const createWeddingCountData = (data: any) => {
    let dataSeries: any = [];
    let calcSource: any = {};
    let yearList: any[] = [];

    for (let i in data) {
      if (data[i]["WEDDING_DATE"] !== "NULL" && data[i]["BUDGET"] !== "NULL") {
        let style = data[i]["STYLE"];
        let year = data[i]["WEDDING_DATE"].substring(0, 4);

        if (!yearList.includes(year)) {
          yearList.push(year);
        }

        if (!(style in calcSource)) {
          calcSource[style] = {};
        }

        if (!(year in calcSource[style])) {
          calcSource[style][year] = 0;
        }

        calcSource[style][year] += data[i]["BUDGET"];
      }
    }

    yearList.sort();

    for (let style in calcSource) {
      let dataValues = [];

      for (let year in yearList) {
        if (!(yearList[year] in calcSource[style])) {
          calcSource[style][yearList[year]] = 0;
        }

        dataValues.push(calcSource[style][yearList[year]]);
      }

      dataSeries.push({
        name: style,
        data: dataValues,
      });
    }

    return [yearList, dataSeries];
  };

  var dataSeries = createWeddingCountData(data);

  const options = {
    colors: colorList,
    chart: {
      type: "column",
    },
    title: {
      text: "Orçamento anual",
    },
    xAxis: {
      categories: dataSeries[0],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Somatória do orçamento",
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
      // eslint-disable-next-line
      pointFormat: "{series.name}: {point.y}<br/>Valor: R${point.stackTotal}",
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
