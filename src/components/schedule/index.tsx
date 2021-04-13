import React, { useState } from 'react'
import EditModal from './edit-modal'
import ScheduleItemComp, { ScheduleEvent, ScheduleItem } from './schedule-item'
import './index.less'

const App: React.FunctionComponent<{
  values: ScheduleItem[]
  onChange: (values: ScheduleItem[]) => void
}> = (props): JSX.Element => {
  const [schedule, setSchedule] = useState<ScheduleItem>()
  const [scheduleEvent, setScheduleEvent] = useState<
    ScheduleEvent | undefined
  >()
  const [visible, setVisible] = useState<boolean>(false)

  const addScheduleEvent = (scheduleId: number, event: ScheduleEvent) => {
    const newSchedule = props.values.map((item) => {
      if (item.id === scheduleId) {
        item.events.push(event)
      }
      return item
    })
    setScheduleEvent(undefined)
    props.onChange(newSchedule)
    setVisible(false)
  }
  const removeScheduleEvent = (scheduleId: number, eventId: number) => {
    const newSchedule = props.values.map((item) => {
      if (scheduleId === item.id)
        item.events = item.events?.filter((e) => e.id !== eventId)
      return item
    })

    props.onChange(newSchedule)
    setScheduleEvent(undefined)
    setVisible(false)
  }

  const editScheduleEvent = (scheduleId: number, event: ScheduleEvent) => {
    const newSchedule = props.values.map((item) => {
      if (scheduleId === item.id) {
        const index = item.events.findIndex((e) => e.id === event.id)
        item.events?.splice(index, 1, event)
      }
      return item
    })

    props.onChange(newSchedule)
    setVisible(false)
  }

  return (
    <div className="schedule-wrapper">
      <div className="schedule">
        {props.values.map((item) => (
          <ScheduleItemComp
            key={item.id}
            schedule={item}
            addScheduleEvents={(schedule) => {
              setSchedule(schedule)
              setVisible(true)
            }}
            onScheduleEventsClick={(schedule, events) => {
              setSchedule(schedule)
              setScheduleEvent(events)
              setVisible(true)
            }}
          />
        ))}
      </div>
      <EditModal
        onDelete={removeScheduleEvent}
        onEdit={editScheduleEvent}
        onAdd={addScheduleEvent}
        onClose={() => {
          setVisible(false)
        }}
        schedule={schedule}
        values={scheduleEvent}
        visible={visible}
      />
    </div>
  )
}

export default App
