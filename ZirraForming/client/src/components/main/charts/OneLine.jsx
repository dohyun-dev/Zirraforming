import ApexChart from "react-apexcharts";

function OneLine({ xline, yline, title }) {
  return (
    <>
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
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
            width: 10,
          },
          yaxis: { show: true },
          xaxis: {
            axisBorder: { show: true },
            labels: { show: true },
            axisTicks: { show: false },
            categories: xline,

            // type: "datetime",
          },
          grid: {
            show: true,
          },
          colors: ["#6650d3"],
          fill: {
            type: ["gradient"],
            gradient: { gradientToColors: ["#6c7592"], stops: [0, 100] },
          },
          tooltip: {
            y: {
              formatter: (value) => `$ ${value.toFixed(3)}`,
            },
            theme: "dark",
          },
        }}
      />
    </>
  );
}

export default OneLine;
