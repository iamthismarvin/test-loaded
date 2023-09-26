export type Tresholds = [string, string, string, string]

export interface HealthScore {
  title: string
  value: string | null
  tresholds: Tresholds
}
