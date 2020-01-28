import React from "react";

import Select from "react-select";

import { DataRecord, DataFilters } from "../types";

interface FiltersProps {
  data: DataRecord[];
  filters: DataFilters;
  setFilters: (v: DataFilters) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

function makeFilterOptions(values: Set<string>): SelectOption[] {
  return Array.from(values).map(d => ({
    value: d,
    label: d
  }));
}

function extractValues(values: SelectOption[]): string[] {
  return values ? values.map(d => d.value) : [];
}

export function Filters({ data, filters, setFilters }: FiltersProps) {
  const campaigns = new Set(data.map(d => d.campaign).filter(v => !!v));
  const datasource = new Set(data.map(d => d.datasource).filter(v => !!v));

  const campaignsOpts = makeFilterOptions(campaigns);
  const datasourceOpts = makeFilterOptions(datasource);

  return (
    <div
      style={{
        width: 300,
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
              datasources: extractValues(value as SelectOption[])
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
              campaigns: extractValues(value as SelectOption[])
            })
          }
          isMulti
        />
      </div>
    </div>
  );
}
