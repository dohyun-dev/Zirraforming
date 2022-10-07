import ApexChart from "react-apexcharts";

function OneLine({ xline, yline, title, name, color, format }) {
  return (
    <>
      <ApexChart
        type="line"
        series={[
          {
            name: name,
            data: yline,
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
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
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
          colors: [color],
          fill: {
            type: ["gradient"],
            gradient: { gradientToColors: ["#786c92"], stops: [0, 100] },
          },
          tooltip: {
            y: {
              formatter: (value) => `${value} ${format}`,
            },
            theme: "dark",
          },
        }}
      />
    </>
  );
}

export default OneLine;
