import React from "react";
import { Line } from "react-chartjs-2";
import Records from "../data.json";

const BarChart = (props) => {
  //function to get values from certain person's data
  function getData(person) {
    const newFilter = Records.filter((value) => {
      return value.Name?.toLowerCase().includes(person.toLowerCase());
    });
    const object = newFilter[0];
    const datasetArray = [];
    for (const key in object) {
      datasetArray.push(object[key]);
    }
    datasetArray.shift();
    return datasetArray;
  }
  //array of keys
  const object = Records[0];
  const keyArray = [];
  let meanArray = [];
  for (const key in object) {
    keyArray.push(key);
    meanArray.push(0);
  }
  meanArray.shift();
  keyArray.shift();

  //arrays of required values
  const datasetArray = getData(props.person);
  const idealArray = getData("Ideal");
  Records.forEach((item) => {
    if (item.Name != "Ideal") {
      let i = 0;
      for (const key in item) {
        if (key != "Name") {
          meanArray[i] += item[key];
          i++;
        }
      }
    }
  });
  meanArray.forEach((item, index, arr) => {
    meanArray[index] = item / Records.length;
  });

  //colors of lines
  const borderArray1 = [];
  const borderArray2 = [];
  const borderArray3 = [];
  for (let i = 0; i < Object.keys(object).length - 1; i++) {
    borderArray1.push("rgba(0, 0, 0, 1)");
    borderArray2.push("rgba(35, 11, 156, 0.8)");
    borderArray3.push("rgba(9, 128, 88, 0.8)");
  }

  return (
    <div>
      <Line
        data={{
          labels: keyArray,
          datasets: [
            {
              label: props.person || "Ideal",
              data: datasetArray,
              borderColor: borderArray2,
              borderWidth: 1.5,
              fill: false,
            },
            {
              label: "Ideal",
              data: idealArray,
              borderColor: borderArray1,
              borderWidth: 1.5,
              fill: false,
            },
            {
              label: "Mean",
              data: meanArray,
              borderColor: borderArray3,
              borderWidth: 1.5,
              fill: false,
            },
          ],
        }}
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarChart;
