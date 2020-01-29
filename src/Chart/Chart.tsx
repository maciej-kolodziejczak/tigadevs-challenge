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

  const campaignsStr = filters.campaigns.length ? filters.campaigns.join(', ') : 'all';
  const datasourcesStr = filters.datasources.length ? filters.datasources.join(', ') : 'all';

  return (
    <div
      style={{
        width: 1020,
        padding: "10px 20px"
      }}
    >
      <p>Metrics for {campaignsStr} campaigns and {datasourcesStr} datasources.</p>
      <div>
        <LineChart data={filteredData} />
      </div>
    </div>
  );
}
