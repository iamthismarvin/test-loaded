export type Tresholds = [string, string, string, string]
export type Score = 'low' | 'medium' | 'high'

export interface HealthScore {
  title: string
  value: string | null
  tresholds: Tresholds
}

export interface HealthScoreExtended extends HealthScore {
  showReversedMeter?: boolean
}

export enum Colors {
  GREEN = '#60cd8d',
  RED = '#e40039',
  YELLOW = '#ffc341',
}
