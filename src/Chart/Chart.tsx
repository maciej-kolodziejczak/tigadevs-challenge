import React from "react";

import { DataRecord, DataFilters } from "../types";

import { LineChart } from "../LineChart/LineChart";

interface ChartProps {
  data: DataRecord[];
  filters: DataFilters;
}

export function Chart({ data, filters }: ChartProps) {
  const filteredData = data.filter(d => {
    return (
      (filters.campaigns.length
        ? filters.campaigns.includes(d.campaign)
        : true) &&
      (filters.datasources.length
        ? filters.datasources.includes(d.datasource)
        : true)
    );
  });

  return (
    <div
      style={{
        padding: "10px 20px"
      }}
    >
      <div>
        <LineChart data={filteredData} />
      </div>
    </div>
  );
}
