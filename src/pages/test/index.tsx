import { Select } from '@/shared/ui'

import s from './test.module.scss'

const options = [
  { id: '1', value: 'Select-box1' },
  { id: '2', value: 'Select-box2' },
  { id: '3', value: 'Select-box3' },
]

const Test = () => {
  return (
    <div className={s.test}>
      <Select
        classNameViewport={s.viewPort}
        label="Label"
        onChangeValue={() => {}}
        options={options}
        pagination
        placeholder="sfsdfsd"
      />
    </div>
  )
}

export default Test
