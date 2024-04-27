import type { Meta, StoryObj } from '@storybook/react'

import { ReactNode, useState } from 'react'

import { Typography } from '@/shared/ui/Typography'

import { Pagination } from './Pagination'

const meta = {
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page for render',
    },
    onChangePage: {
      action: 'Page changed',
      description: 'Callback for change current page',
    },
    options: {
      control: false,
      description: 'Options for select for change items per page',
    },
    pageSize: {
      control: false,
      description: 'Count items per page',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for select for change items per page',
    },
    siblingCount: {
      control: 'number',
      description:
        'The minimum number of page buttons displayed on both sides of the button on the current page.',
    },
    totalCount: {
      control: 'number',
      description: 'Total count items for calculate count pages',
    },
  },
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    options: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
    ],
    pageSize: 10,
    totalCount: 200,
  },
}

export const Controlled: Story = {
  args: {
    currentPage: 1,
    options: [],
    pageSize: 1,
    totalCount: 200,
  },
  render: () => {
    const [current, setCurrent] = useState(1)
    const [view, setView] = useState('1')

    const options = [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '100', value: '100' },
    ]

    const items = [
      { id: 'title1', title: 'title1' },
      { id: 'title2', title: 'title2' },
      { id: 'title3', title: 'title3' },
    ]

    const setPage = (currentPage: number) => {
      if (current > 0) {
        setCurrent(currentPage)
      }
    }

    return (
      <div
        style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <Typography>Number of current page: {current}</Typography>
        <Typography>Count items on page: {view}</Typography>
        <ul>
          {items.slice(0, +view).map(el => (
            <li key={el.id}>{el.title}</li>
          ))}
        </ul>
        <Pagination
          currentPage={current}
          onChangePage={setPage}
          onValueChange={setView}
          options={options}
          pageSize={10}
          placeholder={view}
          totalCount={200}
        />
      </div>
    )
  },
}
