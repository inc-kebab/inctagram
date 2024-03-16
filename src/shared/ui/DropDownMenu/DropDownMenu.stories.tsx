import type { Meta, StoryObj } from '@storybook/react'

import { Check } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'

import { Dropdown } from './'

const meta = {
  argTypes: {
    align: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger.',
      options: ['start', 'center', 'end'],
    },
    children: {
      control: false,
      description: 'Content for drop-down',
    },
    side: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
    },
    trigger: {
      control: false,
      description: 'A component for controlling the display of the dropdown menu',
    },
  },
  component: Dropdown.Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/DropDownMenu',
} satisfies Meta<typeof Dropdown.Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Dropdown.Item startIcon={<Check />}>Check all</Dropdown.Item>
        <Dropdown.Item endIcon={<Check />}>View all</Dropdown.Item>
        <Dropdown.Item>
          <Button>Logout</Button>
        </Dropdown.Item>
      </>
    ),
    sideOffset: 10,
    trigger: <Button>I AM A TRIGGER</Button>,
  },
}

export const WithSeparator: Story = {
  args: {
    children: (
      <>
        <Dropdown.Item startIcon={<Check />}>Check all</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item endIcon={<Check />}>View all</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>
          <Button>Logout</Button>
        </Dropdown.Item>
      </>
    ),
    sideOffset: 10,
    trigger: <Button>I AM A TRIGGER</Button>,
  },
}
