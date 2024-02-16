import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Tabs } from './Tabs'

const meta = {
  argTypes: {
    defaultValue: {
      control: false,
      description: "The value of the active 'Tabs.Item' by default",
    },
    onValueChange: {
      action: 'Value changed',
      description: 'Callback for change current tab value',
    },
    value: {
      control: 'radio',
      description: 'Current active tab value',
      options: ['tab1', 'tab2'],
    },
  },
  component: Tabs.Root,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'shared/Tabs',
} satisfies Meta<typeof Tabs.Root>

export default meta

type Story = StoryObj<typeof meta>

export const ActiveItem: Story = {
  render: args => {
    return (
      <Tabs.Root defaultValue="tab1" {...args}>
        <Tabs.List>
          <Tabs.Item value="tab1">I&apos;m have &apos;tab1&apos; value</Tabs.Item>
        </Tabs.List>
      </Tabs.Root>
    )
  },
}

export const DisabledActiveItem: Story = {
  render: args => {
    return (
      <Tabs.Root defaultValue="tab1" value="tab1" {...args}>
        <Tabs.List>
          <Tabs.Item disabled value="tab1">
            I&apos;m have &apos;tab1&apos; value
          </Tabs.Item>
        </Tabs.List>
      </Tabs.Root>
    )
  },
}

export const InactiveItem: Story = {
  render: args => {
    return (
      <Tabs.Root defaultValue="tab1" value="tab1" {...args}>
        <Tabs.List>
          <Tabs.Item value="tab2">I&apos;m have &apos;tab2&apos; value</Tabs.Item>
        </Tabs.List>
      </Tabs.Root>
    )
  },
}

export const DisabledInactiveItem: Story = {
  render: args => {
    return (
      <Tabs.Root defaultValue="tab1" {...args}>
        <Tabs.List>
          <Tabs.Item disabled value="tab2">
            I&apos;m have &apos;tab2&apos; value
          </Tabs.Item>
        </Tabs.List>
      </Tabs.Root>
    )
  },
}

export const Demo: Story = {
  render: args => {
    return (
      <Tabs.Root defaultValue="tab1" style={{ maxWidth: 500 }} value="tab1" {...args}>
        <Tabs.List>
          <Tabs.Item value="tab1">Tab 1</Tabs.Item>
          <Tabs.Item value="tab2">Tab 2</Tabs.Item>
        </Tabs.List>
        <Tabs.Content style={{ padding: 20 }} value="tab1">
          Content for Tab 1: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum id iste
          laboriosam nostrum odio placeat veniam? Consectetur fugit labore molestias nihil placeat
          quasi vel vitae. Alias eum nisi pariatur quis.
        </Tabs.Content>
        <Tabs.Content style={{ padding: 20 }} value="tab2">
          Content for Tab 2: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum id iste
          laboriosam nostrum odio placeat veniam? Consectetur fugit labore molestias nihil placeat
          quasi vel vitae. Alias eum nisi pariatur quis.
        </Tabs.Content>
      </Tabs.Root>
    )
  },
}

export const Controlled: Story = {
  argTypes: {
    value: {
      control: false,
    },
  },
  render: () => {
    const tabs = [
      { children: 'Tab 1', value: 'tab1' },
      { children: 'Tab 2', value: 'tab2' },
    ]

    const [value, setValue] = useState(tabs[0].value)

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Current tab value: {value}</h1>
        <Tabs.Root
          defaultValue={tabs[0].value}
          onValueChange={setValue}
          style={{ maxWidth: 500 }}
          value={value}
        >
          <Tabs.List>
            {tabs.map(el => (
              <Tabs.Item key={el.value} value={el.value}>
                {el.children}
              </Tabs.Item>
            ))}
          </Tabs.List>
          <Tabs.Content style={{ padding: 20 }} value={tabs[0].value}>
            Content for Tab 1: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum id
            iste laboriosam nostrum odio placeat veniam? Consectetur fugit labore molestias nihil
            placeat quasi vel vitae. Alias eum nisi pariatur quis.
          </Tabs.Content>
          <Tabs.Content style={{ padding: 20 }} value={tabs[1].value}>
            Content for Tab 2: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum id
            iste laboriosam nostrum odio placeat veniam? Consectetur fugit labore molestias nihil
            placeat quasi vel vitae. Alias eum nisi pariatur quis.
          </Tabs.Content>
        </Tabs.Root>
      </>
    )
  },
}
