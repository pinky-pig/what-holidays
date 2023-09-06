export type HolidayType = 'public' | 'bank' | 'optional' | 'school' | 'observance' | string

export interface Holiday {
  /** datestring as "YYYY-MM-DD hh:mm:ss [-hh:ss]" */
  date: string
  /** start date */
  start: Date
  /** end date */
  end: Date
  /** name of holiday in selected or fallback language */
  name: string
  /** type of holiday */
  type: HolidayType
  /** the holiday rule - use for references */
  rule: string
  /** holiday is a substritute day */
  substitute?: boolean
}
