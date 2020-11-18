import React, { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getWedding } from "../services";
import { Loading } from "./loading.component";
import { colorList } from "../shared/color-list";

export const GuestsByBudgetChart: React.FC = () => {
  const loadData = useCallback(async () => {
    setData(await getWedding());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const createGuestsBudgetData = (data: any) => {
    let dataSeries: any[] = [];
    let calcSource: any = {};

    for (let i in data) {
      if (
        data[i]["BUDGET"] !== "NULL" &&
        data[i]["NUMBER_OF_GUESTS"] !== "NULL" &&
        data[i]["NUMBER_OF_GUESTS"] <= 500
      ) {
        let style = data[i]["STYLE"];

        if (!(style in calcSource)) {
          calcSource[style] = [];
        }

        calcSource[style].push([
          data[i]["NUMBER_OF_GUESTS"],
          data[i]["BUDGET"],
        ]);
      }
    }

    let i = 0;

    for (let style in calcSource) {
      let dataPoint = {
        name: style,
        color: colorList[i] + "77",
        data: calcSource[style],
      };

      dataSeries.push(dataPoint);

      i++;
    }

    return dataSeries;
  };

  var dataSeries = createGuestsBudgetData(data);

  const options = {
    colors: colorList,
    chart: {
      type: "scatter",
      zoomType: "xy",
    },
    title: {
      text: "Custo por Número de Convidados",
    },
    xAxis: {
      title: {
        enabled: true,
        text: "Número de convidados",
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: "Custo (R$)",
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      x: 100,
      y: 70,
      floating: true,
      backgroundColor: "white",
      borderWidth: 1,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          // eslint-disable-next-line
          pointFormat: "{point.x} convidados, R${point.y}",
        },
      },
    },
    series: dataSeries,
  };

  return loading ? (
    <Loading />
  ) : (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
