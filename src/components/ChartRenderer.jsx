import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveStream } from "@nivo/stream";

const ChartRenderer = ({ type, data, config = {} }) => {
  // Ensure data is valid and contains no NaN values
  const sanitizeData = (data) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item, index) => ({
      ...item,
      id: item.id || `item-${index}`,
      value: isNaN(item.value) ? 0 : item.value || 0,
      x: item.x || index,
      y: isNaN(item.y) ? 0 : item.y || 0
    }));
  };

  const commonProps = {
    animate: true,
    motionConfig: "gentle",
    theme: {
      background: "transparent",
      textColor: "#374151",
      fontSize: 12,
      grid: {
        line: {
          stroke: "#e5e7eb",
          strokeWidth: 1,
        },
      },
      axis: {
        domain: {
          line: {
            stroke: "#d1d5db",
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: "#d1d5db",
            strokeWidth: 1,
          },
          text: {
            fill: "#6b7280",
            fontSize: 11,
          },
        },
        legend: {
          text: {
            fill: "#374151",
            fontSize: 12,
            fontWeight: 500,
          },
        },
      },
      tooltip: {
        container: {
          background: "#ffffff",
          color: "#374151",
          fontSize: 12,
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
      legends: {
        text: {
          fill: "#374151",
          fontSize: 12,
        },
      },
    },
    ...config,
  };

  // Error boundary for chart rendering
  const renderChart = () => {
    try {
      switch (type) {
        case "pie":
          return (
            <ResponsivePie
              data={sanitizeData(data)}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "category10" }}
              borderWidth={2}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#6b7280"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              {...commonProps}
            />
          );

        case "bar":
          return (
            <ResponsiveBar
              data={sanitizeData(data)}
              keys={["value"]}
              indexBy="id"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "category10" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Category",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Value",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              {...commonProps}
            />
          );

        case "line":
          return (
            <ResponsiveLine
              data={sanitizeData(data)}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Violations",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              colors={{ scheme: "category10" }}
              lineWidth={3}
              {...commonProps}
            />
          );

        case "radar":
          const radarData = Array.isArray(data) && data.length > 0 ? data : [
            { metric: "A", value: 50 },
            { metric: "B", value: 60 },
            { metric: "C", value: 70 },
          ];

          return (
            <ResponsiveRadar
              data={radarData}
              keys={["value"]}
              indexBy="metric"
              valueFormat=">-.2f"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={36}
              dotSize={8}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={{ scheme: "category10" }}
              blendMode="multiply"
              motionConfig="gentle"
              {...commonProps}
            />
          );

        case "stream":
          const streamData = Array.isArray(data) && data.length > 0 ? data : [];

          return (
            <ResponsiveStream
              data={streamData}
              keys={["critical", "high", "medium", "low"]}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time",
                legendOffset: 36,
              }}
              axisLeft={null}
              enableGridX={true}
              enableGridY={false}
              offsetType="silhouette"
              colors={{ scheme: "category10" }}
              fillOpacity={0.85}
              borderColor={{ theme: "background" }}
              {...commonProps}
            />
          );

        case "heatmap":
          return (
            <ResponsiveHeatMap
              data={data || []}
              margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
              valueFormat=">-.2s"
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: "",
                legendOffset: 46,
              }}
              axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Country",
                legendPosition: "middle",
                legendOffset: 70,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Country",
                legendPosition: "middle",
                legendOffset: -72,
              }}
              colors={{
                type: "diverging",
                scheme: "red_yellow_blue",
                divergeAt: 0.5,
                minValue: -100000,
                maxValue: 100000,
              }}
              emptyColor="#f3f4f6"
              {...commonProps}
            />
          );

        default:
          return (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Unsupported chart type: {type}</p>
            </div>
          );
      }
    } catch (error) {
      console.error("Chart rendering error:", error);
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          <p>Error rendering chart: {error.message}</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full">
      {renderChart()}
    </div>
  );
};

export default ChartRenderer;
