import React from "react";

import Select from "react-select";

import { DataRecord, DataFilters, SelectOption } from "../types";
import { createReactSelectOptions, extractValueFromSelectOptions } from "../utils";

interface FiltersProps {
  data: DataRecord[];
  filters: DataFilters;
  setFilters: (v: DataFilters) => void;
}

export function Filters({ data, filters, setFilters }: FiltersProps) {
  const campaigns = new Set(data.map(d => d.campaign).filter(v => !!v));
  const datasource = new Set(data.map(d => d.datasource).filter(v => !!v));

  const campaignsOpts = createReactSelectOptions(Array.from(campaigns));
  const datasourceOpts = createReactSelectOptions(Array.from(datasource));

  return (
    <div
      style={{
        width: 340,
        padding: "10px 20px"
      }}
    >
      <h2>Filter dimension values</h2>
      <div>
        <p>Datasource:</p>
        <Select
          options={datasourceOpts}
          defaultValue={filters.datasources}
          onChange={value =>
            setFilters({
              ...filters,
              datasources: extractValueFromSelectOptions(value as SelectOption[])
            })
          }
          isMulti
        />
      </div>
      <div>
        <p>Campaigns:</p>
        <Select
          options={campaignsOpts}
          defaultValue={filters.campaigns}
          onChange={value =>
            setFilters({
              ...filters,
              campaigns: extractValueFromSelectOptions(value as SelectOption[])
            })
          }
          isMulti
        />
      </div>
    </div>
  );
}
