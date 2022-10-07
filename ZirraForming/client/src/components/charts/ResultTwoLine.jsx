import { dark } from "@mui/material/styles/createPalette";
import ApexChart from "react-apexcharts";

function ResultTwoLine({ xline, yline, zline, title, name, color, format }) {
  return (
    <>
      <ApexChart
        series={[
          {
            name: "지라포밍 전",
            data: yline,
            type: "line",
          },
          {
            name: "지라포밍 후",
            data: zline,
            type: "line",
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          legend: {
            labels: {
              colors: "black",
            },
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: true },
          stroke: {
            width: [6, 6],
          },
          yaxis: { show: false },
          xaxis: {
            axisBorder: { show: true },
            labels: {
              show: true,
              style: {
                colors: "black",
              },
            },
            axisTicks: { show: false },
            categories: xline,
            type: "category",
          },
          grid: {
            show: true,
          },

          tooltip: {
            y: {
              formatter: (value) =>
                `${Math.round(value * 1000) / 1000} ${format}`,
            },
          },
          markers: {
            size: [3, 3],
          },
        }}
      />
    </>
  );
}

export default ResultTwoLine;
