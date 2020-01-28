import React from "react";
import * as d3 from "d3";

import { DataRecord, DataFilters } from "./types";

import { Chart } from "./Chart/Chart";
import { Filters } from "./Filters/Filters";

const { useState, useEffect } = React;

export function App() {
  const [data, setData] = useState<DataRecord[]>([]);
  const [filters, setFilters] = useState<DataFilters>({
    campaigns: [],
    datasources: []
  });

  useEffect(() => {
    async function fetchData() {
      const data = (await d3.csv("/data.csv")).map(d => {
        return Object.fromEntries(
          Object.entries(d).map(([k, v]) => [k.toLowerCase(), v])
        );
      });
      setData((data as unknown) as DataRecord[]);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Filters filters={filters} setFilters={setFilters} data={data} />
      <Chart filters={filters} data={data} />
    </div>
  );
}
