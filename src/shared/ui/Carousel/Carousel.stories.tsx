import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'

const meta = {
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'The Carousel Component is a simple wrapper for creating a carousel-like UI element in React.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Carousel',
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const mockedImagesUrl = [
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
]

export const Default: Story = {
  args: {
    imagesUrl: mockedImagesUrl,
  },
  render: args => {
    return (
      <div style={{ height: '562px', width: '490px' }}>
        <Carousel {...args} />
      </div>
    )
  },
}
