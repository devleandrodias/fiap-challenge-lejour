import React, { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getWedding } from "../services";
import { colorList } from "../shared/color-list";
import { Loading } from "./loading.component";

export const WeedingTypesChart: React.FC = () => {
  const loadData = useCallback(async () => {
    setData(await getWedding());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const createWeddingTypeData = (data: any) => {
    let dataSeries: any[] = [];
    let calcSource: any = {};

    for (let i in data) {
      if (data[i]["BUDGET"] !== "NULL") {
        if (!(data[i]["STYLE"] in calcSource)) {
          calcSource[data[i]["STYLE"]] = { count: 0, budgets: [] };
        }

        calcSource[data[i]["STYLE"]]["count"]++;
        calcSource[data[i]["STYLE"]]["budgets"].push(data[i]["BUDGET"]);
      }
    }

    for (let style in calcSource) {
      let budgetList = calcSource[style]["budgets"];

      dataSeries.push({
        name: style,
        y: calcSource[style]["count"],
        z: budgetList.reduce((a: any, b: any) => a + b) / budgetList.length,
      });
    }

    return dataSeries;
  };

  const options = {
    colors: colorList,
    chart: {
      type: "pie",
    },
    title: {
      text: "Quantidade de casamentos realizados por tipo",
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Número de casamentos realizados: <b>{point.y}</b><br/>",
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "60%",
        zMin: 0,
        name: "countries",
        data: createWeddingTypeData(data),
      },
    ],
  };

  return loading ? (
    <Loading />
  ) : (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
