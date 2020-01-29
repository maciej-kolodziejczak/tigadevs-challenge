import { OptionsType } from "react-select"
import { SelectOption } from './types';

export function lowercaseObjKeys<T extends object, K extends keyof T>(obj: T): { [key: string]: T[K] } {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
  );
}

export function createReactSelectOptions(values: string[]): OptionsType<SelectOption> {
  return values.map(v => ({
    value: v,
    label: v,
  }));
}

export function extractValueFromSelectOptions(options: SelectOption[]): string[] {
  return options ? options.map(o => o.value) : [];
}