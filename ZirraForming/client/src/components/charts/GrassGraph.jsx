import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

// import "react-calendar-heatmap/dist/styles.css";
import "./Chart.css";

const today = new Date();

function GrassGraph() {
  const randomValues = getRange(365).map((index) => {
    return {
      date: startDate(today, index),
      count: getRandomInt(0, 3),
    };
  });

  function startDate(date, day) {
    const newDate = new Date(date);
    newDate.setMonth(0);
    newDate.setDate(1 + day);
    return newDate;
  }

  function endDate(date) {
    const newDate = new Date(date);
    newDate.setMonth(11);
    newDate.setDate(31);
    console.log(newDate);
    return newDate;
  }
  return (
    <>
      <CalendarHeatmap
        startDate={startDate(today, -1)}
        endDate={endDate(today)}
        values={randomValues}
        // monthLabels={["Jan", "Feb", "March", "April"]}
        classForValue={(value) => {
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          console.log(value);
          return {
            "data-tip": `${value.date?.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={false}
        showMonthLabels={true}
        onClick={(value) => alert(`Clicked on value with count: ${value.date}`)}
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
