// src/components/KanbanBoard/KanbanBoard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import KanbanBoard from './KanbanBoard';
import { sampleColumns, sampleTasks } from '../../data/samples';

const meta: Meta<typeof KanbanBoard> = { title: 'Kanban/KanbanBoard', component: KanbanBoard, parameters:{ layout:'fullscreen' } };
export default meta;
type Story = StoryObj<typeof KanbanBoard>;
const noop = () => {};

export const Default: Story = {
  render: () => (
    <KanbanBoard
      columns={sampleColumns}
      tasks={sampleTasks}
      onTaskMove={noop}
      onTaskCreate={noop}
      onTaskUpdate={noop}
      onTaskDelete={noop}
    />
  )
};

export const Empty: Story = {
  render: () => (
    <KanbanBoard
      columns={[
        { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
        { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
        { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] }
      ]}
      tasks={{}}
      onTaskMove={noop}
      onTaskCreate={noop}
      onTaskUpdate={noop}
      onTaskDelete={noop}
    />
  )
};
