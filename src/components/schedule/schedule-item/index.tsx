import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import './index.less'

export interface ScheduleEvent {
  name: string
  id: number
  start: string
  end: string
}

export interface ScheduleItem {
  id: number
  timeStart: string
  timeEnd: string
  events: ScheduleEvent[]
}
const TIME = 60

const ScheduleEventComps = (props: {
  event: ScheduleEvent
  total: number
  startSchedule: number
  onClick: (events: ScheduleEvent) => void
}) => {
  const { event = {} as ScheduleEvent, total, startSchedule, onClick } = props
  const start = Math.abs(
    Number(moment(event.start, 'HH:mm').format('X')) / TIME,
  )
  const end = Math.abs(
    (Number(moment(event.end, 'HH:mm').format('X')) + 60) / TIME,
  )

  const height = ((end - start) / total) * 100
  const paddingTop = ((start - startSchedule) / (total - height)) * 100

  return (
    <div className="schedule-item-events" key={event.id}>
      <div
        className="events-wrapper"
        onClick={(e) => {
          e.stopPropagation()
          onClick(event)
        }}
        style={{ height: `${height}%`, marginTop: `${paddingTop}%` }}
      >
        <div className="events-time">{`${event.start}-${event.end}`}</div>
        <div className="events-name">{event.name}</div>
      </div>
    </div>
  )
}

const ScheduleItemFunc: React.FunctionComponent<{
  schedule: ScheduleItem
  addScheduleEvents: (schedule: ScheduleItem) => void
  onScheduleEventsClick: (
    scheduleId: ScheduleItem,
    events: ScheduleEvent,
  ) => void
}> = (props): JSX.Element => {
  const { schedule, addScheduleEvents, onScheduleEventsClick } = props
  const { events = [] } = schedule
  const start = Math.abs(
    Number(moment(schedule.timeStart, 'HH:mm').format('X')) / TIME,
  )
  const end = Math.abs(
    (Number(moment(schedule.timeEnd, 'HH:mm').format('X')) + 60) / TIME,
  )
  const total = end - start

  return (
    <div className="schedule-item-wrap">
      <div className="schedule-item-name">{schedule.timeStart}</div>
      <div
        className="schedule-item-content"
        onClick={(e) => {
          e.stopPropagation()
          addScheduleEvents(schedule)
        }}
      >
        {events.map((event) => (
          <ScheduleEventComps
            key={event.id}
            event={event}
            startSchedule={start}
            total={total}
            onClick={(events) => onScheduleEventsClick(schedule, events)}
          />
        ))}
      </div>
    </div>
  )
}

export default ScheduleItemFunc
