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
