// // ChartRenderer.jsx
// import React from "react";
// import { ResponsivePie } from "@nivo/pie";
// import { ResponsiveBar } from "@nivo/bar";
// import { ResponsiveLine } from "@nivo/line";

// const ChartRenderer = ({ type, data }) => {
//   const commonProps = {
//     animate: true,
//     motionConfig: "wobbly", // makes it snappy & stylish
//     theme: {
//       background: "#0f0f1a",
//       textColor: "#ffffff",
//       fontSize: 14,
//       tooltip: {
//         container: {
//           background: "#222",
//           color: "#fff",
//           fontSize: 14,
//         },
//       },
//     },
//   };

//   if (type === "pie") {
//     return (
//       <div style={{ height: 500 }}>
//         <ResponsivePie
//           data={data}
//           {...commonProps}
//           margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//           innerRadius={0.6}
//           padAngle={3}
//           cornerRadius={8}
//           activeOuterRadiusOffset={15}
//           colors={{ scheme: "set3" }}
//           borderWidth={2}
//           borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
//           arcLinkLabelsSkipAngle={10}
//           arcLinkLabelsTextColor="#ffffff"
//           arcLinkLabelsThickness={2}
//           arcLinkLabelsColor={{ from: "color" }}
//           arcLabelsSkipAngle={10}
//           arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
//         />
//       </div>
//     );
//   }

//   if (type === "bar") {
//     return (
//       <div style={{ height: 500 }}>
//         <ResponsiveBar
//           data={data}
//           keys={["value"]}
//           indexBy="label"
//           {...commonProps}
//           margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//           padding={0.3}
//           valueScale={{ type: "linear" }}
//           indexScale={{ type: "band", round: true }}
//           colors={{ scheme: "nivo" }}
//           borderRadius={6}
//           borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             tickSize: 0,
//             tickPadding: 10,
//             legend: "Categories",
//             legendPosition: "middle",
//             legendOffset: 40,
//           }}
//           axisLeft={{
//             tickSize: 0,
//             tickPadding: 10,
//             legend: "Values",
//             legendPosition: "middle",
//             legendOffset: -50,
//           }}
//           labelSkipWidth={12}
//           labelSkipHeight={12}
//           labelTextColor="#fff"
//         />
//       </div>
//     );
//   }

//   if (type === "line") {
//     return (
//       <div style={{ height: 500 }}>
//         <ResponsiveLine
//           data={data}
//           {...commonProps}
//           margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//           xScale={{ type: "point" }}
//           yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
//           colors={{ scheme: "category10" }}
//           lineWidth={4}
//           pointSize={12}
//           pointBorderWidth={3}
//           pointBorderColor={{ from: "serieColor" }}
//           pointLabelYOffset={-12}
//           enableArea={true}
//           areaOpacity={0.25}
//           useMesh={true}
//           gridXValues={5}
//           gridYValues={5}
//         />
//       </div>
//     );
//   }

//   return <div>No chart type selected</div>;
// };

// export default ChartRenderer;






// ChartRenderer.jsx
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveStream } from "@nivo/stream";

const ChartRenderer = ({ type, data }) => {
  const commonProps = {
    animate: true,
    motionConfig: "gentle", // smoother alternative to "wobbly"
    theme: {
      background: "#0f0f1a",
      textColor: "#ffffff",
      fontSize: 14,
      tooltip: {
        container: {
          background: "#222",
          color: "#fff",
          fontSize: 14,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        },
      },
    },
  };

  if (type === "pie") {
    return (
      <div style={{ height: 500 }}>
        <ResponsivePie
          data={data}
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          innerRadius={0.6}
          padAngle={3}
          cornerRadius={8}
          activeOuterRadiusOffset={15}
          colors={{ scheme: "set3" }}
          borderWidth={2}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#ffffff"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        />
      </div>
    );
  }

  if (type === "bar") {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveBar
          data={data}
          keys={["value"]}
          indexBy="label"
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderRadius={6}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            legend: "Categories",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            legend: "Values",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#fff"
        />
      </div>
    );
  }

  if (type === "line") {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveLine
          data={data}
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
          colors={{ scheme: "category10" }}
          lineWidth={4}
          pointSize={12}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.25}
          useMesh={true}
          gridXValues={5}
          gridYValues={5}
        />
      </div>
    );
  }

  if (type === "radar") {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveRadar
          data={data}
          keys={["value"]}
          indexBy="label"
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          borderColor={{ from: "color" }}
          gridLevels={6}
          gridShape="linear"
          dotSize={12}
          dotBorderWidth={3}
          dotBorderColor={{ from: "color" }}
          colors={{ scheme: "set2" }}
          blendMode="multiply"
        />
      </div>
    );
  }

  if (type === "heatmap") {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveHeatMap
          data={data}
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          colors={{ scheme: "red_yellow_blue" }}
          axisTop={{
            tickSize: 0,
            tickPadding: 5,
            legend: "",
            legendOffset: -20,
          }}
          axisRight={null}
          axisLeft={null}
          axisBottom={null}
          cellBorderColor="#222"
          cellBorderWidth={2}
          labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        />
      </div>
    );
  }

  if (type === "stream") {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveStream
          data={data}
          keys={Object.keys(data[0]).filter((k) => k !== "id")}
          {...commonProps}
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Time",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Value",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          offsetType="silhouette"
          colors={{ scheme: "nivo" }}
          fillOpacity={0.85}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        />
      </div>
    );
  }

  return <div>No chart type selected</div>;
};

export default ChartRenderer;
