// src/components/KanbanBoard/KanbanBoard.tsx

import { useMemo } from 'react';
import type { KanbanViewProps } from '../../types/kanban';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({ columns, tasks, onTaskMove, onTaskCreate, onTaskDelete, onTaskUpdate }: KanbanViewProps) {
  const columnTasks = useMemo(() => columns.map(c => ({
    column: c, tasks: c.taskIds.map(id => tasks[id]).filter(Boolean)
  })), [columns, tasks]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-4 py-3 snap-x snap-mandatory">
        {columnTasks.map(({ column, tasks }) => (
          <div key={column.id} className="snap-start">
            <KanbanColumn column={column} tasks={tasks} />
          </div>
        ))}
      </div>
    </div>
  );
}
