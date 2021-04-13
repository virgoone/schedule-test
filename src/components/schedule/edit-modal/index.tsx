import React, { useEffect } from 'react'
import { Form, Input, Button, Modal, TimePicker } from 'antd'
import { ScheduleEvent, ScheduleItem } from '../schedule-item'
import moment from 'moment'

const format = 'HH:mm'
type Props = {
  visible: boolean
  schedule: ScheduleItem | undefined
  values?: ScheduleEvent
  onAdd: (scheduleId: number, event: ScheduleEvent) => void
  onClose: () => void
  onDelete: (scheduleId: number, eventId: number) => void
  onEdit: (scheduleId: number, event: ScheduleEvent) => void
}

function range(start: number, end: number) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

const EditModal: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [form] = Form.useForm()
  const { visible, values, onClose, onDelete } = props

  useEffect(() => {
    if (!values?.id) {
      form.resetFields()
      return
    }
    form.setFieldsValue({
      ...values,
      timeRange: [moment(values?.start, format), moment(values?.end, format)],
    })
  }, [values])

  const onAdd = () => {
    const values = form.getFieldsValue()
    const [start, end] = values.timeRange

    if (!props.schedule) {
      return
    }

    props.onAdd(props.schedule.id, {
      name: values.name,
      id: Date.now(),
      start: moment(start).format(format),
      end: moment(end).format(format),
    })
  }

  const onEdit = () => {
    const newValues = form.getFieldsValue()
    const [start, end] = newValues.timeRange

    if (!props.schedule || !values?.id) {
      return
    }

    props.onEdit(props.schedule.id, {
      ...values,
      name: newValues.name,
      start: moment(start).format(format),
      end: moment(end).format(format),
    } as ScheduleEvent)
  }

  return (
    <Modal
      title={values?.id ? '编辑日程' : '添加新日程'}
      width={650}
      closable={false}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Close
          </Button>

          {values?.id && (
            <Button
              type="primary"
              key="delete"
              danger
              onClick={() => {
                props.schedule?.id && onDelete(props.schedule.id, values?.id)
              }}
            >
              删除
            </Button>
          )}

          {values?.id ? (
            <Button type="primary" key="update" onClick={onEdit}>
              更新
            </Button>
          ) : (
            <Button key="save" type="primary" onClick={onAdd}>
              保存
            </Button>
          )}
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入事件名称" />
        </Form.Item>

        <Form.Item name="timeRange" label="日程时间">
          <TimePicker.RangePicker style={{ width: '100%' }} format={format} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
