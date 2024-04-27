import type { Meta, StoryObj } from '@storybook/react'

import { ReactNode } from 'react'

import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { TextField } from '@/shared/ui/TextField'

import { Table } from './Table'

const meta = {
  argTypes: {},
  component: Table.Root,
  tags: ['autodocs'],
  title: 'shared/Table',
} satisfies Meta<typeof Table.Root>

export default meta

type Story = StoryObj<typeof meta>

export const TitleCell: Story = {
  args: {
    children: 'I am a title cell',
  },
  render: (args: { children?: ReactNode }) => <Table.TitleCell>{args.children}</Table.TitleCell>,
}

export const Cell: Story = {
  args: {
    children: 'I am a cell',
  },
  render: (args: { children?: ReactNode }) => <Table.Cell>{args.children}</Table.Cell>,
}

export const TableDemo: Story = {
  render: () => (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.TitleCell>Title cell name1</Table.TitleCell>
          <Table.TitleCell>Title cell name2</Table.TitleCell>
          <Table.TitleCell>Title cell name3</Table.TitleCell>
          <Table.TitleCell>Title cell name4</Table.TitleCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell name1 (row1)</Table.Cell>
          <Table.Cell>Cell name2 (row1)</Table.Cell>
          <Table.Cell>Cell name3 (row1)</Table.Cell>
          <Table.Cell>Cell name4 (row1)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell name1 (row2)</Table.Cell>
          <Table.Cell>Cell name2 (row2)</Table.Cell>
          <Table.Cell>Cell name3 (row2)</Table.Cell>
          <Table.Cell>Cell name4 (row2)</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Button>Button</Button>
          </Table.Cell>
          <Table.Cell>
            <Checkbox checked label="Checkbox" onCheckedChange={() => {}} />
          </Table.Cell>
          <Table.Cell>
            <TextField disabled label="Disabled" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
}
