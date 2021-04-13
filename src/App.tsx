import React, { useState } from 'react'
import 'normalize.css'
import '@/style/common.less'
import ScheduleComps, {
  ScheduleItem,
} from './components/schedule'

const defaultSchedule = [
  {
    id: 1,
    timeStart: '00:00',
    timeEnd: '08:59',
    events: [
      {
        id: 1,
        name: '安排1',
        start: '00:00',
        end: '08:59',
      },
    ],
  },
  {
    id: 2,
    timeStart: '09:00',
    timeEnd: '11:59',
    events: [
      {
        id: 1,
        name: '安排1',
        start: '09:00',
        end: '10:30',
      },
      {
        id: 2,
        name: '安排2',
        start: '10:00',
        end: '11:59',
      },
    ],
  },
  {
    id: 3,
    timeStart: '12:00',
    timeEnd: '17:59',
    events: [],
  },
  {
    id: 4,
    timeStart: '18:00',
    timeEnd: '24:59',
    events: [],
  },
]

const App: React.FunctionComponent = (): JSX.Element => {
  const [scheduleState, setScheduleState] = useState<ScheduleItem[]>(
    defaultSchedule as any,
  )

  return (
    <div className="app">
      <ScheduleComps values={scheduleState} onChange={setScheduleState} />
    </div>
  )
}

export default App
