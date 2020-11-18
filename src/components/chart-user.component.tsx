import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useCallback, useEffect, useState } from "react";

import { getUsers } from "../services";
import { colorList } from "../shared/color-list";

export const ChartUser = () => {
  const loadData = useCallback(async () => {
    setData(await getUsers());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();

  const createuserRegisterData = (data: any) => {
    let dataSeries: any[] = [];
    let calcSource: any = {};

    for (let i in data) {
      let slice = data[i]["CREATED_AT"].substr(0, 7);

      if (!(slice in calcSource)) {
        calcSource[slice] = 0;
      }

      calcSource[slice]++;
    }

    for (let month in calcSource) {
      dataSeries.push([month, calcSource[month]]);
    }

    return dataSeries;
  };

  const options = {
    colors: colorList,
    title: {
      text: "Cadastro de usuários por mês",
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Usuários cadastrados",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b> novos usuários cadastrados no mês",
    },
    series: [
      {
        name: "Usuários",
        data: createuserRegisterData(data),
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
