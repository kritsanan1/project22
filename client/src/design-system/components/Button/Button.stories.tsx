
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { Download, Mail, Plus } from 'lucide-react';

const meta = {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports loading states, icons, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'success', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Download className="h-4 w-4" />}>
        Download
      </Button>
      <Button rightIcon={<Mail className="h-4 w-4" />}>
        Send Email
      </Button>
      <Button leftIcon={<Plus className="h-4 w-4" />} rightIcon={<Mail className="h-4 w-4" />}>
        Add & Send
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button variant="destructive" loading>
        Destructive Loading
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};
