import ApexChart from "react-apexcharts";

function TwoLine({ xline, yline, zline, title, name, color, format }) {
  return (
    <>
      <ApexChart
        series={[
          {
            name: "Lowess smoothing",
            data: yline,
            type: "line",
          },
          {
            name: "Annual mean",
            data: zline,
            type: "line",
          },
        ]}
        options={{
          title: {
            text: title,
            align: "left",
            floating: true,
            style: {
              fontSize: "12px",
              fontWeight: "none",
              fontFamily: "Black Han Sans",
            },
          },
          theme: {
            mode: "dark",
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: [6, 2],
          },
          yaxis: { show: true },
          xaxis: {
            axisBorder: { show: true },
            labels: { show: true },
            axisTicks: { show: false },
            categories: xline,

            type: "datetime",
          },
          grid: {
            show: true,
          },
          colors: [color, "#dcdde1"],
          fill: {
            colors: [color, color],
          },
          tooltip: {
            y: {
              formatter: (value) => `${value} ${format}`,
            },
            theme: "dark",
          },
          markers: {
            size: [0, 3],
            colors: [, color],
          },
        }}
      />
    </>
  );
}

export default TwoLine;
