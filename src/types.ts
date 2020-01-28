export interface DataRecord {
  date: string;
  datasource: string;
  campaign: string;
  clicks: string;
  impressions: string;
}

export interface DataFilters {
  campaigns: string[];
  datasources: string[];
}
