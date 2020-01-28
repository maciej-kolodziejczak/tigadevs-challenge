import React from "react";
import * as d3 from "d3";
import moment from "moment";

import { DataRecord } from "../types";

interface LineChartProps {
  data: DataRecord[];
}

export class LineChart extends React.Component<LineChartProps> {
  public componentDidMount() {
    this.drawChart(this.props.data);
  }

  public componentDidUpdate() {
    this.drawChart(this.props.data);
  }

  public async drawChart(data: DataRecord[]) {
    const width = 900;
    const height = 400;
    const margin = {
      top: 10,
      right: 60,
      bottom: 30,
      left: 60
    };

    // cleanup
    d3.select("#chart svg").remove();

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x axis
    const x = d3
      .scaleTime()
      .domain([
        d3.min(data, d => moment(d.date, "DD-MM-YYYY").toDate()) as Date,
        d3.max(data, d => moment(d.date, "DD-MM-YYYY").toDate()) as Date
      ])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // y axis clicks
    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.clicks, 10)) as number])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y1));

    // y axis impressions
    const y2 = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, d => parseInt(d.impressions, 10) || 0) as number
      ])
      .range([height, 0]);
    svg
      .append("g")
      .attr(`transform`, `translate(${width}, 0)`)
      .call(d3.axisRight(y2));

    // clicks line
    const clicksLine = d3
      .line<DataRecord>()
      .x(d => x(moment(d.date, "DD-MM-YYYY")))
      .y(d => y1(parseInt(d.clicks, 10) || 0));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", clicksLine);

    // impressions line
    const impressionsLine = d3
      .line<DataRecord>()
      .x(d => x(moment(d.date, "DD-MM-YYYY")))
      .y(d => y2(parseInt(d.impressions, 10) || 0));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", impressionsLine);
  }

  public render() {
    return <div id="chart"></div>;
  }
}
