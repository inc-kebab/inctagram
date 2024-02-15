import { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'
import Close from '../../assets/icons/common/close.svg'
import { DialogClose } from './DialogClose'

const meta = {
  title: 'shared/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'title for Modal Dialog',
    },
    children: {
      control: false,
      description: 'description for Modal Dialog',
    },
    trigger: {
      control: false,
      description: 'The component for accept Modal Dialog',
    },
    className: {
      control: false,
      description: 'Class Name to extend styles',
    },
    closeButton: {
      control: false,
      description: 'Trigger button to close modal',
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Modal: Story = {
  args: {
    title: 'Modal Dialog',
    children: (
      <>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis autem provident
          voluptate, reiciendis maiores tempora laborum quisquam sunt impedit officiis expedita a
          facere atque sit voluptatibus illum ipsum, placeat vel.
        </p>
        <DialogClose>
          <button>Ok</button>
        </DialogClose>
      </>
    ),
    closeButton: (
      <button>
        <Close />
      </button>
    ),
    trigger: <button>Open Modal</button>,
  },
}
