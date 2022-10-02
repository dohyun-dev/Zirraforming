import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

// import "react-calendar-heatmap/dist/styles.css";
import "./Chart.css";

const today = new Date();

function GrassGraph({ setDate, data }) {
  const datas = Object.values(data);
  const dataKey = Object.keys(data);
  const Values = dataKey.map((key) => {
    // const temp = datas[index];
    // console.log(temp);
    // console.log(temp?.length);
    return {
      // date: startDate(today, index),
      // count: temp?.length,
      date: getDate(key),
      count: data[key].length || 0,
    };
  });

  function getDate(date) {
    const newDate = new Date(date);
    return newDate;
  }

  function StartDate(date) {
    const year = new Date(date).getFullYear();
    const newDate = new Date(year - 1, 12, 0);

    return newDate;
  }

  function endDate(date) {
    const newDate = new Date(date);
    newDate.setMonth(11);
    newDate.setDate(31);
    // console.log(newDate);
    return newDate;
  }
  return (
    <>
      <CalendarHeatmap
        startDate={StartDate(today)}
        endDate={endDate(today)}
        values={Values}
        // monthLabels={["Jan", "Feb", "March", "April"]}
        classForValue={(value) => {
          return `color-github-${value?.count}`;
        }}
        tooltipDataAttrs={(value) => {
          // console.log(value);
          return {
            "data-tip": `${value.date?.toISOString().slice(0, 10)} 지라포밍 : ${
              value.count
            } 회`,
          };
        }}
        showWeekdayLabels={false}
        showMonthLabels={true}
        onClick={(value) => setDate(value.date?.toISOString().slice(0, 10))}
        transformDayElement={(element, value, index) =>
          React.cloneElement(element, { rx: 3, ry: 3 })
        }
      />
      <ReactTooltip textColor="blue" />
    </>
  );
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default GrassGraph;
