import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData.js'

dayjs.extend(localeData)

export type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
export interface DateCell {
  text?: number
  isSelected?: boolean
  type?: DateCellType
  date: Dayjs
  remark?: any
}
// 这个只是需要判断 holiday 的类型，然后判断 select 的内容，如果不需要这个，只需要 calendar ，可以直接删除
type HolidayType = 'public' | 'bank' | 'optional' | 'school' | 'observance' | string
interface Holiday {
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

/**
 * 核心就是：知道这个月开始的日期和结束的日期，那么这个月的日历就出来了。
 * 1. 先定义数组，六行七列，42天。
 * 七列代表的是周一到周日。
 * 六行代表的是，一个月日期最多占六行。中间4*7=28(天)，一个月最多31天，所以会出现第一天在周日，而后面的日子又会占一行。
 * 2. 知道日期，就能获取是星期几，然后往对应数组中 push 。 这样遍历第一天到最后一天，就获取了这个月的日历。
 * 3. 为了连续性及好看，所以在开头末尾加上上个月或者下个月的日历的填充。
 * 假如第一天是周三，那么往前减去3，就是这一行的第一天，所以从这天算往数组中 push ，加上 'prev-month' 标志。
 * 假如第一天是周日，那么需要减去7。假如第一天是周六，那么需要减去6。
 * 最后的日期，只需要长度满足 6 * 7 = 42 就行。
 * 这里有个选中字段，因为日历是按照单个渲染的，但是前后补充的时候，有可能补充的日子也是要选中的，所以判断选中的时候，要传入所有要选中的日子
 */
export function generateMonthCalendar(date: Dayjs, holidays: Holiday[]): DateCell[][] {
  // 日历的初始值
  const rows = [[], [], [], [], [], []]
  const cols = 7
  // 返回的结果
  const calendar: DateCell[][] = rows

  // 1. 这个月的第一天
  const startDayOfMonth = date.startOf('month')
  // 2. 从第一天往前补充，计算得到这个月日历的星期日的日期。
  const startDate = startDayOfMonth.subtract(startDayOfMonth.day() || 7, 'day')

  // 3. 当前选中的日期
  const cur = date
  // 3.1 当月第一天，为了等会在遍历的时候跟日期作比较，判断是这个月、上个月还是下个月
  const monthstartDay = cur.startOf('month').day() || 7
  // 3.2 同上
  const lastDate = cur.endOf('month').date()

  // 4. 定义的判断循环的变量
  let count = 1

  // 5. 将所有的节日日期转成 YYYY-MM-DD。暂时只考虑全天假，半天假会有备注
  const hds = holidays.map((item) => {
    return {
      ...item,
      formatDate: dayjs(new Date(item.date)).format('YYYY-MM-DD'),
    }
  })

  // 5. 循环填充表格，6行7列
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cellDate = startDate.add(count, 'day')
      const text = cellDate.date()
      // 是否选中
      // const isSelected = cellDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
      const cellHoliday = hds.find(item => item.formatDate === cellDate.format('YYYY-MM-DD'))
      // 默认当月日期
      let type: DateCellType = 'normal'
      if (count < monthstartDay) {
        // 上个月日期
        type = 'prev-month'
      }
      else if (count - monthstartDay >= lastDate) {
        // 下个月日期
        type = 'next-month'
      }

      calendar[row][col] = {
        type, // 判断月份（上个月、这个月、下个月）
        date: cellDate, // dayjs 格式的日期
        text, // 日子
        isSelected: !!cellHoliday, // 这一天是否选中
        remark: cellHoliday,
      }
      count++
    }
  }

  return calendar
}
